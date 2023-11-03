import { useState } from "react";
import MissionStatus from "../../utils/MissionStatus";
import {
  Button,
  Conntainer,
  SmileStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";

const MissionSidePage = () => {
  const ENDPOINT = "http://localhost:5001";
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [missionResult, setMissionResult] = useState(false);

  const runSidePythonScript = () => {
    setLeftCount(0);
    setRightCount(0);
    setStatus(MissionStatus.READY);

    const eventSource = new EventSource(ENDPOINT + "/detect/side");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        setMissionResult(true);
        if (data.data.trim() === "left") setLeftCount((cur) => cur + 1);
        else if (data.data.trim() === "right") setRightCount((cur) => cur + 1);
      } else if (data.event === "close") {
        eventSource.close();
        setStatus(MissionStatus.END);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
  };

  return (
    <Conntainer>
      <MissionInfo
        title="옆구리 운동"
        description={`거울을 정면으로 보고\n다음 동작을 따라해주세요!`}
        images={[
          `${process.env.PUBLIC_URL}/image/side1.png`,
          `${process.env.PUBLIC_URL}/image/side2.png`,
          `${process.env.PUBLIC_URL}/image/side3.png`,
        ]}
      />
      <MissionStatusText>
        {status === MissionStatus.READY
          ? " 카메라를 불러오는 중입니다. 잠시만 기다려 주세요 . . ."
          : status === MissionStatus.RUNNING
          ? " 미션을 진행해주세요 . . ."
          : status === MissionStatus.END
          ? ` 미션 ${missionResult ? "성공!" : "실패"}`
          : "시작 버튼을 눌러 미션을 시작하세요! "}
      </MissionStatusText>
      <Button onClick={runSidePythonScript}>미션 시작</Button>
      <SmileStatusText>왼쪽 횟수 : {leftCount}</SmileStatusText>
      <SmileStatusText>오른쪽 횟수 : {rightCount}</SmileStatusText>
    </Conntainer>
  );
};

export default MissionSidePage;
