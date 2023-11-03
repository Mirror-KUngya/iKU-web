import { CheckList, DailyMission, DateInfo } from "../../components";
import WheatherInfo from "../../components/WeatherInfo/WeatherInfo";
import { Container, Line, RowContainer, Title } from "./styles";

const MainPage = () => {
  const userName = "미러쿵야";

  return (
    <Container>
      <Title>{userName}님, 좋은 하루 입니다!</Title>
      <RowContainer>
        <CheckList />
        <DailyMission />
      </RowContainer>
      <Line />
      <DateInfo />
      <WheatherInfo />
    </Container>
  );
};

export default MainPage;
