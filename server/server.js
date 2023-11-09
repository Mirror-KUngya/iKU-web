const express = require("express");
const app = express();
const port = 5001;

const cors = require("cors");
const { spawn } = require("child_process");

app.use(cors());
app.use(express.json());

const eventStreamHeaderOption = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Access-Control-Allow-Origin": "*",
};

app.get("/detect/:mission", (req, res) => {
  res.writeHead(200, eventStreamHeaderOption);

  const mission = req.params.mission;
  let targetFile = "";
  if (mission === "smile") targetFile = "smile.py";
  else if (mission === "clap") targetFile = "clap.py";
  else if (mission === "side") targetFile = "side.py";

  const pythonProcess = spawn("python3", [`src/${targetFile}`]);

  pythonProcess.stdout.on("data", (data) => {
    const message = data.toString();

    if (message.includes("loading")) {
      res.write(`data: ${JSON.stringify({ event: "loading" })}\n\n`);
    } else if (message.includes("Camera started")) {
      // 카메라 시작 메시지를 처리합니다.
      console.log("Camera has started.");
      res.write(`data: ${JSON.stringify({ event: "camera-started" })}\n\n`);
    } else {
      res.write(
        `data: ${JSON.stringify({ event: "result", data: message })}\n\n`
      );
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    res.write(`data: ${JSON.stringify({ event: "close", code: code })}\n\n`); // 종료 메시지
    res.end();
  });
});

app.get("/speechRecognition", (req, res) => {
  res.writeHead(200, eventStreamHeaderOption);

  const pythonProcess = spawn("python3", [`src/speechRecognition.py`]);

  pythonProcess.stdout.on("data", (data) => {
    const message = data.toString();

    if (message.includes("Recognition Start")) {
      // 음성인식 시작 후 키워드 "거울아"를 기다립니다.
      res.write(
        `data: ${JSON.stringify({ event: "recognition-started" })}\n\n`
      );
    } else if (message.includes("Routing Start")) {
      res.write(
        `data: ${JSON.stringify({ event: "routing-start", data: message })}\n\n`
      );
    } else if (message.includes("is defined function")) {
      const resultMessage = message.split(">");

      res.write(
        `data: ${JSON.stringify({
          event: "routing",
          data: resultMessage[0],
        })}\n\n`
      );
    } else if (message.includes("is not defined function")) {
      const resultMessage = message.split(">");
      console.log(resultMessage);
      res.write(
        `data: ${JSON.stringify({
          event: "routing-failed",
          data: resultMessage[0],
        })}\n\n`
      );
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.write(`data: ${JSON.stringify({ event: "close", code: code })}\n\n`); // 종료 메시지
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
