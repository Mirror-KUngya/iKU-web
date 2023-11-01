const DateInfo = () => {
  const date = new Date();
  return <div>{date.toISOString()}</div>;
};

export default DateInfo;
