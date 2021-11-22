import ReactDOM from "react-dom";
import { store } from "./store/configureStore";
import { Provider } from "react-redux";
import ThemeProvider from "./styles/themeProvider";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
