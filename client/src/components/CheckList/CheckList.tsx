import { useGetCheckList } from "../../hooks";
import { CheckListItem } from "../CheckListItem";
import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";

const CheckList = ({ temp }: { temp: number }) => {
  const [checkLists, setCheckLists] = useState<string[]>([]);

  const { mutate, data } = useGetCheckList();

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let content = "";
    let tempArr: string[] = [];
    if (data) {
      data.forEach((item) => {
        tempArr.push(item.toDo);
      });
    } else {
      tempArr.push("가스밸브 잠그기", "약 먹기", "우산 챙기기");
    }

    if (temp >= 28) content = "반팔, 반바지를 추천드려요.";
    else if (temp >= 23) content = "반팔, 얇은 셔츠, 면바지를 추천드려요.";
    else if (temp >= 20) content = "블라우스, 긴팔 티, 면바지를 추천드려요.";
    else if (temp >= 17) content = "얇은 가디건, 스웨터, 긴바지를 추천드려요.";
    else if (temp >= 12) content = "자켓, 가디건, 스웨터, 긴바지를 추천드려요.";
    else if (temp >= 9) content = "잠바, 코트, 기모바지를 추천드려요.";
    else if (temp >= 5) content = "코트, 발열내의, 가죽 옷, 기모를 추천드려요.";
    else if (temp < 5)
      content = "패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리를 추천드려요.";
    tempArr.push(content);
    setCheckLists(tempArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, temp]);

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
