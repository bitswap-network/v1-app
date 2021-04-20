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
                  <FiChevronLeft
                    size={"1.5rem"}
                    color="#cccee2"
                    style={{
                      marginRight: "1.5%",
                      marginTop: "0.5%",
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    onClick={() => {
                      setBack(true);
                    }}
                  />
                  <h3
                    style={window.innerWidth <= 768 ? { marginTop: "5%" } : {}}
                  >
                    <b>Listing Status</b>
                  </h3>
                </Row>
                <h4
                  style={
                    window.innerWidth <= 768
                      ? {
                          marginTop: "2%",
                          color: "#495057",
                          fontSize: "1.35rem",
                        }
                      : {
                          marginTop: "2.5%",
                          color: "#9b9c9d",
                          fontSize: "1.35rem",
                        }
                  }
                >
                  Listing Number: {listing._id}
                </h4>
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
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div className="listingLineDiv" />
              </Col>
              {listing.buyer ? (
                <>
                  <Col sm={6}>
                    <p
                      style={{
                        color: "#4263EB",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      Buyer started transaction
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
                        color: "#4263EB",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      No Buyer Yet
                    </p>
                    <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                      Waiting for a buyer to start transaction
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
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div className="listingLineDiv" />
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
                    Escrow Wallet Empty
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
                        backgroundColor: "#6494FF",
                        borderRadius: 50 / 2,
                        padding: "1px",
                        width: "2em",
                        height: "2rem",
                      }}
                    />
                  )}
                </div>
                <div className="listingLineDivEnd" />
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
                    Fulfillment complete!
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
                    Escrow Full
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                    ${listing.buyer.username} has transferred $ETH to escrow
                  </p>
                </Col>
              )}
            </Row>
          </Col>

          <Col>
            <Row>
              <div
                style={{
                  borderRight: "1px solid #DDE2E5",
                  height: "1vh",
                  marginRight: 0,
                  paddingRight: 0,
                  width: "2rem",
                }}
              />
            </Row>
          </Col>

          <Col sm={4} style={{ marginTop: "6%" }}>
            <Row>
              <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                Seller Found
              </h5>
            </Row>
            <Row>
              <p
                style={{
                  color: "#ACB5BD",
                  fontSize: "0.75rem",
                  marginTop: "12%",
                  marginLeft: "10%",
                }}
              >
                Amount (BCL)
              </p>
            </Row>

            {/* One Transaction */}
            <div className="scrollNoBar">
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>
              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>40</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>40</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>4000</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>400000</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>400</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>120</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>420</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>

              <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>69</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                    Details →
                  </p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>
            </div>
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
