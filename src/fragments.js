import gql from "graphql-tag";

// resolvers에 넘겨주기 위해 작성함
export const NOTE_FRAGMENT = gql`
  fragment NotePars on Note {
    # clientState 에 작성된 type Note 에서 정보를 가져옴
    id
    title
    content
  }
`;
