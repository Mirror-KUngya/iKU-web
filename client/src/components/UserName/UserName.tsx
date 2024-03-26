import { useEffect } from "react";
import { useGetUserName } from "../../hooks";
import { HeaderText } from "./styles";

const UserName = () => {
  const { mutate: getUserName, data: userName } = useGetUserName();

  useEffect(() => {
    getUserName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HeaderText>{userName ?? "건국"}님, 좋은 하루 입니다!</HeaderText>;
};

export default UserName;
