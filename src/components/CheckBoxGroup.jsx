import React, { useRef, useState } from "react";
import styled from "styled-components";

const CheckBoxComponent = ({
  itemId,
  checked,
  handleSetCheckedList,
  groupProperties,
  itemName,
  itemDependency,
}) => {
  const [boxChecked, setBoxChecked] = useState(checked);
  return (
    <CheckBoxWrapper key={itemId}>
      <CheckBox
        type="checkbox"
        checked={boxChecked}
        onChange={() => {
          setBoxChecked((prev) => !prev);
          handleSetCheckedList(
            itemId,
            groupProperties,
            itemName,
            itemDependency
          );
        }}
      />
      <Label htmlFor={itemId}>{itemName}</Label>
    </CheckBoxWrapper>
  );
};

export default function CheckBoxGroup({
  groupProperties,
  groupTag,
  checkedList,
  handleSetCheckedList,
}) {
  return (
    <>
      <GroupProperty>[{groupProperties}]</GroupProperty>
      <CheckBoxGrid>
        {groupTag.map((item) => {
          const itemId = item.id;
          const itemName = item.name;
          const itemDependency = item.dependency ? item.dependency : undefined;
          return (
            //체크박스
            <CheckBoxComponent
              itemId={itemId}
              checked={
                checkedList.tag.find((item) => item.id === itemId)
                  ? true
                  : false
              }
              handleSetCheckedList={handleSetCheckedList}
              groupProperties={groupProperties}
              itemName={itemName}
              itemDependency={itemDependency}
            />
          );
        })}
      </CheckBoxGrid>
    </>
  );
}

const GroupProperty = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const CheckBoxGrid = styled.div``;

const CheckBoxWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const CheckBox = styled.input``;

const Label = styled.label``;
