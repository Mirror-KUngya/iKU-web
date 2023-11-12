import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";
import { Missions } from "../types";

const getMissions = async (
  UserID: string,
  MissionDate: string
): Promise<Missions> => {
  const response = await instance.get(`/missions`);

  console.log(response);
  return response.data;
};

export function useGetMissions(UserID: string, MissionDate: string) {
  return useMutation(() => getMissions(UserID, MissionDate), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
