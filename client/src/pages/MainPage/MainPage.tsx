import { useNavigate } from "react-router-dom";
import {
  CheckList,
  DailyMission,
  DateInfo,
  WeatherInfo,
} from "../../components";
import {
  Container,
  Description,
  HeaderText,
  Line,
  RowContainer,
  Title,
} from "./styles";
import { useEffect, useState } from "react";

const MainPage = () => {
  const userName = "미러쿵야";
  const navigate = useNavigate();

  const [titleText, setTitleText] = useState({ first: "", second: "" });
  const [recognizing, setRecognizing] = useState(false);

  useEffect(() => {
    //runSpeechRecognition
    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/speechRecognition"
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "recognition-started") {
        setTitleText({
          first: `"거울아"`,
          second: `로 거울을 불러보세요!`,
        });
      } else if (data.event === "routing-start") {
        setTitleText({ first: "", second: `원하는 미션을 말해주세요` });
        setRecognizing(true);
      } else if (data.event === "routing") {
        navigate(`/mission/${data.data}`);
      } else if (data.event === "routing-failed") {
        setTitleText({
          first: `${data.data}`,
          second: `은(는) 제가 할 수 없는 일이에요.`,
        });
      } else if (data.event === "close") {
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {/* <div>-- 미션페이지 바로가기 --</div>
      <div>음성인식 적용되면 버튼으로 된 것들은 모두 지울 예정</div>
      <div style={{ display: "flex" }}>
        <Button onClick={() => navigate("/mission/clap")}>박수치기 미션</Button>
        <Button onClick={() => navigate("/mission/smile")}>웃기 미션</Button>
        <Button onClick={() => navigate("/mission/side")}>
          옆구리 스트레칭 미션
        </Button>
        <Button onClick={() => navigate("/mission/wordChain")}>끝말잇기</Button>
      </div> */}
      <HeaderText>{userName}님, 좋은 하루 입니다!</HeaderText>
      <Title>
        <span>{titleText.first}</span>
        {titleText.second}
      </Title>
      {recognizing && (
        <Description>ex - 박수치기, 웃기, 옆구리, 끝말잇기</Description>
      )}
      <RowContainer>
        <CheckList />
        <DailyMission />
      </RowContainer>
      <Line />
      <RowContainer>
        <DateInfo />
        <WeatherInfo />
      </RowContainer>
    </Container>
  );
};

export default MainPage;
