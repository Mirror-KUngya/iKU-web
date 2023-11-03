interface DailyMissionItemProps {
  title: string;
  fulfilled: boolean;
}
const DailyMissionItem = ({ title, fulfilled }: DailyMissionItemProps) => {
  return <div>{title}</div>;
};

export default DailyMissionItem;
