import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { getLocalStorageData } from "../utils/useLocalStorage";

const postCheckList = async (UserID: string, toDo: string): Promise<string> => {
  const response = await instance.post(`/checkList`, {
    UserID,
    toDo,
  });

  return response.data.addMission;
};

export function usePostCheckList(toDo: string) {
  return useMutation(() => postCheckList(getLocalStorageData("UserID"), toDo), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
