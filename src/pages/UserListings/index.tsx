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
  Modal,
} from "react-bootstrap";
import env from "../../components/data/env.json";
import UserListing from "../../components/UserListing";
import { ListingSchema } from "../../components/interfaces";

import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import TextField from "@material-ui/core/TextField";
import {
  FiX,
  FiCodesandbox,
  FiActivity,
  FiDollarSign,
  FiBox,
} from "react-icons/fi";
import { getListings, createListing } from "../../services/listings";
import { useUser, useEthPrice, useGasPrice } from "../../components/hooks";

const UserListings = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const { etherPrice, ethIsLoading, ethIsError } = useEthPrice();
  const { gasPrice, gasIsLoading, gasIsError } = useGasPrice();
  const [loading, setLoading] = useState(true);
  const [confirmModal, confirmModalOpen] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);
  const [pageView, setPageView] = useState("swaps");
  const [amountBitclout, setAmountBitclout] = useState("");
  const [amountError, setamountError] = useState(false);
  const [usdPerError, setusdPerError] = useState(false);
  const [usdPerBitclout, setusdPerBitclout] = useState("");

  const [showPostAd, setPostAdPart] = useState(false);
  const [gas, setGas] = useState(0);

  console.log(gasPrice);
  useEffect(() => {
    if (gasPrice && !gasIsError && !gasIsLoading) {
      setGas((gasPrice.average / 1e10) * 21000);
    }
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

  // if (!isLoading) {
  //   console.log("userData", userData);
  // }

  const submitPost = () => {
    if (
      !amountError &&
      !usdPerError &&
      isLoggedIn &&
      !ethIsLoading &&
      !ethIsError
    ) {
      //add loading animation
      setSubmitLoad(true);
      createListing(
        parseFloat(amountBitclout),
        parseFloat(usdPerBitclout) * parseFloat(amountBitclout),
        (parseFloat(amountBitclout) * parseFloat(usdPerBitclout)) /
          etherPrice.USD,
        user.token
      )
        .then((response) => {
          setSubmitLoad(false);
          setPostSuccess(true);
          console.log(response);
        })
        .catch((error) => {
          setPostError(true);
          setSubmitLoad(false);
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
  const BuyRows: Function = (groups: any[]): JSX.Element[] =>
    userData.buys.map((listing: any, i: number) => {
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

  return (
    <>
      <>
        <Modal
          show={confirmModal}
          onHide={false}
          style={{ display: "flex", margin: "auto" }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body style={{ padding: "2em" }}>
            <Col style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2rem", color: "black" }}>Confirm</p>
            </Col>
            {submitLoad && <div className="loader"></div>}
            {!postSuccess && !postError && !submitLoad && (
              <>
                <Col style={{ textAlign: "center", marginTop: "2%" }}>
                  <p style={{ fontSize: "1rem", color: "#ACB5BD" }}>
                    Are you sure you'd like to post?
                  </p>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "#ACB5BD",
                    fontSize: "0.7rem",
                    marginTop: "1.5rem",
                    justifyContent: "center",
                  }}
                >
                  <Col sm={5}>
                    <Row style={{ justifyContent: "center" }}>
                      <FiBox
                        size={"1.5rem"}
                        style={{
                          color: "#212429",
                          marginTop: "0.4rem",
                          marginLeft: "1rem",
                        }}
                      />
                      <p style={{ color: "#212429", fontSize: "1.5rem" }}>
                        {amountBitclout}
                      </p>
                      <p
                        style={{
                          color: "#212429",
                          fontSize: "0.9rem",
                          marginTop: "0.7rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        BCLT
                      </p>
                    </Row>
                  </Col>
                  <Col sm={2}>
                    <p
                      style={{
                        color: "#212429",
                        fontSize: "0.9rem",
                        marginTop: "0.7rem",
                      }}
                    >
                      <b>FOR</b>
                    </p>{" "}
                  </Col>
                  <Col sm={4}>
                    <Row style={{ justifyContent: "center" }}>
                      <FiDollarSign
                        size={"1.5rem"}
                        style={{ color: "#212429", marginTop: "0.4rem" }}
                      />
                      <p style={{ color: "#212429", fontSize: "1.5rem" }}>
                        {(
                          parseFloat(usdPerBitclout) *
                          parseFloat(amountBitclout)
                        ).toFixed(1)}
                      </p>
                      <p
                        style={{
                          color: "#212429",
                          fontSize: "0.9rem",
                          marginTop: "0.7rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        USD
                      </p>
                    </Row>
                  </Col>
                </Col>
                <Col style={{ textAlign: "center", marginTop: "1%" }}>
                  {etherPrice && gas && !gasIsLoading && !gasIsError && (
                    <p>
                      Estimated ETH Gas: ~${(gas * etherPrice.USD).toFixed(2)}
                    </p>
                  )}
                  {gasIsLoading && <p>Fetching gas prices...</p>}
                  {gasIsError && <p>Error while getting gas prices.</p>}
                </Col>
                <Col style={{ textAlign: "center", marginTop: "8%" }}>
                  <Button
                    style={{
                      height: "100%",
                      backgroundColor: "#4263EB",
                      borderColor: "white",
                      color: "white",
                      fontSize: "0.85rem",
                      padding: "2.5%",
                      paddingLeft: "4%",
                      paddingRight: "4%",
                      marginRight: "5%",
                    }}
                    onClick={submitPost}
                  >
                    Confirm
                  </Button>
                  <Button
                    style={{
                      height: "100%",
                      backgroundColor: "white",
                      borderColor: "#4263EB",
                      color: "#4263EB",
                      fontSize: "0.85rem",
                      padding: "2.5%",
                      paddingLeft: "4%",
                      paddingRight: "4%",
                    }}
                    onClick={() => {
                      if (
                        !amountError &&
                        !usdPerError &&
                        isLoggedIn &&
                        !ethIsLoading &&
                        !ethIsError
                      ) {
                        confirmModalOpen(false);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </>
            )}
            {postSuccess && (
              <>
                <Col style={{ textAlign: "center", marginTop: "8%" }}>
                  <p>Swap successfully posted!</p>
                </Col>
                <Col style={{ textAlign: "center", marginTop: "8%" }}>
                  <Button
                    style={{
                      height: "100%",
                      backgroundColor: "white",
                      borderColor: "#4263EB",
                      color: "#4263EB",
                      fontSize: "0.85rem",
                      padding: "2.5%",
                      paddingLeft: "4%",
                      paddingRight: "4%",
                    }}
                    onClick={() => {
                      if (
                        !amountError &&
                        !usdPerError &&
                        isLoggedIn &&
                        !ethIsLoading &&
                        !ethIsError
                      ) {
                        confirmModalOpen(false);
                      }
                    }}
                  >
                    Close
                  </Button>
                </Col>
              </>
            )}
            {postError && (
              <>
                <Col style={{ textAlign: "center", marginTop: "8%" }}>
                  <p>Error creating swap.</p>
                </Col>
                <Col style={{ textAlign: "center", marginTop: "8%" }}>
                  <Button
                    style={{
                      height: "100%",
                      backgroundColor: "white",
                      borderColor: "#4263EB",
                      color: "#4263EB",
                      fontSize: "0.85rem",
                      padding: "2.5%",
                      paddingLeft: "4%",
                      paddingRight: "4%",
                    }}
                    onClick={() => {
                      if (
                        !amountError &&
                        !usdPerError &&
                        isLoggedIn &&
                        !ethIsLoading &&
                        !ethIsError
                      ) {
                        confirmModalOpen(false);
                      }
                    }}
                  >
                    Close
                  </Button>
                </Col>
              </>
            )}
          </Modal.Body>
        </Modal>
      </>
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
                marginRight: 0,
                paddingRight: 0,
                flex: 1,
              }
        }
      >
        <NavBar />
        <Row style={{ marginTop: "8%", width: "1500%" }}>
          <Col>
            {userData?.listings.length === 0 && (
              <h3>
                <b>No Listings</b>
              </h3>
            )}
            {isLoggedIn && userData?.listings.length !== 0 && (
              <>
                <Row>
                  <Col sm={3}>
                    <h3
                      style={
                        window.visualViewport.width <= 768
                          ? { marginLeft: "2rem" }
                          : {}
                      }
                    >
                      <div
                        onClick={() => {
                          setPageView("swaps");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <b
                          style={{
                            color: pageView === "swaps" ? "black" : "grey",
                          }}
                        >
                          My Swaps
                        </b>
                      </div>
                    </h3>
                  </Col>
                  <Col sm={2}>
                    <h3
                      style={
                        window.visualViewport.width <= 768
                          ? { marginLeft: "2rem" }
                          : {}
                      }
                    >
                      <div
                        onClick={() => {
                          setPageView("buys");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <b
                          style={{
                            color: pageView === "buys" ? "black" : "grey",
                          }}
                        >
                          My Buys
                        </b>
                      </div>
                    </h3>
                  </Col>
                </Row>
              </>
            )}
            {isLoggedIn &&
              userData?.listings.length !== 0 &&
              pageView === "swaps" && (
                <>
                  <div className="scrollNoBar" style={{ marginTop: "2em" }}>
                    <Row
                      style={{ marginBottom: "-1.2em", marginLeft: "1.5em" }}
                    >
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
            {isLoggedIn &&
              userData?.listings.length !== 0 &&
              pageView === "buys" && (
                <>
                  <div className="scrollNoBar" style={{ marginTop: "2em" }}>
                    <Row
                      style={{ marginBottom: "-1.2em", marginLeft: "1.5em" }}
                    >
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
                      <BuyRows />
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
              ? (
                  parseFloat(amountBitclout) * parseFloat(usdPerBitclout)
                ).toFixed(2)
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
                ).toFixed(5)
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
            onClick={() => confirmModalOpen(true)}
          >
            Submit
          </Button>
        </Col>
      </Container>
    </>
  );
};

export default UserListings;
