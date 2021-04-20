import axios from "axios";
const { url } = require("../helpers/config.json");

async function getListings(volumeSort: string, dateSort: string) {
  return await axios.get(
    `${url}/listing/listings?date=${dateSort}&volume=${volumeSort}`
  );
}

// Get User Listings
async function myListings(userId: string, token: string) {
  return await axios.get(`${url}/listing/listings/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function createListing(
  bitcloutamount: number,
  usdamount: number,
  token: string
) {
  return await axios.post(
    `${url}/listing/create`,
    {
      saletype: "USD",
      bitcloutnanos: bitcloutamount * 1e9,
      usdamount: usdamount,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

async function buyListing(token: string, id: string) {
  return axios.post(
    `${url}/listing/buy`,
    {
      id: id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export { getListings, myListings, createListing };
