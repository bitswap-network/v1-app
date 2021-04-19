import axios from "axios"
const { url } = require('../helpers/config.json');

export const validateToken = async (token: string) => {
  const response = await axios.get(`${url}/auth/verifytoken`, { headers: {authorization: `Bearer ${token}`} });
  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
}

export const getListings = async () => {
  // 
}