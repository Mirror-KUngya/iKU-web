import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";

const postFindId = async (UserPhone: string): Promise<string> => {
  const response = await instance.post(`/users/findID`, {
    UserPhone,
  });

  return response.data.UserID;
};

export function usePostFindId(UserPhone: string) {
  return useMutation(() => postFindId(UserPhone), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
