import { useNavigate } from "react-router-dom";
import { CheckList, DailyMission, DateInfo } from "../../components";
import WheatherInfo from "../../components/WeatherInfo/WeatherInfo";
import { Button, Container, Line, RowContainer, Title } from "./styles";

const MainPage = () => {
  const userName = "미러쿵야";
  const navigate = useNavigate();
  return (
    <Container>
      <div>-- 미션페이지 바로가기 --</div>
      <div>음성인식 적용되면 버튼으로 된 것들은 모두 지울 예정</div>
      <div style={{ display: "flex" }}>
        <Button onClick={() => navigate("/mission/clap")}>박수치기 미션</Button>
        <Button onClick={() => navigate("/mission/smile")}>웃기 미션</Button>
        <Button onClick={() => navigate("/mission/side")}>
          옆구리 스트레칭 미션
        </Button>
      </div>
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
