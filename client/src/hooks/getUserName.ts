import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { getLocalStorageData } from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

const getUserName = async (UserID: string): Promise<string> => {
  const response = await instance.get(`/users/${UserID}`);

  return response.data.UserName;
};

export function useGetUserName() {
  const navigate = useNavigate();
  return useMutation(() => getUserName(getLocalStorageData("UserID")), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {
      // alert("로그인이 필요합니다.");
      // navigate("/login");
    },
  });
}
