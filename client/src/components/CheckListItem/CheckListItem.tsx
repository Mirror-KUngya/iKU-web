interface CheckListItemProps {
  text: string;
}
const CheckListItem = ({ text }: CheckListItemProps) => {
  return <div>{text}</div>;
};

export default CheckListItem;
