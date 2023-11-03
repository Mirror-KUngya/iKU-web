import { useState } from "react";
import MissionStatus from "../../utils/MissionStatus";
import {
  Button,
  Conntainer,
  SmileStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";

const MissionSmilePage = () => {
  const ENDPOINT = "http://localhost:5001";
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [smileStatus, setSmileStatus] = useState(false);
  const [missionResult, setMissionResult] = useState(false);

  const runSmilePythonScript = () => {
    setSmileStatus(false);
    setStatus(MissionStatus.READY);

    const eventSource = new EventSource(ENDPOINT + "/detect/smile");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        data.data.includes("smile")
          ? (setSmileStatus(true), setMissionResult(true))
          : setSmileStatus(false);
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
        title="웃기"
        description={`거울을 정면으로 보고\n활짝 웃어 주세요!`}
        images={[
          `${process.env.PUBLIC_URL}/image/smile1.png`,
          `${process.env.PUBLIC_URL}/image/smile2.png`,
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
      <Button onClick={runSmilePythonScript}>미션 시작</Button>
      <SmileStatusText>{smileStatus ? "smile" : ""}</SmileStatusText>
    </Conntainer>
  );
};

export default MissionSmilePage;
