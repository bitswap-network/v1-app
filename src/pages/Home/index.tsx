import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
} from "react-bootstrap";
import FeedListing from "../../components/FeedListing";
import Slider from "@material-ui/core/Slider";

import { ListingSchema } from "../../components/interfaces";
import { FiHelpCircle, FiFilter, FiX } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import { getListings, createListing } from "../../services/listings";
import { loggedInState, userState } from "store";
import { useRecoilValue, useRecoilState } from "recoil";
import { MainContent, Wrapper, FeedContent, MobileButton } from "./styles";
import { useUser, useFirstRender } from "components/hooks";
import OngoingItem from "components/OngoingItem";
import { TableRow } from "material-ui";

const ongoingSwapTooltip = (props) => (
  <Tooltip id="swap-tooltip" {...props}>
    These are listings you have made that are currently in progress
  </Tooltip>
);
const ongoingBuysTooltip = (props) => (
  <Tooltip id="buys-tooltip" {...props}>
    These are listings you have purchased that are currently in progress
  </Tooltip>
);

const Home = (props: any) => {
  const user = useRecoilValue(userState);
  const firstRender = useFirstRender();
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [volumeSort, setVolumeSort] = useState("desc");
  const [dateSort, setDateSort] = useState("desc");
  const [introModal, setIntroModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [value, setValue] = React.useState([20, 37]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getListings(volumeSort, dateSort)
      .then((res) => {
        // console.log(res);
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
      <>
        <Modal
          show={filterModal}
          onHide={false}
          style={{ display: "flex", margin: "auto" }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size={"lg"}
        >
          <Modal.Body>
            <Col>
              <FiX
                size={"2rem"}
                style={{
                  float: "right",
                  marginRight: "0.75rem",
                  marginTop: "1rem",
                  color: "#ACB5BD",
                  cursor: "pointer",
                }}
                onClick={() => setFilterModal(false)}              
              />
            </Col>
            <Col style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginTop: "3%",
                  marginLeft: "2%",
                }}
              >
                Filter Results
              </p>
            </Col>
            <Col style={{ marginTop: "4%", marginLeft: "3%" }}>
              <Row style={{ width: "110%" }}>
                <Col
                  style={{
                    border: "0.05rem solid #4263EB",
                    fontWeight: 700,
                    borderRadius: 6,
                    marginRight: "5%",
                    paddingLeft: "4.5%",
                    paddingBottom: "3%",
                    paddingTop: "3.5%",
                  }}
                >
                  <Row>
                  <p style={{ color: "#4263EB", fontSize: "1.05rem", marginLeft: "2%" }}>
                    Offer Size
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.8rem", marginLeft: "32%", marginTop: "1%" }}>
                    ${value[0]} - ${value[1]}
                  </p>
                  </Row>
                  <Slider
                    value={value}
                    onChange={handleChange}
                    scale={(x) => x**2}
                    style={{ color: "#4263EB", width: "95%" }}

                  />
                </Col>
                <Col
                  style={{
                    border: "0.05rem solid #4263EB",
                    fontWeight: 700,
                    borderRadius: 6,
                    marginRight: "10%",
                    paddingLeft: "4.5%",
                    paddingBottom: "3%",
                    paddingTop: "3.5%",
                  }}
                >
                  <Row>
                  <p style={{ color: "#4263EB", fontSize: "1.05rem", marginLeft: "2%" }}>
                    Time Posted
                  </p>
                  <p style={{ color: "#6494FF", fontSize: "0.8rem", marginLeft: "30%", marginTop: "1%" }}>
                    ${value[0]} - ${value[1]}
                  </p>
                  </Row>
                  <Slider
                    style={{ color: "#4263EB", width: "90%" }}
                    aria-labelledby="range-slider"
                    marks={[
                      { value: 10, label: "< 1 minute" },
                      { value: 90, label: "> 2 days" },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              style={{
                marginTop: "5%",
                textAlign: "center",
                alignSelf: "center",
                justifySelf: "center",
                marginBottom: "3%",
              }}
            >
              <Row>
                <Col>
                  <Button
                    onClick={() => setIntroModal(true)}
                    style={{ backgroundColor: "#4263EB", width: "15rem" }}
                  >
                    Apply Filter
                  </Button>
                </Col>
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
        <Modal
          show={introModal}
          onHide={() => setIntroModal(false)}
          style={{ display: "flex", margin: "auto" }}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
        >
          <Modal.Body style={{ padding: "2em", textAlign: "center" }}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col style={{ marginLeft: "1.5rem" }}>
                <h3>BitSwap Tutorial</h3>
              </Col>
              <FiX
                className="hoverCursor"
                size={"2rem"}
                style={{
                  float: "right",
                  marginRight: "0.75rem",
                  marginTop: "0rem",
                  color: "#ACB5BD",
                }}
                onClick={() => setIntroModal(false)}
              />
            </Row>

            <div className="video-responsive">
              <iframe
                width="100%"
                height="400vh"
                src="https://www.youtube.com/embed/pLy_t9objuU"
                title="BitSwap Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <Wrapper>
        <NavBar />
        <Col
          sm={12}
          md={8}
          lg={8}
          xl={window.visualViewport.width > 1600 ? 11 : 9}
        >
          <MainContent>
            <Row>
              <h3
                style={
                  window.visualViewport.width <= 768
                    ? {
                        marginLeft: "1rem",
                        fontSize: "1.5rem",
                        marginBottom: "2rem",
                      }
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
              ></h5>
              <Col>
                <Button
                  size="sm"
                  onClick={() => setIntroModal(true)}
                  style={{ marginTop: "0.1rem" }}
                >
                  Tutorial
                </Button>
              </Col>
            </Row>
            {/* <MediaQuery query="(max-device-width: 768px)">
              <MobileButton
                onClick={() => {
                  props.history.push("/postad");
                }}
              >
                Post Swap
              </MobileButton>
            </MediaQuery>  */}
            <Row  style={{marginLeft: "1rem", marginTop: "4.75%"}}>
              <FiFilter onClick={() => setFilterModal(true)} className="hoverCursor" size={'1rem'} color={"#6494FF"} style={{marginTop: "0.7%", marginRight: "0.7%"}} />
              <p onClick={() => setFilterModal(true)} className="hoverCursor" style={{color: "#6494FF", fontSize: "1em"}}>Filter</p>
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
        <Col style={{ marginLeft: 0, paddingLeft: 0 }}>
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
          <Col
            sm={3}
            style={window.visualViewport.width > 768 ? { marginTop: "6%" } : {}}
          >
            {userData && (
              <>
                <Row>
                  <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                    Ongoing Swaps
                  </h5>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 300 }}
                    overlay={ongoingSwapTooltip}
                  >
                    <FiHelpCircle
                      style={{ marginTop: "0.25em", marginLeft: "12px" }}
                    />
                  </OverlayTrigger>
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
                    Amount (BCLT)
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
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 300 }}
                    overlay={ongoingBuysTooltip}
                  >
                    <FiHelpCircle
                      style={{ marginTop: "0.25em", marginLeft: "12px" }}
                    />
                  </OverlayTrigger>
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
                    Amount (BCLT)
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
                  {userData.buys.map((listing) =>
                    listing.ongoing ? (
                      <OngoingItem
                        bitcloutnanos={listing.bitcloutnanos}
                        usdamount={listing.usdamount}
                        listingid={listing._id}
                      />
                    ) : null
                  )}
                  {userData.buys.some(
                    (listing) => listing.ongoing === true
                  ) ? null : (
                    <p style={{ marginLeft: "5%", fontSize: "0.9rem" }}>
                      You don't have any ongoing buys
                    </p>
                  )}
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
