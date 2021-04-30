import axios from "axios";
import { url } from "../helpers/config.json";

export const getLogs = async (token: string, type: string) => {
  return await axios.get(`${url}/utility/logging/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
