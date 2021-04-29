import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { FiChevronsRight, FiChevronLeft } from "react-icons/fi";
import { RouteComponentProps } from "react-router-dom";
import { ListingSchema } from "../../components/interfaces";
import {
  getListing,
  cancelListing,
  deleteListing,
} from "../../services/listings";
import LoadingIcons from "react-loading-icons";
import config from "../../helpers/config.json";

const SpecificListing = (
  { match }: RouteComponentProps<{ id: string }>,
  props: any
) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [listing, setListing] = useState<ListingSchema>(null);
  const [back, setBack] = useState(false);
  const cancelBuy = () => {
    if (listing.ongoing && !listing.escrow.full) {
      cancelListing(user.token, listing._id)
        .then((response) => {
          window.location.replace(`/userlistings`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const submitDelete = () => {
    if (!listing.ongoing && !listing.completed.status && !listing.escrow.full) {
      deleteListing(user.token, listing._id)
        .then((response) => {
          window.location.replace(`/userlistings`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(listing, user);
  useEffect(() => {
    if (isLoggedIn && match.params.id) {
      console.log("setting listing");
      getListing(user.token, match.params.id)
        .then((response) => {
          console.log(response.data);
          setListing(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  if (!isLoggedIn) {
    window.location.assign("/login");
  }
  if (!match.params.id) {
    window.location.assign("/userlistings");
  }

  return (
    <>
      {listing && (
        <>
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
                    marginLeft: "0.3rem",
                    marginRight: 0,
                  }
            }
          >
            <NavBar />
            <>
              <Col
                style={
                  window.innerWidth > 768
                    ? { marginTop: "5%" }
                    : { marginLeft: "2%", marginTop: "3%" }
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
                            // setBack(true);
                            window.history.back();
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
                          /$BCLT
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
                  <Col
                    sm={1}
                    style={window.innerWidth <= 768 ? { display: "none" } : {}}
                  >
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
                        backgroundColor: listing.buyer ? "#6494ff" : "#C4C4C4",
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
                        {listing.seller.username === user.username && (
                          <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            Transaction started by:{" "}
                            <b>
                              <a
                                href={`https://bitclout.com/u/${listing.buyer.username}`}
                                target={"_blank"}
                              >
                                @{listing.buyer.username}
                              </a>
                            </b>
                          </p>
                        )}
                        {listing.buyer.username === user.username && (
                          <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            Transaction started with:{" "}
                            <a
                              href={`https://bitclout.com/u/${listing.seller.username}`}
                              target={"_blank"}
                            >
                              @{listing.seller.username}
                            </a>
                          </p>
                        )}
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
                  <Col
                    sm={1}
                    style={window.innerWidth <= 768 ? { display: "none" } : {}}
                  >
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
                  {listing.seller && user && (
                    <>
                      {listing.ongoing &&
                        !listing.escrow.full &&
                        listing.buyer.username === user.username && (
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
                            <p
                              style={{ color: "#6494FF", fontSize: "0.85rem" }}
                            >
                              Transfer {listing.etheramount.toFixed(8)} $ETH to{" "}
                              {config.eth_address}
                            </p>
                          </Col>
                        )}
                      {listing.ongoing &&
                        !listing.escrow.full &&
                        listing.seller.username === user.username && (
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
                            <p
                              style={{ color: "#6494FF", fontSize: "0.85rem" }}
                            >
                              Awaiting transfer to escrow wallet
                            </p>
                          </Col>
                        )}

                      {listing.escrow.full &&
                        listing.seller.username === user.username && (
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
                            <p
                              style={{ color: "#6494FF", fontSize: "0.85rem" }}
                            >
                              <b>
                                <a
                                  href={`https://bitclout.com/u/${listing.buyer.username}`}
                                  target={"_blank"}
                                >
                                  @{listing.buyer.username}
                                </a>
                              </b>{" "}
                              has transferred {listing.etheramount.toFixed(8)}{" "}
                              $ETH to escrow
                            </p>
                          </Col>
                        )}
                      {listing.escrow.full &&
                        listing.buyer.username === user.username && (
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
                            <p
                              style={{ color: "#6494FF", fontSize: "0.85rem" }}
                            >
                              Escrow has recieved your transfer of{" "}
                              {listing.etheramount.toFixed(8)} $ETH
                            </p>
                          </Col>
                        )}
                    </>
                  )}
                </Row>
                <Row>
                  <Col
                    sm={1}
                    style={window.innerWidth <= 768 ? { display: "none" } : {}}
                  >
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
                        // height: "7rem",
                      }}
                    />
                  </Col>
                  {listing.completed.status ? (
                    <Col
                      sm={8}
                      style={
                        window.innerWidth <= 768 ? { marginTop: "1rem" } : {}
                      }
                    >
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
                        {(listing.bitcloutnanos / 1e9).toFixed(3)} $BCLT has
                        added to{" "}
                        <b>
                          <a
                            href={`https://bitclout.com/u/${listing.buyer.username}`}
                            target={"_blank"}
                          >
                            @{listing.buyer.username}'s
                          </a>
                        </b>{" "}
                        wallet
                      </p>
                      {listing.seller.username === user.username ? (
                        <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                          {listing.etheramount.toFixed(8)} $ETH has been sent to
                          your Ethereum Wallet{" "}
                          <i>
                            <u>{user.ethereumaddress}</u>
                          </i>
                        </p>
                      ) : (
                        <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                          {listing.etheramount.toFixed(8)} $ETH has been sent to
                          <b>
                            <a
                              href={`https://bitclout.com/u/${listing.seller.username}`}
                              target={"_blank"}
                            >
                              @{listing.seller.username}
                            </a>
                          </b>
                        </p>
                      )}

                      <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                        <b>Ethereum Txn ID:</b> <br></br>
                        <a
                          href={`https://etherscan.io/tx/${listing.finalTransactionId}`}
                          target={"_blank"}
                        >
                          {listing.finalTransactionId}
                        </a>
                      </p>
                    </Col>
                  ) : (
                    <Col
                      sm={8}
                      style={
                        window.innerWidth <= 768 ? { marginTop: "1rem" } : {}
                      }
                    >
                      <p
                        style={{
                          color: "#6494FF",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      >
                        Fulfillment Pending
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
                              ? `Ethereum sent to ${listing.seller.username}'s wallet`
                              : `Waiting to send Ethereum to ${listing.seller.username}'s wallet`}
                          </p>
                          <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            <b>Ethereum Txn ID:</b> <br></br>
                            {listing.finalTransactionId}
                          </p>
                          {/* <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            <b>Bitclout Txn ID:</b> <br></br>
                            {listing.bitcloutTransactionId}
                          </p> */}
                        </>
                      ) : (
                        <>
                          <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            Listing will be automatically fulfilled soon.
                          </p>
                          <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            <b>Ethereum Txn ID:</b> <br></br>
                            {listing.finalTransactionId}
                          </p>
                          {/* <p style={{ color: "#6494FF", fontSize: "0.85rem" }}>
                            <b>Bitclout Txn ID:</b> <br></br>
                            {listing.bitcloutTransactionId}
                          </p> */}
                        </>
                      )}
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col
                    sm={1}
                    style={window.innerWidth <= 768 ? { display: "none" } : {}}
                  >
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
                <Row style={{ marginTop: "1rem" }}>
                  {listing.ongoing && !listing.escrow.full && (
                    <Col sm={1}>
                      <Button
                        style={{
                          backgroundColor: "#6494FF",
                          borderColor: "#6494FF",
                        }}
                        onClick={cancelBuy}
                      >
                        Cancel
                      </Button>
                    </Col>
                  )}
                  {listing.seller._id === user._id &&
                    !listing.completed.status &&
                    !listing.ongoing && (
                      <Col
                        sm={1}
                        style={
                          window.innerWidth <= 768
                            ? { marginBottom: "1rem" }
                            : {}
                        }
                      >
                        <Button
                          style={{
                            backgroundColor: "#F03D3E",
                            borderColor: "#F03D3E",
                            marginLeft: !listing.ongoing ? "0" : "2rem",
                          }}
                          onClick={submitDelete}
                        >
                          Delete
                        </Button>
                      </Col>
                    )}
                </Row>
              </Col>
            </>
          </Container>
        </>
      )}
    </>
  );
  // }
  // else {
  //   return (
  //     <>
  //       <h1>Loading</h1>
  //     </>
  //   );
  // }
};
export default SpecificListing;
