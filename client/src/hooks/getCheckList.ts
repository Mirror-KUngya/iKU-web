import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { CheckList, Missions } from "../types";
import { getLocalStorageData } from "../utils/useLocalStorage";

const getCheckList = async (UserID: string): Promise<CheckList[]> => {
  const response = await instance.get(`/checkList/${UserID}`);

  return response.data;
};

export function useGetCheckList() {
  return useMutation(() => getCheckList(getLocalStorageData("UserID")), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
