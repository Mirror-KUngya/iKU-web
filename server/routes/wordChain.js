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

/* /wordChain */

router.get("/", (req, res) => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
  res.writeHead(200, eventStreamHeaderOption);

  pythonProcess = spawn("python3", [`src/wordChain.py`]);

  pythonProcess.stdout.on("data", (data) => {
    const messages = data.toString().split("\n");
    messages.forEach((message) => {
      if (message.includes("Say Anything!")) {
        res.write(`data: ${JSON.stringify({ event: "say" })}\n\n`);
      } else if (message.includes("In Progress...")) {
        res.write(`data: ${JSON.stringify({ event: "do-not-say" })}\n\n`);
      } else if (message.includes("answer")) {
        const answerMessage = message.split(">");
        res.write(
          `data: ${JSON.stringify({
            event: "answer",
            data: answerMessage[1],
          })}\n\n`
        );
      } else if (message.includes("suggestion")) {
        const suggestionMessage = message.split(">");
        res.write(
          `data: ${JSON.stringify({
            event: "suggestion",
            data: suggestionMessage[1],
          })}\n\n`
        );
      } else if (message.includes("count")) {
        const countMessage = message.split(">");
        res.write(
          `data: ${JSON.stringify({
            event: "count",
            data: parseInt(countMessage[1]),
          })}\n\n`
        );
      } else if (message.includes("no word")) {
        res.write(
          `data: ${JSON.stringify({
            event: "no-word-win",
          })}\n\n`
        );
      } else if (message.includes("mission")) {
        res.write(
          `data: ${JSON.stringify({
            event: "result",
            data: message,
          })}\n\n`
        );
      } else {
        res.write(
          `data: ${JSON.stringify({ event: "not-answer", data: message })}\n\n`
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
