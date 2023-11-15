import { useNavigate } from "react-router-dom";
import { ItemContainer, ItemTitle } from "./styles";
import { BsCheck } from "react-icons/bs";
interface DailyMissionItemProps {
  title: string;
  fulfilled: boolean;
  page?: string;
}
const DailyMissionItem = ({
  title,
  fulfilled,
  page,
}: DailyMissionItemProps) => {
  const navigate = useNavigate();
  return (
    <ItemContainer>
      <ItemTitle
        className={fulfilled ? "done" : ""}
        onClick={() => {
          page && navigate(`${page}`);
        }}
      >
        {title}
      </ItemTitle>
      {fulfilled ? <BsCheck color="gray" size={"3.5rem"} /> : ""}
    </ItemContainer>
  );
};

export default DailyMissionItem;
