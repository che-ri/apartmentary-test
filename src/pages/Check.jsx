import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router-dom";

//components
import DefaultButton from "../components/DefaultButton";

//data
import caseBank from "../util/case_bank.json";
import blankCaseBank from "../util/blank_case_bank.json";
import CheckBoxGroup from "../components/CheckBoxGroup";
import DragNDrop from "../components/DragNDrop";
import ChooseImage from "../components/ChooseImage";

export default function Check() {
  const { id } = useParams();
  const checkListIdx = Number(id);
  const history = useHistory();
  const { state } = useLocation();

  //ref에 체크리스트 값을 담아서 다음 체크리스트 페이지에 넘겨줄 것이다.
  const checkedListRef = useRef(state?.checked ? state.checked : blankCaseBank);
  const checkedList = checkedListRef.current;

  //dependency가 있는 체크리스트인지 아닌지 판별하는 변수입니다. 있다면 값이 들어있습니다.
  const HadDependency = useRef(checkedList[checkListIdx].type).current;

  //dependency가 있는 체크리스트의 root를 저장하는 state
  const [rootList, setRootList] = useState(null);

  const handleSetCheckedList = (id, properties, value, dependency) => {
    //선택한 태그를 저장하거나, 취소하는 함수
    let _list = checkedListRef.current;
    _list[checkListIdx].list = _list[checkListIdx].list.map((checkGroup) => {
      if (checkGroup?.properties === properties) {
        const tagIndex = checkGroup.tag.findIndex(
          (item) => item.name === value
        );

        if (tagIndex === -1) {
          //태그를 선택한 적이 없으면 바로 배열에 태그 추가
          const newTag = {
            name: value,
            id: id,
          };
          //dependency가 undefined 값이 아니면 tag에 dependency 속성을 추가한다.
          if (dependency) newTag.dependency = dependency;
          checkGroup.tag.push(newTag);
        } else {
          //태그를 선택한 적이 있으면 배열에 태그를 삭제
          checkGroup.tag.splice(tagIndex, 1);
        }
      }
      return checkGroup;
    });
  };

  const movePrevList = () => {
    if (checkListIdx === 0) return alert("이전페이지가 없습니다!");
    history.push(`/check/${Number(checkListIdx) - 1}`, {
      checked: checkedListRef.current,
    });
  };

  const moveNextList = () => {
    //다음 체크리스트로 이동하는 함수
    if (checkListIdx === caseBank.length - 1) return alert("설문조사 끝!");
    history.push(`/check/${Number(checkListIdx) + 1}`, {
      checked: checkedListRef.current,
    });
  };

  return (
    <Container>
      <Top>
        <TopGrid>
          <CheckListWrapper>
            <CheckTitle>{caseBank[checkListIdx].title}</CheckTitle>
            {caseBank[checkListIdx].list.map((group, groupIdx) => {
              const groupData = {
                groupId: group.id,
                groupProperties: group.properties,
                groupTag: group.tag,
                groupType: group.type,
                groupIdx: groupIdx,
                checkedList: checkedList[checkListIdx].list[groupIdx],
                handleSetCheckedList: handleSetCheckedList,
                HadDependency: HadDependency,
                rootList: rootList,
                setRootList: setRootList,
              };
              return (
                <CheckBoxGroupGrid key={groupData.groupId}>
                  <CheckBoxGroup key={groupData.groupId} {...groupData} />
                </CheckBoxGroupGrid>
              );
            })}
          </CheckListWrapper>
          <DragNDrop />
        </TopGrid>
      </Top>
      <Bottom>
        <ChooseImage />
      </Bottom>
      <Controls>
        <DefaultButton onClick={movePrevList}>이전페이지</DefaultButton>
        <DefaultButton onClick={moveNextList}>다음페이지</DefaultButton>
      </Controls>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Top = styled.section``;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
`;

const CheckListWrapper = styled.div`
  width: 100%;
`;

const CheckTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
`;

const CheckBoxGroupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`;

const Bottom = styled.section`
  width: 100%;
`;

const Controls = styled.div``;
