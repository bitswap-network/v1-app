import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { logout } from "../../actions/auth";
import env from "../../components/data/env.json";
import BeatLoader from "react-spinners/BeatLoader";
import BounceLoader from "react-spinners/BounceLoader";
import { MdCheckCircle } from "react-icons/md";
import TextField from "@material-ui/core/TextField";
import { RouteComponentProps } from "react-router-dom";
import { ListingSchema } from "../../components/interfaces";

const Manage = ({ match }: RouteComponentProps<{ id: string }>, props: any) => {
  const dispatch = useAppDispatch();
  const [listing, setListing] = useState<ListingSchema>(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [finalizeLoading, setFinalizeLoading] = useState(false);

  if (currentUser && Object.keys(currentUser).length === 0) {
    dispatch(logout() as any);
  }
  const handleIdChange = (e: any) => {
    setTransactionId(e.target.value);
    setError(false);
  };
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
  const cancelBuy = () => {
    if (
      isLoggedIn &&
      listing.processing &&
      currentUser.username == listing.lister.username
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
          props.history.push("/userlistings");
          window.location.reload();
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
  const verifyListing = () => {
    if (isLoggedIn && listing.processing) {
      setVerifyLoading(true);
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios
        .post(
          `${env.url}/verifybitclout`,
          {
            username: currentUser.username,
            name: listing.name,
            transaction_id: transactionId,
          },
          config
        )
        .then((response) => {
          setVerifyLoading(false);
          console.log(response);
          window.location.reload();
          axios
            .get(`${env.url}/listing/${match.params.id}`, config)
            .then((response) => {
              console.log(response);
              setListing(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setVerifyLoading(false);
          console.log(error);
          axios
            .get(`${env.url}/listing/${match.params.id}`, config)
            .then((response) => {
              console.log(response);
              setListing(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
    }
  };
  const finalizeBuy = () => {
    setFinalizeLoading(true);
    let config = {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    };
    axios
      .post(
        `${env.url}/listingSold`,
        {
          name: listing.name,
          username: listing.lister.username,
        },
        config
      )
      .then((response) => {
        setFinalizeLoading(false);
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        setFinalizeLoading(false);
        console.log(error);
      });
  };
  return (
    <Container className="p-3" style={{ textAlign: "center", marginTop: "3%" }}>
      {listing && (
        <>
          <Row className="align-items-center">
            <Col>
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "30px",
                  color: "black",
                  marginBottom: "5%",
                  padding: "3%",
                }}
              >
                {listing.sold ? (
                  <h2>Transaction Finished: {listing.name}</h2>
                ) : (
                  <h2>Manage Listing: {listing.name}</h2>
                )}

                <Row style={{ marginTop: "5%" }}>
                  <Col>
                    <h4>
                      Swap {listing.bitcloutamount} $Bitclout for{" "}
                      {listing.ethAmount} $ETH
                    </h4>
                    <h5>
                      Seller: <i>${currentUser.username}</i>
                    </h5>
                    {listing.sold && (
                      <>
                        <h5>
                          Buyer: <i>${listing.buyer.username}</i>
                        </h5>
                        <div style={{ marginTop: "5%" }}>
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
                    {loading && <div className="loader"></div>}

                    {processing && !loading && (
                      <>
                        <Row style={{ marginTop: "5%", textAlign: "center" }}>
                          <Col style={{ textAlign: "center" }}>
                            <h5>
                              <b>Seller Instructions:</b>
                            </h5>
                            <h5>
                              1. Wait for ${listing.buyer.username} to transfer
                              $ETH to escrow
                            </h5>

                            {!listing.escrowFull && <BeatLoader size={5} />}
                            {listing.escrowFull && <MdCheckCircle size={20} />}
                            {listing.escrowFull && (
                              <Row style={{ textAlign: "center" }}>
                                <Col style={{ textAlign: "center" }}>
                                  <>
                                    <h5>
                                      2. Transfer {listing.bitcloutamount}{" "}
                                      $Bitclout to {listing.buyer.bitcloutid}
                                    </h5>
                                    {!listing.bitCloutSent && (
                                      <>
                                        <BeatLoader size={5} />
                                        <Row style={{ marginTop: "1%" }}>
                                          <Col style={{ textAlign: "center" }}>
                                            <h6>Verify Transaction ID:</h6>
                                            <Button
                                              size="sm"
                                              onClick={() => {
                                                window.open(
                                                  `http://explorer.bitclout.com/?query-node=https:%2F%2Fapi.bitclout.com&public-key=${currentUser.bitcloutid}`,
                                                  "_blank"
                                                );
                                              }}
                                            >
                                              View on Explorer
                                            </Button>
                                          </Col>
                                          <Col style={{ textAlign: "left" }}>
                                            <TextField
                                              id="transactionid"
                                              label="Transaction Id"
                                              variant="outlined"
                                              value={transactionId}
                                              onChange={handleIdChange}
                                              error={error}
                                            />
                                          </Col>
                                        </Row>
                                      </>
                                    )}
                                    {listing.bitCloutSent && (
                                      <MdCheckCircle size={20} />
                                    )}
                                  </>
                                </Col>
                              </Row>
                            )}
                            {listing.escrowFull && listing.bitCloutSent && (
                              <>
                                <Row style={{ textAlign: "center" }}>
                                  <Col style={{ textAlign: "center" }}>
                                    <h5>3. Waiting for finalization...</h5>

                                    <div>
                                      {!listing.sold && <BeatLoader size={5} />}
                                      {listing.sold && (
                                        <MdCheckCircle size={20} />
                                      )}
                                    </div>
                                    <Button onClick={finalizeBuy}>
                                      Finalize
                                    </Button>
                                    <BounceLoader
                                      loading={finalizeLoading}
                                      size={30}
                                    />
                                  </Col>
                                </Row>
                              </>
                            )}
                          </Col>
                        </Row>

                        <Row
                          style={{ marginTop: "10%" }}
                          className="align-items-center"
                        >
                          <Col>
                            <Button
                              style={{ height: "100%", width: "50%" }}
                              onClick={cancelBuy}
                            >
                              Cancel
                            </Button>
                          </Col>
                          <Col>
                            {listing.escrowFull && !listing.bitCloutSent ? (
                              <>
                                <Button
                                  style={{
                                    height: "100%",
                                    width: "50%",
                                  }}
                                  onClick={verifyListing}
                                >
                                  Verify
                                </Button>
                              </>
                            ) : (
                              <Button
                                style={{ height: "100%", width: "50%" }}
                                onClick={updateListing}
                              >
                                Update
                              </Button>
                            )}

                            <BounceLoader loading={verifyLoading} size={30} />
                          </Col>
                        </Row>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
      <Row className="align-items-center">
        <Col>
          <a href="/userlistings">
            <Button style={{ height: "100%", width: "50%" }}>Back</Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Manage;
