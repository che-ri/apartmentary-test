import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

//components
import DefaultButton from "../components/DefaultButton";

//data
import caseBank from "../util/case_bank.json";
import blankCaseBank from "../util/blank_case_bank.json";
import CheckBoxGroup from "../components/CheckBoxGroup";

export default function Check() {
  const { id } = useParams();
  const checkListIdx = Number(id);
  const history = useHistory();
  const [checkedList, setCheckedList] = useState(blankCaseBank);

  const handleSetCheckedList = (id, properties, value, dependency) => {
    //선택한 태그를 저장하거나, 취소하는 함수
    let _list = [...checkedList];
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
        console.log(checkGroup);
      }
      return checkGroup;
    });
    setCheckedList(_list);
  };

  const movePrevList = () => {
    if (checkListIdx === 0) return alert("이전페이지가 없습니다!");
    history.push(`/check/${Number(checkListIdx) - 1}`);
  };

  const moveNextList = () => {
    //다음 체크리스트로 이동하는 함수
    if (checkListIdx === caseBank.length - 1) return alert("설문조사 끝!");
    history.push(`/check/${Number(checkListIdx) + 1}`);
  };

  return (
    <Container>
      <CheckListWrapper>
        <CheckTitle>{caseBank[checkListIdx].title}</CheckTitle>
        {caseBank[checkListIdx].list.map((group, groupIdx) => {
          const groupData = {
            groupId: group.id,
            groupProperties: group.properties,
            groupTag: group.tag,
            groupIdx: groupIdx,
            checkedList: checkedList[checkListIdx].list[groupIdx],
            handleSetCheckedList: handleSetCheckedList,
          };
          return (
            <CheckBoxGroupGrid>
              <CheckBoxGroup key={groupData.groupId} {...groupData} />
            </CheckBoxGroupGrid>
          );
        })}
      </CheckListWrapper>
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

const CheckListWrapper = styled.div`
  width: 80%;
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

const CheckGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`;

const GroupProperty = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const CheckBoxWrapper = styled.div``;

const CheckBox = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const Controls = styled.div``;
