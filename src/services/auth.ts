import axios from 'axios';
import { url } from "../helpers/config.json";

export const login = async (username: string, password: string) => {
  return await axios.post(`${url}/auth/login`, {username: username, password: password});
}

export const register = async (username: string, email: string, password: string, bitcloutpubkey: string, ethereumaddress: string) => {
  return await axios
    .post(`${url}/auth/register`, {
      username: username,
      email: email,
      password: password,
      bitcloutpubkey: bitcloutpubkey,
      ethereumaddress: ethereumaddress
    });
}