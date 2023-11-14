import { Container } from "./styles";
import { PiTimerBold } from "react-icons/pi";

const TimeOutInfo = ({ sec }: { sec: number }) => {
  return (
    <Container>
      <PiTimerBold />
      제한시간 | {sec}초
    </Container>
  );
};

export default TimeOutInfo;
