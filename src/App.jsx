import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/configureStore";

//components
import Layout from "./layout";
import Main from "./pages/Main";
import Check from "./pages/Check";

export default function App() {
  return (
    <Layout>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/check/:id" component={Check} />
          <Redirect from="*" to="/" />
        </Switch>
      </ConnectedRouter>
    </Layout>
  );
}
