import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//slice
import { deleteImage } from "../store/slice/imageSlice";

export default function DragNDrop() {
  const dispatch = useDispatch();
  const imgList = useSelector((state) => state?.image.list);

  const onDeleteClick = (src) => {
    dispatch(deleteImage(src));
  };

  return (
    <Container>
      {imgList &&
        imgList.map((src, idx) => {
          const priorityNum = idx + 1;
          return (
            <PriorityBox key={idx}>
              <Header>
                <Title>[{priorityNum}순위]</Title>
                <DeleteBtn onClick={() => onDeleteClick(src)}>삭제</DeleteBtn>
              </Header>
              <ImageWrapper>
                <Image src={src} />
              </ImageWrapper>
            </PriorityBox>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  min-height: 440px;
  width: 200px;
`;

const PriorityBox = styled.div`
  background: pink;
  width: 100%;
  min-height: 220px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.strong`
  height: 20px;
`;

const DeleteBtn = styled.button``;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
`;
