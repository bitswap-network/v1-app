import axios from "axios";
import { url } from "../helpers/config.json";

export const login = async (username: string, password: string) => {
  return await axios.post(`${url}/auth/login`, {
    username: username,
    password: password,
  });
};

export const register = async (
  username: string,
  email: string,
  password: string,
  bitcloutpubkey: string,
  ethereumaddress: string,
  bitcloutverified: boolean,
  profilepicture: string,
  description: string
) => {
  return await axios.post(`${url}/auth/register`, {
    username: username,
    email: email,
    password: password,
    bitcloutpubkey: bitcloutpubkey,
    ethereumaddress: ethereumaddress,
    bitcloutverified: bitcloutverified,
    profilepicture: profilepicture,
    description: description,
  });
};

// Validate Token
export const validateToken = async (token: string) => {
  return await axios
    .get(`${url}/auth/verifytoken`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
export const getProfile = async (username: string) => {
  return await axios
    .post(`${url}/auth/getbitcloutprofile`, {
      PublicKeyBase58Check: "",
      Username: username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const forgotPassword = async (email: string) => {
  return await axios
  .post(`${url}/user/forgotpassword`, {
    email: email,
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.log(error);
  })
}