import { useEffect, useState } from "react";
import { Container, Title } from "./styles";
import { DailyMissionItem } from "../DailyMissionItem";
import { FaPersonWalking } from "react-icons/fa6";
import { useGetMissions } from "../../hooks/getMissions";
import { Missions } from "../../types";

const DailyMission = () => {
  const { mutate, data } = useGetMissions();

  useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const updatedMissions = dailyMission.map((mission) => {
        return { ...mission, fulfilled: data[mission.name as keyof Missions] };
      });

      setDailyMission(updatedMissions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [dailyMission, setDailyMission] = useState([
    {
      title: "박수 치기",
      name: "Clap",
      fulfilled: false,
    },
    {
      title: "활짝 웃기",
      name: "Smile",
      fulfilled: false,
    },
    {
      title: "옆구리 운동",
      name: "Exercise",
      fulfilled: false,
    },
    {
      title: "끝말잇기",
      name: "WordChain",
      fulfilled: data ? data.WordChain : false,
    },
  ]);

  return (
    <Container>
      <Title>
        <FaPersonWalking size={"3rem"} />
        일일 미션
      </Title>
      {dailyMission.map(({ title, fulfilled }, idx) => {
        return (
          <DailyMissionItem title={title} fulfilled={fulfilled} key={idx} />
        );
      })}
    </Container>
  );
};
export default DailyMission;
