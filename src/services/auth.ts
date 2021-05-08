import axios from "axios";
import { url } from "../helpers/config.json";
export const identityLogin = async (
  PublicKeyBase58Check: string,
  jwt: string
) => {
  return await axios.post(`${url}/auth/identity-login`, {
    PublicKeyBase58Check: PublicKeyBase58Check,
    identityJWT: jwt,
  });
};
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
  bitcloutpubkey: string
) => {
  return await axios.post(`${url}/auth/register`, {
    username: username,
    email: email,
    password: password,
    bitcloutpubkey: bitcloutpubkey,
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
export const getProfile = async (username?: string, publickey?: string) => {
  let query = "";
  if (username && publickey) {
    query = query.concat(query, `?username=${username}&publickey=${publickey}`);
  } else if (username) {
    query = query.concat(query, `?username=${username}`);
  } else if (publickey) {
    query = query.concat(query, `?publickey=${publickey}`);
  }
  return await axios
    .get(`${url}/auth/fetchProfile${query}`)
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
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
