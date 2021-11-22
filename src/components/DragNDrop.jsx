import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//slice
import { deleteImage, changeIdx } from "../store/slice/imageSlice";

export default function DragNDrop() {
  const dispatch = useDispatch();
  const imgList = useSelector((state) => state?.image.list);

  const onDeleteClick = (src) => {
    dispatch(deleteImage(src));
  };

  const onDragStart = (e, idx) => {
    const src = e.target.src;
    e.dataTransfer.setData("text/uri-list", src);
    e.dataTransfer.setData("text/plain", idx);
  };

  const onDrop = (e, idx) => {
    e.currentTarget.style.background = "yellow";

    const req = {
      dropedSrc: e.dataTransfer.getData("text/uri-list"),
      dropedIdx: e.dataTransfer.getData("text/plain"),
      originSrc: e.target.currentSrc,
      originIdx: idx,
    };

    dispatch(changeIdx(req));
  };

  const onDragOver = (e) => {
    e.preventDefault();
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
                <Image
                  src={src}
                  onDragStart={(e) => onDragStart(e, idx)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, idx)}
                  draggable={true}
                />
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
  background: gray;
`;
