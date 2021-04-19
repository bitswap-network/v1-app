import axios from "axios";
const { url } = require("../helpers/config.json");

async function getListings() {
  return await axios.get(`${url}/listing/listings`);
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

export { getListings, myListings, createListing };
