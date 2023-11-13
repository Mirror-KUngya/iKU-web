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

/* /detect/:mission */

router.get("/:mission", (req, res) => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }

  res.writeHead(200, eventStreamHeaderOption);

  const mission = req.params.mission;
  let targetFile = "";
  if (mission === "smile") targetFile = "smile.py";
  else if (mission === "clap") targetFile = "clap.py";
  else if (mission === "side") targetFile = "side.py";

  pythonProcess = spawn("python3", [`src/${targetFile}`]);

  pythonProcess.stdout.on("data", (data) => {
    const message = data.toString();
    console.log(message);
    if (message.includes("loading")) {
      res.write(`data: ${JSON.stringify({ event: "loading" })}\n\n`);
    } else if (message.includes("Camera started")) {
      console.log("Camera has started.");
      res.write(`data: ${JSON.stringify({ event: "camera-started" })}\n\n`);
    } else if (message.includes("mission")) {
      // 미션 완료 후 성공 or 실패
      res.write(
        `data: ${JSON.stringify({ event: "result", data: message })}\n\n`
      );
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

module.exports = router;
