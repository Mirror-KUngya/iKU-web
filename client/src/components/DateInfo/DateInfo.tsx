import { Container, TimeText, DateText } from "./styles";
import moment from "moment";

const DateInfo = () => {
  const today = moment();

  // 요일 구하기
  const returnDay = (day: number) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[day];
  };

  const dayOrNignt = (a: string) => (a === "AM" ? "오전" : "오후");
  return (
    <Container>
      <DateText>
        {today.format(`YYYY년 MM월 DD일 ${returnDay(today.day())}요일`)}
      </DateText>
      <TimeText>
        {dayOrNignt(today.format("A"))}
        {today.format(" hh시 mm분")}
      </TimeText>
    </Container>
  );
};

export default DateInfo;
