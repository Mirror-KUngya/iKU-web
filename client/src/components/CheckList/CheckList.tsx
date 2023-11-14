import { useGetCheckList } from "../../hooks";
import { getCheckList } from "../../hooks/patchWeatherCheckList";
import { CheckListItem } from "../CheckListItem";
import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";

const CheckList = () => {
  const [checkLists, setCheckLists] = useState<string[]>([]);

  const { mutate, data } = useGetCheckList();

  useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let tempArr: string[] = [];
    if (data) {
      data.forEach((item) => {
        tempArr.push(item.toDo);
      });

      console.log(getCheckList());
      tempArr.push(getCheckList());
      setCheckLists(tempArr);
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, getCheckList().length]);

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
