import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { logout } from "../../actions/auth";
import env from "../../components/data/env.json";
import BeatLoader from "react-spinners/BeatLoader";
import { MdCheckCircle } from "react-icons/md";
import StyledContentLoader from "styled-content-loader";
import { ListingSchema } from "../../components/interfaces";
import { RouteComponentProps } from "react-router-dom";

const Buy = ({ match }: RouteComponentProps<{ id: string }>, props: any) => {
  const dispatch = useAppDispatch();
  const [listing, setListing] = useState<ListingSchema>(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { user: currentUser } = useAppSelector((state) => state.auth);

  if (currentUser && Object.keys(currentUser).length === 0) {
    dispatch(logout() as any);
  }

  useEffect(() => {
    if (isLoggedIn) {
      //console.log("currentuser ", currentUser);
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios.get(`${env.url}/verifytoken`, config).catch((err) => {
        dispatch(logout() as any);
      });
      axios
        .get(`${env.url}/listing/${match.params.id}`, config)
        .then((response) => {
          console.log(response.data);
          setListing(response.data);
          setProcessing(response.data.processing);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, []);
  console.log(listing);
  const cancelBuy = () => {
    if (
      listing &&
      isLoggedIn &&
      listing.processing &&
      currentUser.username == listing.buyer.username
    ) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios
        .post(
          `${env.url}/cancelBuy`,
          {
            id: match.params.id,
          },
          config
        )
        .then((response) => {
          setProcessing(false);
          console.log(response);
          // window.location.
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const updateListing = () => {
    if (isLoggedIn && listing.processing) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios
        .get(`${env.url}/listing/${match.params.id}`, config)
        .then((response) => {
          console.log(response);
          setListing(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const buyListing = () => {
    if (
      isLoggedIn &&
      currentUser.bitcloutid !== listing.lister.bitcloutid &&
      listing
    ) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      setLoading(true);
      axios
        .post(
          `${env.url}/buylisting`,
          {
            name: listing.name,
            username: listing.lister.username,
            buyerUsername: currentUser.username,
          },
          config
        )
        .then((response) => {
          console.log(response);
          setLoading(false);
          axios
            .get(`${env.url}/listing/${match.params.id}`, config)
            .then((response) => {
              console.log(response.data);
              setListing(response.data);
              setProcessing(response.data.processing);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setProcessing(false);
        });
    }
  };

  return (
    <StyledContentLoader isLoading={loading}>
      <Container
        className="p-3 align-items-center"
        style={{ textAlign: "center", marginTop: "3%" }}
      >
        {listing && (
          <>
            <Row className="align-items-center">
              <Col>
                {!loading && listing.processing && (
                  <h4>
                    Transaction Ongoing {currentUser.username}/
                    {listing.lister.username}
                  </h4>
                )}
                <div
                  style={
                    !loading
                      ? {
                          backgroundColor: "#f8f9fa",
                          borderRadius: "30px",
                          color: "black",
                          marginBottom: "5%",
                          padding: "3%",
                        }
                      : {}
                  }
                >
                  {!loading && (
                    <>
                      <h2>{listing.name}</h2>
                      <h4>
                        Swap {listing.bitcloutamount} $Bitclout for{" "}
                        {listing.ethAmount} $ETH
                      </h4>
                      <h5>
                        Seller: <i>${listing.lister.username}</i>
                      </h5>
                    </>
                  )}

                  {!processing && !loading && !listing.sold && (
                    <Button onClick={buyListing}>Start Transaction</Button>
                  )}
                  <Row style={{ marginTop: "5%", textAlign: "center" }}>
                    <Col style={{ textAlign: "center" }}>
                      {listing.sold && (
                        <>
                          <div style={{ marginTop: "2%" }}>
                            <h5>
                              <u>Bitclout Transaction ID</u>
                            </h5>
                            <h6>{listing.bitcloutTransactionId}</h6>
                          </div>
                          <div style={{ marginTop: "2%" }}>
                            <h5>
                              <u>Ethereum Transaction ID</u>
                            </h5>
                            <h6>{listing.finalTransactionId}</h6>
                          </div>
                        </>
                      )}
                      {processing &&
                        !loading &&
                        currentUser.username == listing.buyer.username &&
                        !listing.sold && (
                          <>
                            <h5>
                              <b>Buyer Instructions:</b>
                            </h5>
                            <h5>
                              1. Send exactly {listing.ethAmount} $ETH to
                              0xcD2e70559394C01D961Dc339AC54b1efD4Ce9531
                            </h5>

                            {!listing.escrowFull && <BeatLoader size={5} />}
                            {listing.escrowFull && <MdCheckCircle size={20} />}
                            {listing.escrowFull && (
                              <>
                                <Row style={{ textAlign: "center" }}>
                                  <Col style={{ textAlign: "center" }}>
                                    <h5>
                                      2. Wait for {listing.lister.username} to
                                      transfer you $Bitclout
                                    </h5>
                                    {!listing.bitCloutSent && (
                                      <BeatLoader size={5} />
                                    )}
                                    {listing.bitCloutSent && (
                                      <MdCheckCircle size={20} />
                                    )}
                                  </Col>
                                </Row>
                              </>
                            )}
                            {listing.escrowFull && listing.bitCloutSent && (
                              <>
                                <Row style={{ textAlign: "center" }}>
                                  <Col style={{ textAlign: "center" }}>
                                    <h5>
                                      3. Waiting for {listing.lister.username}{" "}
                                      to finalize
                                    </h5>
                                    <div>
                                      {!listing.sold && <BeatLoader size={5} />}
                                      {listing.sold && (
                                        <MdCheckCircle size={20} />
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </>
                            )}

                            <Row style={{ marginTop: "10%" }}>
                              <Col>
                                <Button
                                  style={{ height: "100%", width: "50%" }}
                                  onClick={cancelBuy}
                                >
                                  Cancel
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  style={{ height: "100%", width: "50%" }}
                                  onClick={updateListing}
                                >
                                  Update
                                </Button>
                              </Col>
                            </Row>
                          </>
                        )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                {!loading && (
                  <a href="/">
                    <Button style={{ height: "100%", width: "50%" }}>
                      Back
                    </Button>
                  </a>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>{" "}
    </StyledContentLoader>
  );
};

export default Buy;
