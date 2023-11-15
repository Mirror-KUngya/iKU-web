import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { getLocalStorageData } from "../utils/useLocalStorage";
import moment from "moment";

const putMissionReset = async (
  UserID: string,
  MissionDate: string
): Promise<string> => {
  const response = await instance.put(`/missions/reset`, {
    UserID,
    MissionDate,
  });

  return response.data;
};

export function usePutMissionReset() {
  return useMutation(
    () =>
      putMissionReset(
        getLocalStorageData("UserID"),
        moment().format("YYYY-MM-DD")
      ),
    {
      onSuccess: (response) => {
        window.location.reload();
      },
      onError: (error: AxiosError) => {},
    }
  );
}
