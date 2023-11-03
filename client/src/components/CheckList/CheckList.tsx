import { CheckListItem } from "../CheckListItem";
import { Container, Title } from "./styles";
import { useState } from "react";
const CheckList = () => {
  const [checkLists, setCheckLists] = useState([
    "가스 벨브 잠그기",
    "지팡이 챙기기",
    "현관문 잠그기",
  ]);
  return (
    <Container>
      <Title>나가기 전 확인</Title>
      {checkLists.map((li, idx) => {
        return <CheckListItem text={li} key={idx} />;
      })}
    </Container>
  );
};
export default CheckList;
