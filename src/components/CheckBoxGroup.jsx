import React, { useRef, useState } from "react";
import styled from "styled-components";

const CheckBoxComponent = ({
  itemId,
  checked,
  handleSetCheckedList,
  groupProperties,
  itemName,
  itemDependency,
  setRootList, //디펜던시 root 값을 저장하는 함수
  rootList,
}) => {
  const [boxChecked, setBoxChecked] = useState(checked);
  const isLinkedDependency = rootList && rootList.includes(itemDependency);

  //dependency체크박스이고, root와 연결되어있는 항목이면 보여준다.
  if (itemDependency)
    return (
      <>
        {isLinkedDependency && (
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
                if (setRootList)
                  setRootList((prev) =>
                    prev ? [...prev, itemName] : [itemName]
                  );
              }}
            />
            <Label htmlFor={itemId}>{itemName}</Label>
          </CheckBoxWrapper>
        )}
      </>
    );

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
          if (setRootList)
            setRootList((prev) => (prev ? [...prev, itemName] : [itemName]));
        }}
      />
      <Label htmlFor={itemId}>{itemName}</Label>
    </CheckBoxWrapper>
  );
};

export default function CheckBoxGroup({
  groupProperties,
  groupTag,
  groupType,
  checkedList,
  handleSetCheckedList,
  HadDependency,
  setRootList,
  rootList,
}) {
  const isRoot = useRef(groupType === "root-checkbox" ? true : false).current;
  //디펜던시가 있는 케이스뱅크 설문지
  if (HadDependency)
    return (
      <>
        {/* root 항목이거나, root를 선택했고 그 root의 의존된 항목이면 보여준다. */}
        {(isRoot || rootList) && (
          <>
            <GroupProperty>[{groupProperties}]</GroupProperty>
            <CheckBoxGroupWrapper>
              {groupTag.map((item) => {
                const itemId = item.id;
                const itemName = item.name;
                const itemDependency = item.dependency
                  ? item.dependency
                  : undefined;
                return (
                  //체크박스
                  <CheckBoxComponent
                    key={itemId}
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
                    setRootList={setRootList} //디펜던시의 root면 rootList를 저장하는 함수를 넘겨준다.
                    rootList={rootList}
                  />
                );
              })}
            </CheckBoxGroupWrapper>
          </>
        )}
      </>
    );

  return (
    <>
      <GroupProperty>[{groupProperties}]</GroupProperty>
      <CheckBoxGroupWrapper>
        {groupTag.map((item) => {
          const itemId = item.id;
          const itemName = item.name;
          const itemDependency = item.dependency ? item.dependency : undefined;
          return (
            //체크박스
            <CheckBoxComponent
              key={itemId}
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
      </CheckBoxGroupWrapper>
    </>
  );
}

const GroupProperty = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const CheckBoxWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const CheckBox = styled.input``;

const Label = styled.label``;

const CheckBoxGroupWrapper = styled.div``;
