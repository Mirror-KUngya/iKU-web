import { useNavigate } from "react-router-dom";
import {
  CheckList,
  DailyMission,
  DateInfo,
  HourlyWeather,
  LoginButton,
  UserName,
  WeatherInfo,
} from "../../components";
import { Container, Description, Line, RowContainer, Title } from "./styles";
import { useEffect, useState } from "react";
import { TiMicrophone } from "react-icons/ti";
import { BiLoader } from "react-icons/bi";

const MainPage = () => {
  const navigate = useNavigate();

  const [titleText, setTitleText] = useState({ first: "", second: "" });
  const [saying, setSaying] = useState(false);
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
          second: ` 로 거울을 불러보세요!`,
        });
      } else if (data.event === "say") {
        setSaying(true);
      } else if (data.event === "do-not-say") {
        setSaying(false);
      } else if (data.event === "routing-start") {
        setTitleText({ first: "", second: `원하는 미션을 말해주세요` });
        setRecognizing(true);
      } else if (data.event === "routing") {
        navigate(`/mission/${data.data}`);
      } else if (data.event === "routing-failed") {
        setTitleText({
          first: ``,
          second: `제가 할 수 없는 일이에요.`,
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
      <UserName />
      <LoginButton />
      <Title>
        <span>{titleText.first}</span>
        {titleText.second}
      </Title>
      {recognizing && (
        <Description>예시 - 박수, 스마일, 옆구리, 끝말잇기</Description>
      )}
      {saying ? <TiMicrophone size={"4rem"} /> : <BiLoader size={"4rem"} />}
      <RowContainer>
        <CheckList />
        <DailyMission />
      </RowContainer>
      <Line />
      <RowContainer>
        <DateInfo />
        <WeatherInfo />
      </RowContainer>
      <HourlyWeather />
    </Container>
  );
};

export default MainPage;
