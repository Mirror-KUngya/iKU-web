import {
  CHECK_LIST_COUNT,
  getCheckList,
} from "../../hooks/patchWeatherCheckList";
import { CheckListItem } from "../CheckListItem";
import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";
const CheckList = () => {
  const [checkLists, setCheckLists] = useState([
    "가스 벨브 잠그기",
    "지팡이 챙기기",
    "현관문 잠그기",
  ]);

  useEffect(() => {
    if (getCheckList().length > 0) {
      let tempList = checkLists;
      tempList = tempList.slice(0, CHECK_LIST_COUNT);
      tempList[CHECK_LIST_COUNT] = getCheckList();
      setCheckLists(tempList);
    }
  }, [getCheckList()]);

  return (
    <Container>
      <Title>
        나가기 전 확인
        <PiCheckFatFill size={"3rem"} />
      </Title>
      {checkLists.map((li, idx) => {
        return <CheckListItem text={li} key={idx} />;
      })}
    </Container>
  );
};
export default CheckList;
