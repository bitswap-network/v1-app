import axios from "axios";
const { url } = require("../helpers/config.json");

async function getListings(volumeSort: string, dateSort: string) {
  return await axios.get(
    `${url}/listing/listings?date=${dateSort}&volume=${volumeSort}`
  );
}

async function getListing(token: string, id: string) {
  return await axios.get(`${url}/listing/listing/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Get User Listings
async function myListings(token: string) {
  return await axios.get(`${url}/listing/mylistings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function createListing(
  bitcloutamount: number,
  usdamount: number,
  etheramount: number,
  token: string
) {
  return await axios.post(
    `${url}/listing/create`,
    {
      saletype: "USD",
      bitcloutnanos: bitcloutamount * 1e9,
      etheramount: etheramount,
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

export { getListings, getListing, myListings, createListing, buyListing };
