import { useEffect, useState } from "react";
import { MissionStatus } from "../../utils";
import {
  Container,
  CurrentStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";
import { useNavigate } from "react-router-dom";

const MissionClapPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [missionResult, setMissionResult] = useState(false);
  const [clapCount, setClapCount] = useState(0);

  useEffect(() => {
    //runClapPythonScript
    setClapCount(0);

    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/detect/clap"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "loading") {
        setStatus(MissionStatus.READY);
      } else if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        if (data.data.includes("clap")) {
          setClapCount((prev) => prev + 1);
        }
      }
      if (data.data.includes("mission success")) {
        setMissionResult(true);
        navigate("/");
      } else if (data.event === "close") {
        eventSource.close();
        setStatus(MissionStatus.END);
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
    if (clapCount >= 3) {
      setMissionResult(true);
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clapCount]);

  return (
    <Container>
      <MissionInfo
        title="박수치기"
        description={`그림과 거울을 정면으로 보고\n박수를 3번 크게 쳐주세요!`}
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
        {/* : "에러 발생, 네트워크를 확인해주세요. "} */}
      </MissionStatusText>
      <CurrentStatusText>박수 횟수 : {clapCount}</CurrentStatusText>
    </Container>
  );
};

export default MissionClapPage;
