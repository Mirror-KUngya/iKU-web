import { ItemContainer, ItemTitle } from "./styles";

interface CheckListItemProps {
  text: string;
}

const CheckListItem = ({ text }: CheckListItemProps) => {
  return (
    <ItemContainer>
      <ItemTitle>{text}</ItemTitle>
    </ItemContainer>
  );
};

export default CheckListItem;
