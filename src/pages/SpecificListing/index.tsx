import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { Redirect } from "react-router-dom";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { FiChevronsRight, FiCheck, FiChevronLeft } from "react-icons/fi";
import { RouteComponentProps } from "react-router-dom";
import { ListingSchema } from "../../components/interfaces";
import { getListing } from "../../services/listings";
import LoadingIcons from "react-loading-icons";

const SpecificListing = (
  { match }: RouteComponentProps<{ id: string }>,
  props: any
) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [listing, setListing] = useState<ListingSchema>();
  const [back, setBack] = useState(false);
  console.log(listing);
  useEffect(() => {
    if (isLoggedIn && match.params.id) {
      getListing(user.token, match.params.id)
        .then((response) => {
          console.log(response.data);
          setListing(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn, match.params.id]);

  if (!isLoggedIn) {
    return <Redirect to="/logout" />;
  }
  if (!match.params.id) {
    return <Redirect to="/logout" />;
  }
  if (back) {
    return <Redirect to="/userlistings" />;
  }
  if (listing && isLoggedIn) {
    return (
      <Container
        style={
          window.innerWidth <= 768
            ? {
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 0,
                paddingRight: 0,
              }
            : {
                display: "flex",
                flexDirection: "row",
                marginLeft: "1.3rem",
                marginRight: 0,
              }
        }
      >
        <NavBar />
        <>
          <Col
            style={
              window.innerWidth > 768
                ? { marginTop: "8%" }
                : { marginLeft: "8%" }
            }
            xs={window.innerWidth <= 768 ? 10 : 10}
            xl={window.innerWidth >= 1600 ? 11 : 8}
          >
            <Row>
              <Col>
                <Row>
                  <Col sm={1}>
                    <FiChevronLeft
                      size={"2rem"}
                      color="white"
                      style={{
                        // marginRight: "1.5%",
                        marginTop: "0.5%",
                        textAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: "6494FF",
                        borderRadius: "5px",
                        // marginLeft: "-5%",
                      }}
                      onClick={() => {
                        setBack(true);
                      }}
                    />
                  </Col>
                  <Col>
                    <h3
                      style={
                        window.innerWidth <= 768 ? { marginTop: "5%" } : {}
                      }
                    >
                      <b>Listing Status</b>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h4
                      style={
                        window.innerWidth <= 768
                          ? {
                              marginTop: "2%",
                              color: "#495057",
                              fontSize: "1.1rem",
                            }
                          : {
                              marginTop: "2.5%",
                              color: "#9b9c9d",
                              fontSize: "1.1rem",
                            }
                      }
                    >
                      <b>Listing Number:</b> {listing._id}
                    </h4>
                    <h4
                      style={
                        window.innerWidth <= 768
                          ? {
                              color: "#495057",
                              fontSize: "1.1rem",
                            }
                          : {
                              color: "#9b9c9d",
                              fontSize: "1.1rem",
                            }
                      }
                    >
                      <b>Bitclout Amount: </b>
                      {listing.bitcloutnanos / 1e9}
                    </h4>
                  </Col>
                  <Col>
                    <h4
                      style={
                        window.innerWidth <= 768
                          ? {
                              marginTop: "2%",
                              color: "#495057",
                              fontSize: "1.1rem",
                            }
                          : {
                              marginTop: "2.5%",
                              color: "#9b9c9d",
                              fontSize: "1.1rem",
                            }
                      }
                    >
                      <b>Rate: </b>$
                      {listing.usdamount / (listing.bitcloutnanos / 1e9)}
                      /$BTCLT
                    </h4>
                    <h4
                      style={
                        window.innerWidth <= 768
                          ? {
                              color: "#495057",
                              fontSize: "1.1rem",
                            }
                          : {
                              color: "#9b9c9d",
                              fontSize: "1.1rem",
                            }
                      }
                    >
                      <b>Total Amounts: </b>${listing.usdamount} USD | ~
                      {listing.etheramount.toFixed(6)} $ETH
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "5%" }}>
              <Col sm={1}>
                <div style={{ textAlign: "center" }}>
                  {listing.buyer ? (
                    <FiChevronsRight
                      size={"2rem"}
                      style={{
                        color: "white",
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "6px",
                      }}
                    />
                  ) : (
                    <LoadingIcons.Rings
                      stroke="#FFF"
                      strokeOpacity="5"
                      strokeWidth="1000"
                      style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div
                  className="listingLineDiv"
                  style={{
                    backgroundColor: listing.completed.status
                      ? "#6494ff"
                      : "#C4C4C4",
                  }}
                />
              </Col>
              {listing.buyer ? (
                <>
                  <Col sm={6}>
                    <p
                      style={{
                        color: "#6494FF",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      Transaction Started
                    </p>
                    <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                      Transaction started by: ${listing.buyer.username}
                    </p>
                  </Col>
                </>
              ) : (
                <>
                  <Col sm={6}>
                    <p
                      style={{
                        color: "#6494FF",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      No Buyer Yet
                    </p>
                    <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                      Transaction Uninitiated
                    </p>
                  </Col>
                </>
              )}
            </Row>

            <Row>
              <Col sm={1}>
                <div style={{ textAlign: "center" }}>
                  {listing.escrow.full ? (
                    <FiChevronsRight
                      size={"2rem"}
                      style={{
                        color: "white",
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "6px",
                      }}
                    />
                  ) : (
                    <LoadingIcons.Rings
                      stroke="#FFF"
                      strokeOpacity="5"
                      strokeWidth="1000"
                      style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div
                  className="listingLineDiv"
                  style={{
                    backgroundColor: listing.completed.status
                      ? "#6494ff"
                      : "#C4C4C4",
                  }}
                />
              </Col>
              {listing.ongoing && !listing.escrow.full && (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Escrow Empty
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    Awaiting transfer to escrow wallet
                  </p>
                </Col>
              )}
              {listing.escrow.full && (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Escrow Full
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    ${listing.buyer.username} has transferred{" "}
                    {listing.etheramount.toFixed(8)} $ETH to escrow
                  </p>
                </Col>
              )}
            </Row>
            <Row>
              <Col sm={1}>
                <div style={{ textAlign: "center" }}>
                  {listing.completed.status ? (
                    <FiChevronsRight
                      size={"2rem"}
                      style={{
                        color: "white",
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "6px",
                      }}
                    />
                  ) : (
                    <LoadingIcons.Rings
                      stroke="#FFF"
                      strokeOpacity="5"
                      strokeWidth="1000"
                      style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div
                  className="listingLineDivEnd"
                  style={{
                    backgroundColor: listing.completed.status
                      ? "#6494ff"
                      : "#C4C4C4",
                  }}
                />
              </Col>
              {listing.completed.status ? (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Fulfillment Complete
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    {(listing.bitcloutnanos / 1e9).toFixed(3)} $BTCLT has been
                    sent to {listing.buyer.username}
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    {listing.etheramount.toFixed(8)} $ETH has been sent to your
                    Ethereum Wallet{" "}
                    <i>
                      <u>{user.ethereumaddress}</u>
                    </i>
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    <b>Ethereum Txn ID:</b> <br></br>
                    {listing.finalTransactionId}
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    <b>Bitclout Txn ID:</b> <br></br>
                    {listing.bitcloutTransactionId}
                  </p>
                </Col>
              ) : (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Fulfillment In Progress
                  </p>
                  {!listing.ongoing && listing.escrow.full ? (
                    <>
                      <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                        {listing.bitcloutsent
                          ? `Bitclout sent to ${listing.buyer.username}`
                          : `Waiting to send bitclout to ${listing.buyer.username}`}
                      </p>
                      <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                        {listing.escrowsent
                          ? `Ethereum sent to your wallet`
                          : `Waiting to send Ethereum to your wallet`}
                      </p>
                    </>
                  ) : (
                    <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                      Listing will be automatically fulfilled once a buyer sends
                      money to escrow
                    </p>
                  )}
                </Col>
              )}
            </Row>
            <Row>
              <Col sm={1}>
                <div style={{ textAlign: "center" }}>
                  {listing.completed.status ? (
                    <FiChevronsRight
                      size={"2rem"}
                      style={{
                        color: "white",
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "6px",
                      }}
                    />
                  ) : (
                    <LoadingIcons.Rings
                      stroke="#FFF"
                      strokeOpacity="5"
                      strokeWidth="1000"
                      style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
              </Col>
              {listing.completed.status ? (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Transaction Finished
                  </p>
                </Col>
              ) : (
                <Col sm={8}>
                  <p
                    style={{
                      color: "#6494FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Transaction Open
                  </p>
                </Col>
              )}
            </Row>
          </Col>
        </>
      </Container>
    );
  } else {
    return null;
  }
};
export default SpecificListing;
export {};
