import styled from "styled-components";
import { Link } from "react-router-dom";

//components
import DefaultButton from "../components/DefaultButton";

export default function Main() {
  return (
    <Container>
      <Link to="/check/0">
        <DefaultButton>설문조사하기</DefaultButton>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;
