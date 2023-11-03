import { useState } from "react";

const TestPage = () => {
  const ENDPOINT = "http://localhost:5001";
  const [status, setStatus] = useState("");

  const [smileStatus, setSmileStatus] = useState(false);

  const runSmilePythonScript = () => {
    setSmileStatus(false);
    setStatus("Ready");

    const eventSource = new EventSource(ENDPOINT + "/detect/smile");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus("Run");
      } else if (data.event === "result") {
        data.data.includes("smile")
          ? setSmileStatus(true)
          : setSmileStatus(false);
      } else if (data.event === "close") {
        setStatus("End");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
  };
  const [clapCount, setClapCount] = useState(0);

  const runClapPythonScript = async () => {
    setClapCount(0);
    setStatus("Ready");
    const eventSource = new EventSource(ENDPOINT + "/detect/clap");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus("Run");
      } else if (data.event === "result") {
        if (data.data.include("clap")) setClapCount((prev) => prev + 1);
      } else if (data.event === "close") {
        eventSource.close();
        setStatus("End");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
  };

  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const runSidePythonScript = async () => {
    setLeftCount(0);
    setRightCount(0);
    setStatus("Ready");

    const eventSource = new EventSource(ENDPOINT + "/detect/side");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "camera-started") {
        setStatus("Run");
      } else if (data.event === "result") {
        if (data.data.trim() === "left") setLeftCount((cur) => cur + 1);
        else if (data.data.trim() === "right") setRightCount((cur) => cur + 1);
      } else if (data.event === "close") {
        eventSource.close();
        setStatus("End");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close(); // 에러 발생시 연결을 닫습니다.
    };
  };

  return (
    <div>
      <button onClick={runSmilePythonScript}>Run smile.py</button>
      <p>smile 상태 : {smileStatus ? "smile" : ""}</p>
      <button onClick={runClapPythonScript}>Run clap.py</button>
      <p>clap 횟수 : {clapCount}</p>
      <button onClick={runSidePythonScript}>Run side.py</button>
      <p>left side 횟수 : {leftCount}</p>
      <p>right side 횟수 : {rightCount}</p>
      <div>
        진행상황 :
        {status === "Ready"
          ? " 카메라를 불러오는 중입니다. 잠시만 기다려 주세요 . . ."
          : status === "Run"
          ? " 미션을 진행해주세요 . . ."
          : status === "End"
          ? " 미션 결과를 확인하세요"
          : ""}
      </div>
    </div>
  );
};

export default TestPage;
