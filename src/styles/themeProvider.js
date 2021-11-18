import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyles";

//theme
import theme from "./theme";

export default function GlobalThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
