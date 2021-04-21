import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import FeedListing from "../../components/FeedListing";
import { ListingSchema } from "../../components/interfaces";
import {
  FiBookmark,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiDollarSign,
  FiBox,
} from "react-icons/fi";
import NavBar from "../../components/NavBar";
import { Redirect } from "react-router-dom";
import MediaQuery from "react-responsive";
import { getListings, createListing } from "../../services/listings";
import { loggedInState, userState } from "store";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  MainContent,
  Wrapper,
  DesktopButton,
  MobileButton,
  FeedContent,
  SearchBarWrapper,
} from "./styles";
import { useUser } from "components/hooks";
import OngoingItem from "components/OngoingItem";

const Home = (props: any) => {
  const user = useRecoilValue(userState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [volumeSort, setVolumeSort] = useState("desc");
  const [dateSort, setDateSort] = useState("desc");

  useEffect(() => {
    getListings(volumeSort, dateSort)
      .then((res) => {
        console.log(res);
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dateSort, volumeSort]);

  const handleSort = (type: string) => {
    if (type === "date") {
      if (dateSort === "desc") {
        setDateSort("asc");
      } else {
        setDateSort("desc");
      }
    }
    if (type === "volume") {
      if (volumeSort === "desc") {
        setVolumeSort("asc");
      } else {
        setVolumeSort("desc");
      }
    }
  };

  if (user && !isLoggedIn) {
    window.location.assign("/login");
  }

  return (
    <>
      <Wrapper>
        <NavBar />
        <Col sm={window.visualViewport.width <= 1800 ? 9 : 0}>
          <MainContent sm={window.visualViewport.width <= 1800 ? 12 : 12}>
            <Row>
              <h3
                style={
                  window.visualViewport.width <= 768
                    ? { marginLeft: "3rem", fontSize: "1.5rem" }
                    : { marginLeft: "1rem" }
                }
              >
                <b>Swap Feed</b>
              </h3>
              <h5
                style={
                  window.visualViewport.width <= 768
                    ? { marginLeft: "2.5rem" }
                    : {}
                }
              >
                {/* $Bitclout price: ~${bitcloutprice.toFixed(2)} */}
              </h5>
            </Row>
            {/* <Row>
              <MediaQuery query="(min-device-width: 768px)">
                <DesktopButton
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Post Swap
                </DesktopButton>
              </MediaQuery>
            </Row>
            <MediaQuery query="(max-device-width: 768px)">
              <MobileButton
                onClick={() => {
                  props.history.push("/postad");
                }}
              >
                Post Swap
              </MobileButton>
            </MediaQuery> */}
            <FeedContent>
              <Col>
                <div
                  className="scrollNoBar"
                  style={{ background: "transparent" }}
                >
                  <Row style={{ marginBottom: "-1.2em", marginLeft: "1.3em" }}>
                    <p
                      style={
                        window.visualViewport.width <= 768
                          ? {
                              marginRight: "6rem",
                              color: "#C4C4C4",
                              fontSize: "0.8em",
                            }
                          : {
                              color: "#C4C4C4",
                              marginRight:
                                window.visualViewport.width <= 1800
                                  ? "10em"
                                  : "22em",
                              fontSize: "0.8em",
                            }
                      }
                    >
                      Username
                    </p>

                    <p
                      style={
                        window.visualViewport.width <= 768
                          ? { color: "#C4C4C4", fontSize: "0.8em" }
                          : {
                              color: "#C4C4C4",
                              marginRight:
                                window.visualViewport.width <= 1800
                                  ? "14em"
                                  : "22em",
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
                      {dateSort === "desc" ? (
                        <FiChevronDown
                          size={20}
                          color={"#C4C4C4"}
                          onClick={() => handleSort("date")}
                        />
                      ) : (
                        <FiChevronUp
                          size={20}
                          color={"black"}
                          onClick={() => handleSort("date")}
                        />
                      )}
                    </p>
                  </Row>
                  {listings.map((listing: any, i: number) => (
                    <FeedListing
                      listing={listing}
                      price={1}
                      index={i}
                      key={i}
                      loading={loading}
                      history={props.history}
                    />
                  ))}
                  {listings.length == 0 && (
                    // <div style={{ width: "100%" }}></div>
                    <Row style={{ minWidth: "100vw" }}></Row>
                  )}
                </div>
              </Col>
            </FeedContent>
          </MainContent>
        </Col>
        <Col style={{ marginLeft: "-10%" }}>
          <Row>
            <div
              style={
                window.visualViewport.width <= 1800
                  ? {
                      borderRight: "1px solid #DDE2E5",
                      height: "100vh",
                      paddingRight: 0,
                      width: "2rem",
                      marginLeft: "0.25rem",
                    }
                  : {
                      borderRight: "1px solid #DDE2E5",
                      height: "100vh",
                      paddingRight: 0,
                      width: "2rem",
                    }
              }
            />
          </Row>
        </Col>
        {isLoggedIn ? (
          <Col sm={4} style={{ marginTop: "6%" }}>
            <Row>
              <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                Ongoing Swaps
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
                Amount (BTCLT)
              </p>
            </Row>
            <div className="scrollNoBarSplit">
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>
              {userData?.listings.map((listing) => {
                if (listing.ongoing) {
                  return (
                    <OngoingItem
                      bitcloutnanos={listing.bitcloutamount}
                      usdamount={listing.usdamount}
                      listingid={listing._id}
                    />
                  );
                }
              })}
              {!userData?.listings.some(
                (listing) => listing.ongoing === true
              ) ? (
                <p>You don't have any ongoing swaps</p>
              ) : null}
              {/* <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            
            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row> */}
            </div>

            <Row style={{ marginTop: "7.5%" }}>
              <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                Ongoing Buy
              </h5>
            </Row>
            <div className="scrollNoBarSplit">
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row>
              {listings.map((listing) => {
                if (listing.ongoing === true) {
                  listing.buyer!._id! === userData._id && (
                    <OngoingItem
                      bitcloutnanos={listing.bitcloutnanos}
                      usdamount={listing.usdamount}
                      listingid={listing._id}
                    />
                  );
                }
              })}
              {!listings.some((listing) =>
                listing.buyer
                  ? listing.buyer._id! === userData._id &&
                    listing.ongoing === true
                  : false
              ) ? (
                <p>You don't have any ongoing buys</p>
              ) : null}
              {/* <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                <Col>
                  <p style={{ color: "#495057" }}>5 BTCLT @ $150</p>
                </Col>
                <Col>
                  <p style={{ color: "#4263EB", fontSize: "1rem" }}>View →</p>
                </Col>
              </Row>
              <Row>
                <hr
                  style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }}
                />
              </Row> */}
            </div>
          </Col>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Home;
