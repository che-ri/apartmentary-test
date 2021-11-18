import React from "react";
import styled from "styled-components";

export default function CheckBoxGroup({
  groupProperties,
  groupTag,
  checkedList,
  handleSetCheckedList,
}) {
  return (
    <>
      <GroupProperty>[{groupProperties}]</GroupProperty>
      <CheckBoxWrapper>
        {groupTag.map((item) => {
          const itemId = item.id;
          const itemName = item.name;
          const itemDependency = item.dependency ? item.dependency : undefined;
          return (
            //체크박스
            <CheckBox key={itemId}>
              <input
                type="checkbox"
                id={itemId}
                checked={
                  checkedList.tag.find((item) => item.id === itemId)
                    ? true
                    : false
                }
                onChange={() =>
                  handleSetCheckedList(
                    itemId,
                    groupProperties,
                    itemName,
                    itemDependency
                  )
                }
              />
              <label htmlFor={itemId}>{itemName}</label>
            </CheckBox>
          );
        })}
      </CheckBoxWrapper>
    </>
  );
}

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
