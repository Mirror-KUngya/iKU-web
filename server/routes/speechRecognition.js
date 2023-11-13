const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

const eventStreamHeaderOption = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Access-Control-Allow-Origin": "*",
};

let pythonProcess = null;

/* /speechRecognition */

router.get("/", (req, res) => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }

  res.writeHead(200, eventStreamHeaderOption);

  pythonProcess = spawn("python3", [`src/speechRecognition.py`]);

  pythonProcess.stdout.on("data", (data) => {
    const messages = data.toString().split("\n");

    messages.forEach((message) => {
      if (message.includes("Say Anything!")) {
        res.write(`data: ${JSON.stringify({ event: "say" })}\n\n`);
      } else if (message.includes("In Progress...")) {
        res.write(`data: ${JSON.stringify({ event: "do-not-say" })}\n\n`);
      } else if (message.includes("Recognition Start")) {
        // 음성인식 시작 후 키워드 "거울아"를 기다립니다.
        res.write(
          `data: ${JSON.stringify({ event: "recognition-started" })}\n\n`
        );
      } else if (message.includes("Routing Start")) {
        res.write(
          `data: ${JSON.stringify({
            event: "routing-start",
          })}\n\n`
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

module.exports = router;
