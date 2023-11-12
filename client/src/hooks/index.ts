import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export * from "./postSignIn";
export * from "./postFindId";
export * from "./postChangePW";
