import axios from "axios";

const getETHUSD = async () => {
  return await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
};
export { getETHUSD };
