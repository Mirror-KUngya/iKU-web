let missions = [
  {
    title: "박수 치기",
    fulfilled: false,
  },
  {
    title: "활짝 웃기",
    fulfilled: false,
  },
  {
    title: "옆구리 운동",
    fulfilled: false,
  },
  {
    title: "끝말잇기",
    fulfilled: false,
  },
];

const getMissions = () => {
  return missions;
};

const setMissions = (idx: number, ok: boolean) => {
  const newArr = missions;
  newArr[idx].fulfilled = ok;
  missions = newArr;
};

export { missions, getMissions, setMissions };
