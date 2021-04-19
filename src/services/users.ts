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

export { updatePassword, updateProfile, forgotPassword };
