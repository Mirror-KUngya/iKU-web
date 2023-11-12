import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { instance } from ".";

const postLogin = async (UserID: string, UserPW: string): Promise<string> => {
  const response = await instance.post(`/users/signIn`, {
    UserID,
    UserPW,
  });

  return response.data;
};

export function usePostLogin(UserID: string, UserPW: string) {
  const navigate = useNavigate();

  return useMutation(() => postLogin(UserID, UserPW), {
    onSuccess: () => {
      alert("로그인 성공");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      alert("로그인 실패");
    },
  });
}
