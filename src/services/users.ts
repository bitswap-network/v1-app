import axios from "axios";
const { url } = require("../helpers/config.json");

// Update profile
const updateProfile = async (
  name: string,
  email: string,
  bitcloutpubkey: string,
  ethereumaddress: string,
  token: string
) => {
  return await axios.post(
    `${url}/user/updateprofile`,
    {
      name: name,
      email: email,
      bitcloutpubkey: bitcloutpubkey,
      ethereumaddress: ethereumaddress,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const updatePassword = async (
  oldpassword: string,
  newpassword: string,
  token: string
) => {
  return await axios.post(
    `${url}/user/updatepassword`,
    {
      oldpassword: oldpassword,
      newpassword: newpassword,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const forgotPassword = async (email: string) => {
  return await axios.post(`${url}/user/forgotpassword`, { email: email });
};

const deposit = async (bitcloutvalue: number, token: string) => {
  return await axios.post(`${url}/user/deposit`, {bitcloutvalue: bitcloutvalue}, {headers: {Authorization: `Bearer ${token}`}})
}

const withdraw = async (bitcloutvalue: number, token: string) => {
  return await axios.post(`${url}/user/withdraw`, {bitcloutvalue: bitcloutvalue}, {headers: {Authorization: `Bearer ${token}`}})
}

const getTransactions = async (token: string) => {
  return await axios.get(`${url}/user/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { updatePassword, updateProfile, forgotPassword, deposit, withdraw, getTransactions };
