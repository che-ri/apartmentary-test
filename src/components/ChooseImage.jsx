import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//slice
import { setImage } from "../store/slice/imageSlice";

//image case
import imageBank from "../util/image_bank.json";
const imgList1 = imageBank.slice(0, 5);
const imgList2 = imageBank.slice(5, 10);

export default function ChooseImage() {
  const dispatch = useDispatch();
  const [imgList, setImgList] = useState(imgList1);

  const onRamdomClick = () => {
    //랜덤으로 이미지 불러오기
    if (imgList === imgList1) setImgList(imgList2);
    else setImgList(imgList1);
  };

  const onImageClick = (e) => {
    dispatch(setImage(e.target.src));
  };

  return (
    <Container>
      <Controls>
        <button onClick={onRamdomClick}>랜덤으로 불러오기</button>
      </Controls>
      <ImageGroupGrid>
        {imgList.map((img) => (
          <Image src={img.src} key={img.id} onClick={onImageClick} />
        ))}
      </ImageGroupGrid>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageGroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row: 100px;
  width: 100%;
  grid-auto-rows: 100px;
  background: moccasin;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`;
