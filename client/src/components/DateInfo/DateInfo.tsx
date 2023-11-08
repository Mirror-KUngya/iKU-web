import { useState } from "react";
import { Container, TimeText, DateText } from "./styles";
import moment from "moment";

const DateInfo = () => {
  const today = moment();
  const [time, setTime] = useState(today.format(" hh시 mm분"));
  // 요일 구하기
  const returnDay = (day: number) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[day];
  };

  const setCurrentTime = () => {
    setTime(today.format(" hh시 mm분"));
  };

  const startTimer = () => {
    setInterval(setCurrentTime, 1000 * 10); // 10초에 한번씩 시간 업데이트
  };

  startTimer();

  const dayOrNignt = (a: string) => (a === "AM" ? "오전" : "오후");
  return (
    <Container>
      <DateText>
        {today.format(`YYYY년 MM월 DD일 ${returnDay(today.day())}요일`)}
      </DateText>
      <TimeText>
        {dayOrNignt(today.format("A"))}
        {time}
      </TimeText>
    </Container>
  );
};

export default DateInfo;
