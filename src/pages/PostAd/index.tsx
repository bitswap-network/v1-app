import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { logout } from "../../actions/auth";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";
import NavBar from "components/NavBar";
const Web3 = require("web3");



const PostAd = (props: any) => {
  const dispatch = useAppDispatch();
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
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
  const [price, setPrice] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [smalltransaction, setSmalltransaction] = useState(false);

  const [error, setError] = useState({
    name: false,
    username: false,
    bitcloutid: false,
    bitcloutamount: false,
    pricePerBitclout: false,
    ethAmount: false,
    ethAddress: false,
  });
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { user: currentUser } = useAppSelector((state) => state.auth);

  if (currentUser && Object.keys(currentUser).length === 0) {
    dispatch(logout() as any);
  }

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [form, setForm] = useState({
    name: "" as string,
    username: "Sigil",
    bitcloutid: "Sigils Bitclout ID",
    ethAddress: "Sigils Ethereum Address",
    bitcloutamount: 0 as number,
    pricePerBitclout: 0 as number,
    ethAmount: 0 as number,
  });
  const valerrorHandler = () => {
    setError({
      ...error,
      name: form.name.length < 1 ? true : false,
      username: form.username.length < 1 ? true : false,
      bitcloutid: form.bitcloutid.length < 1 ? true : false,
      bitcloutamount: form.bitcloutamount <= 0 ? true : false,
      pricePerBitclout: form.pricePerBitclout <= 0 ? true : false,
      ethAddress: form.ethAddress.length < 1 ? true : false,
    });

    if (
      form.name.length < 1 ||
      form.username.length < 1 ||
      form.bitcloutid.length < 1 ||
      form.bitcloutamount <= 0 ||
      form.pricePerBitclout <= 0 ||
      form.ethAddress.length < 1
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      name: false,
      username: false,
      bitcloutid: false,
      bitcloutamount: false,
      pricePerBitclout: false,
      ethAmount: false,
      ethAddress: false,
    });
  };
  const handleNumChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: parseFloat(e.target.value),
    });
    setError({
      ...error,
      bitcloutamount: false,
      pricePerBitclout: false,
      ethAmount: false,
    });
    setUpdated(true);
    // }
  };
  useEffect(() => {
    if (form && updated) {
      let ethAmount =
        (form.bitcloutamount * form.pricePerBitclout) / (price / 1e8);
      setForm({
        ...form,
        ethAmount: parseFloat(ethAmount.toFixed(4)),
      });
      setUpdated(false);
    }
  }, [updated]);

  useEffect(() => {
    if (isLoggedIn) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios.get(`${env.url}/verifytoken`, config).catch((err) => {
        dispatch(logout() as any);
      });
    }

    priceFeed.methods
      .latestRoundData()
      .call()
      .then((data: any) => {
        setPrice(parseInt(data.answer));
      });
  }, []);

  const handlePost = () => {
    if (valerrorHandler()) {
      setLoading(true);
      console.log({
        name: form.name,
        username: form.username,
        bitcloutid: form.bitcloutid,
        bitcloutamount: form.bitcloutamount,
        ethAmount: form.ethAmount,
        ethAddress: form.ethAddress,
      });
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios
        .post(
          `${env.url}/createListing`,
          {
            name: form.name,
            username: form.username,
            bitcloutamount: form.bitcloutamount,
            ethAmount: form.ethAmount,
          },
          config
        )
        .then((response) => {
          console.log(response);
          setLoading(false);
          setSuccessful(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };



  return (
    <Container style={window.innerWidth <= 768 ? {marginLeft: 0, marginRight:0,paddingLeft: 0, paddingRight:0} : {display: "flex", flexDirection: "row",}}>
      <NavBar />
      {!successful && !loading && (
        <>
        <Col style={window.innerWidth > 768 ? { alignSelf: "center", justifySelf: "center"} : {marginLeft: "8%"}} xs={window.innerWidth <= 768 ? 10 : 10} xl={window.innerWidth >=1600 ? 12: 8}>
          <Row
            style={{ marginTop: "0%"}}
          >
            <Col>
              <h3 style={window.innerWidth <= 768 ? {marginTop: '5%',}: {}}>
                <b>Post Swap for Bitclout to ETH</b>
              </h3>
            </Col>
          </Row>
          <Row
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={form.username}
                error={error.username}
                fullWidth={true}
                // onChange={handleNameChange}
                disabled
              />
            </Col>
          </Row>

          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="bitcloutid"
                label="BitClout ID"
                variant="outlined"
                value={form.bitcloutid}
                error={error.bitcloutid}
                fullWidth={true}

                // onChange={handleNameChange}
                disabled
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="ethAddress"
                label="Your ETH Wallet Address"
                variant="outlined"
                value={form.ethAddress}
                fullWidth={true}

                // onChange={handleNameChange}
                // error={error.ethAddress}
                disabled
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="name"
                label="Unique Listing Name"
                variant="outlined"
                value={form.name}
                error={error.name}
                onChange={handleNameChange}
                fullWidth={true}

              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="bitcloutamount"
                label="Amount of BitClout"
                variant="outlined"
                value={form.bitcloutamount}
                type="number"
                onChange={handleNumChange}
                error={error.bitcloutamount}
                fullWidth={true}

              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="pricePerBitclout"
                label="$USD per $Bitclout"
                variant="outlined"
                value={form.pricePerBitclout}
                type="number"
                onChange={handleNumChange}
                error={error.pricePerBitclout}
                fullWidth={true}

              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="ethAmount"
                label="Amount of ETH to exchange"
                variant="outlined"
                value={form.ethAmount}
                type="number"
                // onChange={handleNumChange}
                error={error.ethAmount}
                fullWidth={true}

              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                onClick={handlePost}
                style={{ height: "100%", width: "50%", backgroundColor: "white", borderColor: "#4263EB", color: "#4263EB", }}
              >
                Post Order
              </Button>
            </Col>
            <Col sm={4} />
          </Row>
          </Col>

        </>

      )}
      {successful && !loading && (
        <>
          <Row>
            <Col>
              <h3>Listing Created!</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  props.history.push("/userlistings");
                  window.location.reload();
                }}
                style={{ height: "100%", width: "50%" }}
              >
                View Listings
              </Button>
            </Col>
          </Row>
        </>
        
      )}
      
    </Container>
  );
};
export default PostAd;
