import { useEffect, useState } from "react";
import { MissionStatus } from "../../utils";
import {
  Container,
  CurrentStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo, TimeOutInfo } from "../../components";
import { useNavigate } from "react-router-dom";
import { usePutMission } from "../../hooks";

const MissionClapPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [missionResult, setMissionResult] = useState(false);
  const [clapCount, setClapCount] = useState(0);

  const { mutate } = usePutMission("Clap");

  const MISSION_TIME = 15;

  useEffect(() => {
    //runClapPythonScript
    setClapCount(0);

    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/detect/clap"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.event === "loading") {
        setStatus(MissionStatus.READY);
      } else if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        if (data.data.includes("clap")) setClapCount((prev) => prev + 1);
        if (data.data.includes("mission")) {
          setStatus(MissionStatus.END);
          if (data.data.includes("success")) {
            setMissionResult(true);
            mutate();
          } else if (data.data.includes("failed")) setMissionResult(false);
        }
      } else if (data.event === "close") {
        eventSource.close();
        navigate("/");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      setStatus(MissionStatus.ERROR);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (missionResult) mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionResult]);

  return (
    <Container>
      <MissionInfo
        title="박수치기"
        description={`그림과 같이\n박수를 3번 천천히 쳐주세요!`}
        images={[`${process.env.PUBLIC_URL}/image/clap.gif`]}
      />
      <MissionStatusText>
        {status === MissionStatus.DEFAULT
          ? " "
          : status === MissionStatus.READY
          ? " 카메라를 불러오는 중입니다. 잠시만 기다려 주세요 . . ."
          : status === MissionStatus.RUNNING
          ? " 미션을 진행해주세요 . . ."
          : status === MissionStatus.END
          ? ` 미션 ${missionResult ? "성공!" : "실패"}`
          : ""}
      </MissionStatusText>
      <CurrentStatusText>박수 횟수 : {clapCount}</CurrentStatusText>
      {status === MissionStatus.RUNNING && <TimeOutInfo sec={MISSION_TIME} />}
    </Container>
  );
};

export default MissionClapPage;
