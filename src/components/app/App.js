import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Note from "../../routes/note";
import Notes from "../../routes/notes";
import Add from "../../routes/add";
import Edit from "../../routes/edit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Notes} />
        <Route path={"/add"} component={Add} />
        <Route path={"/note/:id"} component={Note} />
        <Route path={"/edit/:id"} component={Edit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
