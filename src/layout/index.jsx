import styled from "styled-components";

export default function Layout({ children }) {
  return <Wrapepr>{children}</Wrapepr>;
}

const Wrapepr = styled.div`
  width: 100%;
  height: 100%;
`;
