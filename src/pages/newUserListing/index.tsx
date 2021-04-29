import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { ListingSchema } from "../../components/interfaces";
import { FiDollarSign, FiBox } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import { getListings, createListing } from "../../services/listings";
import { loggedInState, userState } from "store";
import { useRecoilValue, useRecoilState } from "recoil";
import { MainContent, Wrapper, FeedContent } from "./styles";
import { useUser, useEthPrice, useGasPrice } from "components/hooks";
import UserListing from "../../components/UserListing";
const NewListing = (props: any) => {
  const user = useRecoilValue(userState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const [amountUpdated, setAmountUpdated] = useState(false);
  const [usdUpdated, setUsdUpdated] = useState(false);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [volumeSort, setVolumeSort] = useState("desc");
  const [amountBitclout, setAmountBitclout] = useState("");
  const [amountError, setamountError] = useState(false);
  const [usdPerError, setusdPerError] = useState(false);
  const [usdPerBitclout, setusdPerBitclout] = useState("");
  const { etherPrice, ethIsLoading, ethIsError } = useEthPrice();
  const [confirmModal, confirmModalOpen] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [gas, setGas] = useState(0);
  const { gasPrice, gasIsLoading, gasIsError } = useGasPrice();
  const [pageView, setPageView] = useState("swaps");
  const [tableData, setTable] = useState([]);

  useEffect(() => {
    if (gasPrice) {
      // console.log(gasPrice);
      setGas((gasPrice.average / 1e10) * 21000);
    }
  }, [gasIsLoading]);
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
          // console.log(response);
        })
        .catch((error) => {
          setPostError(true);
          setSubmitLoad(false);
        });
    }
  };

  const [dateSort, setDateSort] = useState("desc");
  useEffect(() => {
    setTable(userData?.listings);
  }, [userData]);

  const handleBitcloutChange = (e) => {
    setusdPerBitclout(e.target.value);
    setUsdUpdated(true);
  };

  const handleAmountChange = (e) => {
    setAmountBitclout(e.target.value);
    setAmountUpdated(true);
  };

  useEffect(() => {
    let pass = true;
    if (amountUpdated) {
      if (parseFloat(amountBitclout) > userData?.bitswapbalance) {
        pass = false;
        setamountError(true);
        setFormError("You need more balance to post this swap.");
      } else if (parseFloat(amountBitclout) < 0.5) {
        pass = false;
        setFormError("You can't sell less then 0.5 bitclout.");
        setamountError(true);
      } else if (isNaN(parseFloat(amountBitclout))) {
        pass = false;
        setamountError(true);
        setFormError("Amount must be a valid number");
      } else {
        setamountError(false);
      }
    }
    if (usdUpdated) {
      console.log(parseFloat(usdPerBitclout) <= 0);
      if (parseFloat(usdPerBitclout) <= 0) {
        pass = false;
        setFormError("You need to sell for a non-zero, non-negative amount.");
        setusdPerError(true);
      } else if (parseFloat(usdPerBitclout) >= 500) {
        pass = false;
        setFormError("Woah. That price looks way too high.");
        setusdPerError(true);
      } else {
        setusdPerError(false);
      }
    }
    if (pass) {
      setFormError(null);
    }
  }, [amountBitclout, usdPerBitclout]);

  if (user && !isLoggedIn) {
    window.location.assign("/login");
  }

  // const closeModal = () => {
  //   setOpenModal(false);
  // };

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
                  <p style={{ fontSize: "0.8rem", color: "#8d9296" }}>
                    Are you sure you'd like to post?
                    <br />
                    <br />
                    The Bitclout amount will be deducted from your wallet.
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
                    <>
                      <p style={{ marginBottom: "0px" }}>
                        Estimated ETH Gas: ~${(gas * etherPrice.USD).toFixed(2)}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "#8d9296" }}>
                        This will be deducted from the $ETH you recieve.
                      </p>
                    </>
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
      <Wrapper>
        <NavBar />
        <Col
          sm={12}
          md={8}
          lg={8}
          xl={window.visualViewport.width > 1600 ? 11 : 8}
        >
          <MainContent>
            <Row>
              <h3
                style={
                  window.visualViewport.width <= 768
                    ? { marginLeft: "1rem", fontSize: "1.5rem" }
                    : { marginLeft: "1rem" }
                }
              >
                <b
                  className="hoverCursor"
                  onClick={() => {
                    setPageView("swaps");
                    setTable(null);
                    setTable(userData.listings);
                  }}
                  style={{ color: pageView === "swaps" ? "black" : "grey" }}
                >
                  My Swaps
                </b>
              </h3>
              <h3
                style={
                  window.visualViewport.width <= 768
                    ? { marginLeft: "3rem", fontSize: "1.5rem" }
                    : { marginLeft: "3rem" }
                }
              >
                <b
                  className="hoverCursor"
                  onClick={() => {
                    setPageView("buys");
                    setTable(null);
                    setTable(userData.buys);
                  }}
                  style={{ color: pageView === "buys" ? "black" : "grey" }}
                >
                  My Buys
                </b>
              </h3>
            </Row>

            <FeedContent>
              <Col>
                <div
                  className="scrollNoBar"
                  style={
                    window.visualViewport.width > 768
                      ? {
                          background: "transparent",
                          maxHeight: "77vh",
                          overflowX: "hidden",
                        }
                      : { background: "transparent", maxHeight: "65vh" }
                  }
                >
                  <Row
                    style={{ marginBottom: "-1.2em", marginLeft: "1.3em" }}
                  ></Row>
                  <hr style={{ marginBottom: "5%" }}></hr>

                  {!isLoading &&
                    tableData
                      ?.slice(0)
                      .reverse()
                      .map((listing: any, i: number) => {
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
                      })}
                </div>
              </Col>
            </FeedContent>
          </MainContent>
        </Col>
        <Col>
          <Row>
            <div
              style={
                window.visualViewport.width > 768
                  ? {
                      borderRight: "1px solid #DDE2E5",
                      height: "100vh",
                      paddingRight: 0,
                      width: "2rem",
                    }
                  : {
                      display: "none",
                    }
              }
            />
          </Row>
        </Col>
        {isLoggedIn ? (
          <Col sm={3} style={{ marginTop: "6%" }}>
            {userData?.verified === "verified" && (
              <>
                <Row>
                  <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                    Post Swap
                  </h5>
                </Row>
                <Row style={{ marginLeft: "6%", marginTop: "5%" }}>
                  {formError && (
                    <>
                      <p style={{ fontSize: "0.8rem", color: "#F03D3E" }}>
                        {formError}
                      </p>
                    </>
                  )}
                </Row>

                <Row style={{ marginLeft: "6%", marginTop: "5%" }}>
                  <TextField
                    id="username"
                    label="Amount of Bitclout"
                    variant="outlined"
                    onChange={handleAmountChange}
                    value={amountBitclout}
                    type="number"
                    size={"medium"}
                    error={amountError}
                    inputProps={{
                      min: 0.5,
                      style: {
                        fontSize: "2vh",
                        height: "2vh",
                        fontStyle: "Roboto Mono",
                        width: "30vh",
                      },
                    }}
                  />
                </Row>
                <Row style={{ marginLeft: "6%", marginTop: "5%" }}>
                  <TextField
                    id="username"
                    label="$USD per Bitclout"
                    variant="outlined"
                    onChange={handleBitcloutChange}
                    value={usdPerBitclout}
                    error={usdPerError}
                    size={"medium"}
                    type="number"
                    inputProps={{
                      min: 0,
                      style: {
                        fontSize: "2vh",
                        height: "2vh",
                        fontStyle: "Roboto Mono",
                        width: "30vh",
                      },
                    }}
                  />
                </Row>

                <Row style={{ marginTop: "8%", marginLeft: "6%" }}>
                  <h5 style={{ fontSize: "1rem" }}>
                    Total $USD:{" "}
                    {parseFloat(amountBitclout) > 0 &&
                    parseFloat(usdPerBitclout) > 0
                      ? (
                          parseFloat(amountBitclout) *
                          parseFloat(usdPerBitclout)
                        ).toFixed(2)
                      : `0`}
                  </h5>
                </Row>

                <Row style={{ marginTop: "6%", marginLeft: "6%" }}>
                  <h5 style={{ fontSize: "1rem" }}>
                    Total $ETH: ~
                    {parseFloat(amountBitclout) > 0 &&
                    !ethIsLoading &&
                    !ethIsError &&
                    parseFloat(usdPerBitclout) > 0
                      ? (
                          (parseFloat(amountBitclout) *
                            parseFloat(usdPerBitclout)) /
                          etherPrice.USD
                        ).toFixed(5)
                      : `0`}
                  </h5>
                </Row>

                <Row style={{ marginLeft: "6%", marginTop: "6%" }}>
                  <Button
                    style={{
                      width: "10em",
                      height: "2.5rem",
                      backgroundColor: "#4263EB",
                    }}
                    disabled={
                      usdPerError ||
                      amountError ||
                      amountBitclout.length === 0 ||
                      usdPerBitclout.length === 0
                    }
                    onClick={() => confirmModalOpen(true)}
                  >
                    Submit
                  </Button>
                </Row>
              </>
            )}
          </Col>
        ) : null}
      </Wrapper>
    </>
  );
};

export default NewListing;
