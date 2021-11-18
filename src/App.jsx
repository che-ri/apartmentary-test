import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import GlobalThemeProvider from "./styles/themeProvider";

//components
import Layout from "./layout";
import Main from "./pages/Main";
import Check from "./pages/Check";

export default function App() {
  return (
    <GlobalThemeProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/check/:id" component={Check} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </Layout>
    </GlobalThemeProvider>
  );
}
