import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { Missions } from "../types";
import moment from "moment";
import { getLocalStorageData } from "../utils/useLocalStorage";

const getMissions = async (
  UserID: string,
  MissionDate: string
): Promise<Missions> => {
  const response = await instance.get(`/missions/${UserID}/${MissionDate}`);

  return response.data;
};

export function useGetMissions() {
  return useMutation(
    () =>
      getMissions(getLocalStorageData("UserID"), moment().format("YYYY-MM-DD")),
    {
      onSuccess: (response) => {},
      onError: (error: AxiosError) => {},
    }
  );
}
