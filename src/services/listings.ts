import axios from "axios";
const { url } = require("../helpers/config.json");

async function getListings(volumeSort: string, dateSort: string, priceSort: string, minPrice?: number, maxPrice?: number, minVolume?: number, maxVolume?: number) {
  return await axios.get(
    `${url}/listing/listings?dateSort=${dateSort}&volumeSort=${volumeSort}&priceSort=${priceSort}&minPrice=${minPrice}&maxPrice=${maxPrice}&minVolume=${minVolume}&maxVolume=${maxVolume}`
  );
}

async function getListing(token: string, id: string) {
  return await axios.get(`${url}/listing/listing/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function createListing(
  bitcloutamount: number,
  usdamount: number,
  etheramount: number,
  depositaddress:string,
  token: string
) {
  return await axios.post(
    `${url}/listing/create`,
    {
      saletype: "USD",
      bitcloutnanos: bitcloutamount * 1e9,
      etheramount: etheramount,
      usdamount: usdamount,
      ethaddress:depositaddress
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

async function cancelListing(token: string, id: string) {
  return axios.post(
    `${url}/listing/cancel`,
    {
      id: id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

async function deleteListing(token: string, id: string) {
  return axios.post(
    `${url}/listing/delete`,
    {
      id: id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export {
  getListings,
  getListing,
  createListing,
  buyListing,
  cancelListing,
  deleteListing,
};
