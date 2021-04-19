import axios from "axios"
import { url } from "./config.json";

export const register = async (username: String, password: String) => {
  const response = await axios.post(`${url}/register`, {
    username: username,
    password: password,
  })
}

export const isValidToken = async (token: String) => {
  const response = await axios.get(`${url}/verifytoken`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
}