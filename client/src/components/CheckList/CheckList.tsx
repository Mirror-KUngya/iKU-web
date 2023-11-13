import {
  CHECK_LIST_COUNT,
  getCheckList,
} from "../../hooks/patchWeatherCheckList";
import { CheckListItem } from "../CheckListItem";
import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";

const CheckList = () => {
  // const [checkLists, setCheckLists] = useState<string[]>([]);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCheckList()]);
  // const { mutate, data } = useGetCheckList();

  // useEffect(() => {
  //   mutate();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   let tempArr: string[] = [];
  //   if (data) {
  //     data.forEach((item) => {
  //       tempArr.push(item.toDo);
  //     });

  // if (getCheckList().length > 0) {
  //   let tempArr.push();
  //   tempList = tempList.slice(0, CHECK_LIST_COUNT);
  //   tempList[CHECK_LIST_COUNT] = getCheckList();
  //   setCheckLists(tempList);
  // }
  //   setCheckLists(tempArr);
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getCheckList()]);

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
