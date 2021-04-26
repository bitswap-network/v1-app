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
import ModalError from "components/modalError/index";

const Home = (props: any) => {
  const user = useRecoilValue(userState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [volumeSort, setVolumeSort] = useState("desc");
  const [dateSort, setDateSort] = useState("desc");
  console.log("user data", userData, user);
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

  // const closeModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <>
      <Wrapper>
        <NavBar />
        <Col sm={window.visualViewport.width <= 1800 ? 9 : 12}>
          <MainContent>
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
                  <table style={{width: "120%"}}>
                        <tr>
                          <td style={{paddingBottom: "5%", fontSize: "0.8em", color: "#C4C4C4", width: "26.5%"}}>Username</td>

                          <td style={{paddingBottom: "5%", fontSize: "0.8em", color: "#C4C4C4", width: "32%"}}>Offer</td>



                          <td style={{paddingBottom: "5%", fontSize: "0.8em", color: "#C4C4C4"}}>Posted Time</td>
                        </tr>
                        <tr>
                      
    
                        </tr>
                  </table>

                  </Row>
                  <hr style={{marginBottom: "5%"}}></hr>


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
            {userData && (
              <>
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
                      style={{
                        borderTop: "1px solid #DDE2E5",
                        width: "100rem",
                      }}
                    />
                  </Row>
                  {userData.listings.map((listing) => {
                    if (listing.ongoing) {
                      return (
                        <OngoingItem
                          bitcloutnanos={listing.bitcloutnanos}
                          usdamount={listing.usdamount}
                          listingid={listing._id}
                        />
                      );
                    }
                  })}
                  {userData.listings.some(
                    (listing) => listing.ongoing === true
                  ) ? null : (
                    <p style={{ marginLeft: "5%", fontSize: "0.9rem" }}>
                      You don't have any ongoing swaps
                    </p>
                  )}
                </div>

                <Row style={{ marginTop: "7.5%" }}>
                  <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                    Ongoing Buy
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
                      style={{
                        borderTop: "1px solid #DDE2E5",
                        width: "100rem",
                      }}
                    />
                  </Row>
                  {userData.buys.map((listing) => (
                    <OngoingItem
                      bitcloutnanos={listing.bitcloutnanos}
                      usdamount={listing.usdamount}
                      listingid={listing._id}
                    />
                  ))}
                  {userData.buys.length === 0 ? (
                    <p style={{ marginLeft: "5%", fontSize: "0.9rem" }}>
                      You don't have any ongoing buys
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </Col>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Home;
