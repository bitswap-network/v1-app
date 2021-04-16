import axios from "axios";
import env from "../components/data/env.json";
const Web3 = require("web3");
const web3 = new Web3(
  "https://eth-kovan.alchemyapi.io/v2/b9x1jf-sU8D82Wp6SZ7rQxB-pQ7IkbVL"
);
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
const priceFeedcontract = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
const register = (
  username: string,
  email: string,
  password: string,
  bitcloutid: string,
  ethAddress: string
) => {
  return axios.post(env.url + "/register", {
    username,
    email,
    password,
    bitcloutid,
    ethAddress,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(env.url + "/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getListings = () => {
  return axios
    .get(`${env.url}/listings`)
    .then((response) => {
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("listings", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error: any) => {
      return error;
    });
};

const priceFeed = () => {
  return priceFeedcontract.methods
    .latestRoundData()
    .call()
    .then((data: any) => {
      if (data) {
        localStorage.setItem(
          "priceFeed",
          (parseInt(data.answer) / 1e8).toString()
        );
      }
      return parseInt(data.answer) / 1e8;
    })
    .catch((error: any) => {
      return error;
    });
};

export default {
  register,
  login,
  logout,
  getListings,
  priceFeed,
};
