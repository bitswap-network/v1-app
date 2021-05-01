import axios from "axios";
import { url } from "../helpers/config.json";

export const getLogs = async (token: string, type: string) => {
  return await axios.get(`${url}/utility/logging/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTotalVolume = async () => {
  return await axios.get(`${url}/utility/totalcompleted`);
};

export const getAvgPrice = async () => {
  return await axios.get(`${url}/utility/avgprice`);
};

export const getPendingTransactions = async (token: string) => {
  return await axios.get(`${url}/utility/pendingtxns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

