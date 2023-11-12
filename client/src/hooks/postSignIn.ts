import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { instance } from ".";
import { setLocalStorageData } from "../utils/useLocalStorage";

const postLogin = async (UserID: string, UserPW: string): Promise<string> => {
  const response = await instance.post(`/users/signIn`, {
    UserID,
    UserPW,
  });

  return response.data.UserID;
};

export function usePostLogin(UserID: string, UserPW: string) {
  const navigate = useNavigate();

  return useMutation(() => postLogin(UserID, UserPW), {
    onSuccess: (UserID) => {
      alert("로그인 성공");

      setLocalStorageData("UserID", UserID);
      navigate("/");
    },
    onError: (error: AxiosError) => {
      alert("로그인 실패");
    },
  });
}
