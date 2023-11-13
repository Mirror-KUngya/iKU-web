const express = require("express");
const app = express();
const port = 5001;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const detectRouter = require("./routes/detect"); // 인공지능 미션
const wordChainRouter = require("./routes/wordChain"); // 끝말잇기
const speechRecognitionRouter = require("./routes/speechRecognition"); // 음성인식

app.use("/detect", detectRouter);
app.use("/wordChain", wordChainRouter);
app.use("/speechRecognition", speechRecognitionRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
