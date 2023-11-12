import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";

const postChangePW = async (
  UserID: string,
  UserPhone: string,
  newPW: string
): Promise<string> => {
  const response = await instance.post(`/users/findPW`, {
    UserID,
    UserPhone,
    newPW,
  });

  return response.data.message;
};

export function usePostChangePW(
  UserID: string,
  UserPhone: string,
  newPW: string
) {
  return useMutation(() => postChangePW(UserID, UserPhone, newPW), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
