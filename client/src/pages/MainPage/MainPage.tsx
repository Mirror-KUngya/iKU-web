import {
  CheckList,
  DailyMission,
  DateInfo,
  VoiceRecognition,
} from "../../components";
import WheatherInfo from "../../components/WeatherInfo/WeatherInfo";
import { Container, Title } from "./styles";

const MainPage = () => {
  const userName = "미러쿵야";

  return (
    <Container>
      <Title>{userName}님, 좋은 하루 입니다!</Title>
      <VoiceRecognition />
      <CheckList />
      <DailyMission />
      <DateInfo />
      <WheatherInfo />
    </Container>
  );
};

export default MainPage;
