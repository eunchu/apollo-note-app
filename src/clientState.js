import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";

export const defaults = {
  notes: [
    {
      __typename: "Note", // local state일 경우 넣어줘야 동작함. 규칙이라네?
      id: 1,
      title: "first",
      content: "content"
    }
  ]
};
export const typeDefs = [
  `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    notes: [Note]!
    note(id: Int!): Note 
  }

  type Mutation {
    createNote(title: String!, content: String!): Note
    updateNote(id: Int!, title: String, content: String): Note
  }

  type Note {
    id: Int!
    title: String!
    content: String!
  }
  `
];
export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      // cache 에서 정보를 가져오기위한 작업
      // id를 찾는 방식이 notes내부를 파고들어 찾지 않음.. 근데 어떻게 찾는진 안알려쥼 ㅡㅡ
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id
      });
      // id를 알면, cache에서 원하는 ftagment를 가져올 수 있음!
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note; // resolver에선 필수적으로 return 이 필요함 값이 null인 경우일 지라도. 규칙이라네..?
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const { title, content } = variables;
      const newNote = {
        __typename: "Note",
        id: notes.length + 1,
        title,
        content
      };

      cache.writeData({
        data: {
          notes: [...notes, newNote]
        }
      });

      return newNote;
    },
    updateNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });

      const updateNote = {
        ...note,
        title,
        content
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updateNote
      });

      return updateNote;
    }
  }
};
