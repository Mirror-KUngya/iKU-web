import { useEffect, useState } from "react";
import { MissionStatus } from "../../utils";
import {
  Container,
  CurrentStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";
import { useNavigate } from "react-router-dom";
import { usePutMission } from "../../hooks";

const MissionSmilePage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [smileStatus, setSmileStatus] = useState(false);
  const [missionResult, setMissionResult] = useState(false);

  const { mutate } = usePutMission("Smile");

  useEffect(() => {
    //runSmilePythonScript
    setSmileStatus(false);

    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/detect/smile"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "loading") {
        setStatus(MissionStatus.READY);
      } else if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        if (data.data.includes("smile")) setSmileStatus(true);
        else if (data.data.includes("not")) setSmileStatus(false);
        if (data.data.includes("mission")) {
          setStatus(MissionStatus.END);
          if (data.data.includes("success")) setMissionResult(true);
          else if (data.data.includes("failed")) setMissionResult(false);
        }
      } else if (data.event === "close") {
        eventSource.close();
        navigate("/");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
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
        title="웃기"
        description={`그림과 같이 거울을 정면으로 보고\n5초 이상 활짝 웃어 주세요!`}
        images={[`${process.env.PUBLIC_URL}/image/smile.gif`]}
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
          : "에러 발생, 네트워크를 확인해주세요. "}
      </MissionStatusText>
      <CurrentStatusText>
        {smileStatus ? "웃고 있어요 ^^" : "다시 웃어보세요 ~ㄴ"}
      </CurrentStatusText>
    </Container>
  );
};

export default MissionSmilePage;
