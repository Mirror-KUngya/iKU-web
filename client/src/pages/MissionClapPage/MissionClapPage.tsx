import { useState } from "react";
import MissionStatus from "../../utils/MissionStatus";
import {
  Button,
  Conntainer,
  SmileStatusText,
  MissionStatusText,
} from "../../commonStyles";
import { MissionInfo } from "../../components";

const MissionClapPage = () => {
  const ENDPOINT = "http://localhost:5001";
  const [status, setStatus] = useState(MissionStatus.DEFAULT);
  const [missionResult, setMissionResult] = useState(false);
  const [clapCount, setClapCount] = useState(0);

  const runClapPythonScript = async () => {
    setClapCount(0);
    setStatus(MissionStatus.READY);
    const eventSource = new EventSource(ENDPOINT + "/detect/clap");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus(MissionStatus.RUNNING);
      } else if (data.event === "result") {
        if (data.data.includes("clap")) setClapCount((prev) => prev + 1);
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
        title="박수치기"
        description={`거울을 정면으로 보고\n손뼉을 3회 크게 맞대주세요!`}
        images={[
          `${process.env.PUBLIC_URL}/image/clap1.png`,
          `${process.env.PUBLIC_URL}/image/clap2.png`,
          `${process.env.PUBLIC_URL}/image/clap3.png`,
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
      <Button onClick={runClapPythonScript}>미션 시작</Button>
      <SmileStatusText>박수 횟수 : {clapCount}</SmileStatusText>
    </Conntainer>
  );
};

export default MissionClapPage;
