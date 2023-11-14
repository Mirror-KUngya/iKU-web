// import { AxiosError } from "axios";
// import { useMutation } from "react-query";
// import { instance } from ".";
// import { getLocalStorageData } from "../utils/useLocalStorage";
// import moment from "moment";

// const putMission = async (
//   UserID: string,
//   MissionDate: string,
//   completeMission: string
// ): Promise<string> => {
//   const response = await instance.put(`/missions`, {
//     UserID,
//     MissionDate,
//     completeMission,
//   });

//   return response.data;
// };

// export function usePutMission(completeMission: string) {
//   return useMutation(
//     () =>
//       putMission(
//         getLocalStorageData("UserID"),
//         moment().format("YYYY-MM-DD"),
//         completeMission
//       ),
//     {
//       onSuccess: (response) => {},
//       onError: (error: AxiosError) => {},
//     }
//   );
// }

let checkListContent = "";

export const CHECK_LIST_COUNT = 3;

export const patchWeatherCheckList = (content: string) => {
  console.log("patchCheck");
  checkListContent = content;
};

export const getCheckList = () => {
  console.log("getCheck");
  return checkListContent;
};
