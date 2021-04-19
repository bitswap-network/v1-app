import axios from "axios";
const usdBtcTracker = "https://blockchain.info/ticker";
const btcltexchangerate = "https://api.bitclout.com/get-exchange-rate";
const getETHUSD = async () => {
  return await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
};

const getBTCLT = async () => {
  let r1 = await axios.get(usdBtcTracker);
  let r2 = await axios.get(btcltexchangerate);
  console.log(r1.data, r2.data);
  return (
    1e9 /
    ((1e9 / r2.data.SatoshisPerBitCloutExchangeRate / r1.data.USD.last) * 1e8)
  );
};
export { getETHUSD, getBTCLT };
