import { useState } from "react";
import { Container, Title } from "./styles";
import { DailyMissionItem } from "../DailyMissionItem";
import { FaPersonWalking } from "react-icons/fa6";
// import { useGetMissions } from "../../hooks/getMissions";
// import moment from "moment";

const DailyMission = () => {
  const [dailyMission] = useState([
    {
      title: "박수 치기",
      name: "clap",
      fulfilled: false,
    },
    {
      title: "활짝 웃기",
      fulfilled: true,
    },
    {
      title: "옆구리 운동",
      fulfilled: true,
    },
    {
      title: "끝말잇기",
      fulfilled: false,
    },
  ]);
  // const UserID = "test";
  // const MissionDate = moment().format("YYYY-MM-DD");

  // const { mutate, data } = useGetMissions(UserID, MissionDate);

  // useEffect(() => {
  //   mutate();
  //   if (data) console.log(data);
  // }, []);

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
