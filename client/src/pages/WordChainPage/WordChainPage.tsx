import { useEffect, useState } from "react";
import { MissionInfo } from "../../components";
import {
  Container,
  CountContainer,
  DescriptionContainer,
  DescriptionCountContainer,
  RecordText,
  TypeText,
  WordContainer,
  WordText,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { usePutMission } from "../../hooks";
import { TiMicrophone } from "react-icons/ti";
import { BiLoader } from "react-icons/bi";

const turnType = {
  미러: "미러",
  사용자: "사용자",
};

const WordChainPage = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState("");
  const [record, setRecord] = useState("");
  const [answer, setAnswer] = useState("");
  const [turn, setTurn] = useState(turnType.미러);
  const [currentCount, setCurrentCount] = useState(0);
  const [missionResult, setMissionResult] = useState(false);
  const [noWordWin, setNoWordWin] = useState(false); // 이어갈 단어가 없는 경우 :유저 승리
  const GOAL_COUNT = 3;
  const [saying, setSaying] = useState(false);

  const { mutate } = usePutMission("WordChain");

  const getAnswerBySpeech = () => {
    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/wordChain"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "answer") {
        console.log(data.data);
        setAnswer(data.data);
        setRecord((record) => `${record} - ${data.data}`);
        setTurn(turnType.사용자);
      } else if (data.event === "say") {
        setSaying(true);
      } else if (data.event === "do-not-say") {
        setSaying(false);
      } else if (data.event === "suggestion") {
        console.log(data.data);
        setSuggestion(data.data);
        setRecord((record) => `${record} - ${data.data}`);
        setTurn(turnType.미러);
      } else if (data.event === "count") {
        setCurrentCount(parseInt(data.data));
      } else if (data.event === "no-word-win") {
        setNoWordWin(true);
        setCurrentCount(GOAL_COUNT);
        setMissionResult(true);
      } else if (data.event === "result") {
        if (data.data.includes("success")) {
          setMissionResult(true);
        } else if (data.data.includes("failed")) setMissionResult(false);
      } else if (data.event === "close") {
        eventSource.close();
        navigate("/");
      }
    };
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
  };

  useEffect(() => {
    if (missionResult) mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionResult]);

  useEffect(() => {
    getAnswerBySpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <MissionInfo
        title="끝말잇기"
        description={`iKU와 함께하는 끝말잇기 게임`}
      />
      <DescriptionCountContainer>
        {currentCount === GOAL_COUNT - 3
          ? "3번 승리하면 성공이에요!"
          : currentCount === GOAL_COUNT - 2
          ? "성공까지 2번 남았어요!"
          : currentCount === GOAL_COUNT - 1
          ? "마지막 한번! 조금만 힘내세요!"
          : "축하합니다. 끝말잇기 미션 성공했습니다."}
      </DescriptionCountContainer>

      {saying ? <TiMicrophone size={"3rem"} /> : <BiLoader size={"3rem"} />}
      <RecordText>
        <span>[기록] </span>
        {record}
      </RecordText>
      <WordContainer>
        <TypeText>{turn === turnType.미러 ? "제시어" : "당신의 대답"}</TypeText>
        <WordText>{turn === turnType.미러 ? suggestion : answer}</WordText>
      </WordContainer>
      {noWordWin ? (
        <DescriptionContainer>
          거울이 더 이상 아는 단어가 없어서 끝말잇기를 종료합니다
        </DescriptionContainer>
      ) : (
        <>
          <DescriptionContainer>
            <span>{`${suggestion.charAt(suggestion.length - 1)} `}</span>(으)로
            시작하는 단어를 말해주세요!
          </DescriptionContainer>
          <CountContainer>
            {currentCount}/{GOAL_COUNT}
          </CountContainer>
        </>
      )}
    </Container>
  );
};

export default WordChainPage;
