import React from "react";
import styled from "styled-components";

export default function DefaultButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

DefaultButton.defaultProps = {
  children: null,
  onClick: () => {}
};

const Button = styled.button`
  padding: 10px;
  height: fit-content;
`;
