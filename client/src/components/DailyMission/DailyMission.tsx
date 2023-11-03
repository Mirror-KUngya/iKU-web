import { useState } from "react";
import { Container, Title } from "./styles";
import { DailyMissionItem } from "../DailyMissionItem";
const DailyMission = () => {
  const [dailyMission, setDailyMission] = useState([
    {
      title: "박수 치기",
      fulfilled: false,
    },
    {
      title: "활짝 웃기",
      fulfilled: false,
    },
    {
      title: "옆구리 운동",
      fulfilled: false,
    },
    {
      title: "끝말잇기",
      fulfilled: false,
    },
  ]);
  return (
    <Container>
      <Title>일일미션</Title>
      {dailyMission.map(({ title, fulfilled }, idx) => {
        return (
          <DailyMissionItem title={title} fulfilled={fulfilled} key={idx} />
        );
      })}
    </Container>
  );
};
export default DailyMission;
