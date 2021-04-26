import axios from "axios";
const { url } = require("../helpers/config.json");

// Update profile
const updateProfile = async (
  name: string,
  email: string,
  ethereumaddress: string,
  token: string
) => {
  return await axios.post(
    `${url}/user/updateprofile`,
    {
      name: name,
      email: email,
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

const getTransactions = async (token: string) => {
  return await axios.get(`${url}/user/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deposit = async (token: string, bitcloutvalue: number) => {
  return await axios.post(
    `${url}/user/deposit`,
    {
      bitcloutvalue: bitcloutvalue,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
const withdraw = async (token: string, bitcloutvalue: number) => {
  return await axios.post(
    `${url}/user/withdraw`,
    {
      bitcloutvalue: bitcloutvalue,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const getProfile = async (username: string) => {
  return await axios.get(`${url}/user/profile/${username}`)
}

const verifyBitclout = async (token: string) => {
  return await axios.post(
    `${url}/user/verifyBitclout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
export {
  updatePassword,
  updateProfile,
  forgotPassword,
  getTransactions,
  deposit,
  withdraw,
  getProfile,
  verifyBitclout,
};
