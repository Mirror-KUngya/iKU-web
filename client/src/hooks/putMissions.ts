import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { instance } from ".";

const putMissions = async (
  UserID: string,
  MissionDate: string
): Promise<string> => {
  const response = await instance.post(`/missions`, {
    UserID,
    MissionDate,
  });

  console.log(response);
  return response.data;
};

export function usePutMissions(UserID: string, MissionDate: string) {
  return useMutation(() => putMissions(UserID, MissionDate), {
    onSuccess: (response) => {},
    onError: (error: AxiosError) => {},
  });
}
