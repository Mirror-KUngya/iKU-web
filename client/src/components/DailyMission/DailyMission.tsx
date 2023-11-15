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
      page: "/mission/clap",
      fulfilled: false,
    },
    {
      title: "활짝 웃기",
      name: "Smile",
      page: "/mission/smile",
      fulfilled: false,
    },
    {
      title: "옆구리 운동",
      name: "Exercise",
      page: "/mission/side",
      fulfilled: false,
    },
    {
      title: "끝말잇기",
      name: "WordChain",
      page: "/mission/wordChain",
      fulfilled: false,
    },
  ]);

  return (
    <Container>
      <Title>
        <FaPersonWalking size={"3rem"} />
        일일 미션
      </Title>
      {dailyMission.map(({ title, fulfilled, page }, idx) => {
        return (
          <DailyMissionItem
            title={title}
            fulfilled={fulfilled}
            key={idx}
            page={page}
          />
        );
      })}
    </Container>
  );
};
export default DailyMission;
