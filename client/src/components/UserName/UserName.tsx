import { useEffect } from "react";
import { useGetUserName } from "../../hooks";
import { HeaderText } from "./styles";

const UserName = () => {
  const { mutate, data } = useGetUserName();

  useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HeaderText>{data}님, 좋은 하루 입니다!</HeaderText>;
};

export default UserName;
