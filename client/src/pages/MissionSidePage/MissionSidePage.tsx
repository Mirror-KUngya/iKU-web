import { useEffect, useState } from "react";
import { MissionStatus } from "../../utils";
import {
  Container,
  CurrentStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";
import { useNavigate } from "react-router-dom";

const MissionSidePage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [missionResult, setMissionResult] = useState(false);

  useEffect(() => {
    // runSidePytonScript
    setLeftCount(0);
    setRightCount(0);

    const eventSource = new EventSource(
      process.env.REACT_APP_API_ENDPOINT + "/detect/side"
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "loading") {
        setStatus(MissionStatus.READY);
      } else if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        if (data.data.includes("left")) setLeftCount((cur) => cur + 1);
        else if (data.data.includes("right")) setRightCount((cur) => cur + 1);
        else if (data.data.includes("success")) setMissionResult(true);
        else if (data.data.includes("failed")) setMissionResult(false);
      } else if (data.event === "close") {
        eventSource.close();
        setStatus(MissionStatus.END);
        navigate("/");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (leftCount >= 2 && rightCount >= 2) setMissionResult(true);
  // }, [leftCount, rightCount]);

  return (
    <Container>
      <MissionInfo
        title="옆구리 운동"
        description={`그림과 같이 거울을 정면으로 보고\n왼쪽 2번, 오른쪽 2번씩 각각 옆구리 운동을 해주세요!`}
        images={[`${process.env.PUBLIC_URL}/image/side.gif`]}
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
      <CurrentStatusText>왼쪽 횟수 : {leftCount}</CurrentStatusText>
      <CurrentStatusText>오른쪽 횟수 : {rightCount}</CurrentStatusText>
    </Container>
  );
};

export default MissionSidePage;
