import { ItemContainer, ItemTitle } from "./styles";
import { BsCheck } from "react-icons/bs";
interface DailyMissionItemProps {
  title: string;
  fulfilled: boolean;
}
const DailyMissionItem = ({ title, fulfilled }: DailyMissionItemProps) => {
  return (
    <ItemContainer>
      <ItemTitle className={fulfilled ? "done" : ""}>{title}</ItemTitle>
      {fulfilled ? <BsCheck color="gray" size={"3.5rem"} /> : ""}
    </ItemContainer>
  );
};

export default DailyMissionItem;
