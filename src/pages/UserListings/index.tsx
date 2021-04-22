import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import env from "../../components/data/env.json";
import UserListing from "../../components/UserListing";
import { ListingSchema } from "../../components/interfaces";
import { myListings } from "../../services/listings";
import { FiBookmark } from "react-icons/fi";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import TextField from "@material-ui/core/TextField";
import { FiX } from "react-icons/fi";
import { getListings, createListing } from "../../services/listings";
import { useUser, useEthPrice, useGasPrice } from "../../components/hooks";

const UserListings = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const { etherPrice, ethIsLoading, ethIsError } = useEthPrice();
  const { gasPrice, gasIsLoading, gasIsError } = useGasPrice();
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [buylistings, setBuyListings] = useState<ListingSchema[]>([]);
  const [amountBitclout, setAmountBitclout] = useState("");
  const [amountError, setamountError] = useState(false);
  const [usdPerError, setusdPerError] = useState(false);
  const [usdPerBitclout, setusdPerBitclout] = useState("");
  const [bitcloutprice, setBitcloutprice] = useState(0);

  const [showPostAd, setPostAdPart] = useState(false);
  const [gas, setGas] = useState(0);

  console.log(etherPrice);
  useEffect(() => {
    // console.log(user);
    // myListings(user.token)
    //   .then((resp) => {
    //     setListings(resp.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // getBTCLT()
    //   .then((price) => {
    //     console.log(price);
    //     setBitcloutprice(price);
    //     setusdPerBitclout(price.toFixed(2));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // useEthPrice().then((response) => {
    //   setetherPrice(parseFloat(response.data.USD));
    // });
  }, []);
  const handleBitcloutChange = (e) => {
    setusdPerBitclout(e.target.value);
    if (parseFloat(e.target.value) <= 0) {
      setusdPerError(true);
    }
  };
  const handleAmountChange = (e) => {
    setAmountBitclout(e.target.value);
    setamountError(false);
    if (isLoggedIn) {
      if (parseFloat(e.target.value) > user.bitswapbalance) {
        setamountError(true);
      }
      if (parseFloat(amountBitclout) <= 0) {
        setamountError(true);
      }
    }
  };

  if (!isLoading) {
    console.log("userData", userData);
  }

  const submitPost = () => {
    if (
      !amountError &&
      !usdPerError &&
      isLoggedIn &&
      !ethIsLoading &&
      !ethIsError
    ) {
      //add loading animation
      createListing(
        parseFloat(amountBitclout),
        parseFloat(usdPerBitclout),
        (parseFloat(amountBitclout) * parseFloat(usdPerBitclout)) /
          etherPrice.USD,
        user.token
      ).then((response) => {
        console.log(response);
      });
    }
  };
  const Rows: Function = (groups: any[]): JSX.Element[] =>
    userData.listings.map((listing: any, i: number) => {
      return (
        <>
          <UserListing
            listing={listing}
            index={i}
            history={props.history}
            loading={loading}
            buy={true}
          />
        </>
      );
    });
  // const BuyRows: Function = (groups: any[]): JSX.Element[] =>
  //   buylistings.map((buylistings: any, i: number) => {
  //     return (
  //       <>
  //         {buylistings && (
  //           <UserListing
  //             listing={buylistings}
  //             index={i}
  //             history={props.history}
  //             loading={loading}
  //             buy={true}
  //           />
  //         )}
  //       </>
  //     );
  //   });

  return (
    <Container
      style={
        window.visualViewport.width <= 768
          ? {
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
              display: "flex",
              flexDirection: "column",
            }
          : {
              display: "flex",
              flexDirection: "row",
              marginLeft: "1.3rem",
            }
      }
    >
      <NavBar />
      <Row style={{ width: "70em", marginTop: "8%", marginLeft: "-5rem" }}>
        <Col>
          {userData?.listings.length === 0 && (
            <h3>
              <b>No Listings</b>
            </h3>
          )}
          {isLoggedIn && (
            <>
              <h3
                style={
                  window.visualViewport.width <= 768
                    ? { marginLeft: "2rem" }
                    : {}
                }
              >
                <b>My Swaps</b>
              </h3>

              <div className="scrollNoBar" style={{ marginTop: "2em" }}>
                <Row style={{ marginBottom: "-1.2em", marginLeft: "1.5em" }}>
                  <p
                    style={
                      window.visualViewport.width <= 768
                        ? {
                            color: "#C4C4C4",
                            fontSize: "0.8em",
                            marginRight: "4.5em",
                          }
                        : {
                            color: "#C4C4C4",
                            marginRight: "10em",
                            fontSize: "0.8em",
                          }
                    }
                  >
                    Transactor Name
                  </p>
                  <p
                    style={
                      window.visualViewport.width <= 768
                        ? { color: "#C4C4C4", fontSize: "0.8em" }
                        : {
                            color: "#C4C4C4",
                            marginRight: "14em",
                            fontSize: "0.8em",
                          }
                    }
                  >
                    Offer
                  </p>
                  <p
                    style={
                      window.visualViewport.width <= 768
                        ? { display: "none" }
                        : { color: "#C4C4C4", fontSize: "0.8em" }
                    }
                  >
                    Posted Time
                  </p>
                  <p
                    style={
                      window.visualViewport.width <= 768
                        ? { color: "#C4C4C4", fontSize: "0.8em" }
                        : {
                            color: "#C4C4C4",
                            marginLeft: "12em",
                            fontSize: "0.8em",
                          }
                    }
                  >
                    Status
                  </p>
                </Row>
                {!isLoading && !isError && userData.listings.length > 0 && (
                  <Rows />
                )}
              </div>
            </>
          )}
        </Col>
      </Row>

      {/* <Row className="align-items-center">
        <Col>
          {isLoggedIn && listings.length === 0 && (
            <Button
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "white",
                borderColor: "#4263EB",
                color: "#4263EB",
                marginTop: "2em",
              }}
              onClick={() => {
                window.location.assign("/postad");
              }}
            >
              Post a New Listing
            </Button>
          )}
        </Col>
      </Row> */}
      <div
        style={{
          borderLeft: "1px solid #DDE2E5",
          height: "100vh",
          width: "1rem",
        }}
      />

      <Col
        style={{
          marginLeft: "5%",
          marginTop: "5%",
        }}
        sm={3}
      >
        {/* <FiX
          size={30}
          color={"gray"}
          style={{ marginLeft: "100%" }}
          onClick={() => {
            setPostAdPart(false);
          }}
        /> */}

        <p style={{ fontSize: "2.5vh" }}>
          <b>Post Swap</b>
        </p>

        <TextField
          id="username"
          label="Amount of Bitclout"
          variant="outlined"
          fullWidth={true}
          onChange={handleAmountChange}
          value={amountBitclout}
          size={"medium"}
          error={amountError}
          style={{ marginTop: "15%" }}
          inputProps={{
            style: { fontSize: "2vh", height: "2vh", fontStyle: "lato" },
          }}
        />
        <TextField
          id="username"
          label="$USD per Bitclout"
          variant="outlined"
          fullWidth={true}
          onChange={handleBitcloutChange}
          value={usdPerBitclout}
          error={usdPerError}
          size={"medium"}
          style={{ marginTop: "15%" }}
          inputProps={{
            style: { fontSize: "2vh", height: "2vh", fontStyle: "lato" },
          }}
        />

        <h5 style={{ marginTop: "10%", fontSize: "1rem" }}>
          Total $USD:{" "}
          {parseFloat(amountBitclout) > 0 && parseFloat(usdPerBitclout) > 0
            ? (parseFloat(amountBitclout) * parseFloat(usdPerBitclout)).toFixed(
                2
              )
            : `0`}
        </h5>
        <h5 style={{ marginTop: "7.5%", fontSize: "1rem" }}>
          Total $ETH: ~
          {parseFloat(amountBitclout) > 0 &&
          !ethIsLoading &&
          !ethIsError &&
          parseFloat(usdPerBitclout) > 0
            ? (
                (parseFloat(amountBitclout) * parseFloat(usdPerBitclout)) /
                etherPrice.USD
              ).toFixed(2)
            : `0`}
        </h5>
        <Button
          style={{
            width: "10em",
            height: "2.5rem",
            backgroundColor: "#4263EB",
            marginTop: "12%",
          }}
          disabled={usdPerError || amountError}
          onClick={submitPost}
        >
          Submit
        </Button>
      </Col>
    </Container>
  );
};

export default UserListings;
