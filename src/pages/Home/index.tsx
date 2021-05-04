import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
  Form,
  Dropdown
} from "react-bootstrap";
import FeedListing from "../../components/FeedListing";
import Slider from "@material-ui/core/Slider";

import { ListingSchema } from "../../components/interfaces";
import { FiHelpCircle, FiFilter, FiX, FiSliders } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import { getListings, createListing } from "../../services/listings";
import { loggedInState, userState } from "store";
import { useRecoilValue, useRecoilState } from "recoil";
import { MainContent, Wrapper, FeedContent, MobileButton } from "./styles";
import { useUser, useFirstRender, useEthPrice } from "components/hooks";
import OngoingItem from "components/OngoingItem";
import { TableRow } from "material-ui";

import {
  getLogs,
  getTotalVolume,
  getAvgPrice,
  getPendingTransactions,
  postRetryListing
} from "../../services/admin";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const ongoingSwapTooltip = props => (
  <Tooltip id="swap-tooltip" {...props}>
    These are listings you have made that are currently in progress
  </Tooltip>
);
const ongoingBuysTooltip = props => (
  <Tooltip id="buys-tooltip" {...props}>
    These are listings you have purchased that are currently in progress
  </Tooltip>
);

const averageSwapTooltip = props => (
  <Tooltip id="average-tooltip" {...props}>
    This price reflects the average over all completed listings on BitSwap
  </Tooltip>
);
const volumeReinvestedTooltip = (props) => (
  <Tooltip id="volume-tooltip" {...props}>
    We invest the bitclout made from transaction fees in daily intervals.
  </Tooltip>
);

const Home = (props: any) => {
  const user = useRecoilValue(userState);
  const firstRender = useFirstRender();
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [volumeSort, setVolumeSort] = useState("");
  const [dateSort, setDateSort] = useState("desc");
  const [priceSort, setPriceSort] = useState("");
  const [volume, setVolume] = useState(null);
  const [volumeUSD, setVolumeUSD] = useState(null);
  const [introModal, setIntroModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [pricePerBitcloutFilter, setPricePerBitcloutFilter] = useState([
    1,
    250
  ]);
  const [volumeFilter, setVolumeFilter] = useState([1, 1000]);

  const [pricesPerBitclout, setPricesPerBitclout] = useState([1, 250]);
  const [volumes, setVolumes] = useState([1, 1000]);

  const [showVolumeTag, setShowVolumeTag] = useState(false);
  const [showPriceTag, setShowPriceTag] = useState(false);

  const [avgprice, setAvgprice] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const { etherPrice, ethIsLoading, ethIsError } = useEthPrice();
  const [volumeLoading, setVolumeLoading] = useState(true);

  const handleChangePrice = (event, newValue) => {
    setShowPriceTag(true);
    setPricePerBitcloutFilter(newValue);
  };

  const handleChangeVolume = (event, newValue) => {
    setVolumeFilter(newValue);
    setShowVolumeTag(true);
  };

  useEffect(() => {
    getAvgPrice()
      .then(response => {
        setAvgprice(response.data);
        setStatsLoading(false);
        console.log(response);
      })
      .catch(error => {
        setStatsLoading(false);
        console.log(error.data);
      });

    getTotalVolume()
      .then(response => {
        setVolume(response.data);
        setVolumeLoading(false);
      })
      .catch(error => {
        console.log(error.data);
        setVolumeLoading(false);
      });

    getListings(
      volumeSort,
      dateSort,
      priceSort,
      pricePerBitcloutFilter[0],
      pricePerBitcloutFilter[1],
      volumeFilter[0],
      volumeFilter[1]
    )
      .then(res => {
        // console.log(res);
        setListings(res.data);
        // let minPrice = Number.MAX_SAFE_INTEGER;
        // let maxPrice = 0;
        // let minVolume = Number.MAX_SAFE_INTEGER;
        // let maxVolume = 0;
        // res.data.forEach(listing => {
        //   if (listing.usdamount / (listing.bitcloutnanos / 1e9) > maxPrice) {
        //     maxPrice = listing.usdamount / (listing.bitcloutnanos / 1e9);
        //   }
        //   if (listing.usdamount / (listing.bitcloutnanos / 1e9) < minPrice) {
        //     minPrice = listing.usdamount / (listing.bitcloutnanos / 1e9);
        //   }
        //   if (listing.bitcloutnanos / 1e9 > maxVolume) {
        //     maxVolume = listing.bitcloutnanos / 1e9;
        //   }
        //   if (listing.bitcloutnanos / 1e9 < minVolume) {
        //     minVolume = listing.bitcloutnanos / 1e9;
        //   }
        // });
        // setPricesPerBitclout([minPrice, maxPrice]);
        // setVolumes([minVolume, maxVolume]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [dateSort, volumeSort, priceSort, pricePerBitcloutFilter, volumeFilter]);

  useEffect(() => {
    getListings(volumeSort, dateSort, priceSort)
      .then(res => {
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = 0;
        let minVolume = Number.MAX_SAFE_INTEGER;
        let maxVolume = 0;
        res.data.forEach(listing => {
          if (listing.usdamount / (listing.bitcloutnanos / 1e9) > maxPrice) {
            maxPrice = listing.usdamount / (listing.bitcloutnanos / 1e9);
          }
          if (listing.usdamount / (listing.bitcloutnanos / 1e9) < minPrice) {
            minPrice = listing.usdamount / (listing.bitcloutnanos / 1e9);
          }
          if (listing.bitcloutnanos / 1e9 > maxVolume) {
            maxVolume = listing.bitcloutnanos / 1e9;
          }
          if (listing.bitcloutnanos / 1e9 < minVolume) {
            minVolume = listing.bitcloutnanos / 1e9;
          }
        });
        setPricesPerBitclout([minPrice, maxPrice]);
        setVolumes([minVolume, maxVolume]);
        setPricePerBitcloutFilter([minPrice, maxPrice]);
        setVolumeFilter([minVolume, maxVolume]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!ethIsLoading) {
      getTotalVolume()
        .then(response => {
          setVolume(response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error.data);
        });
      getAvgPrice()
        .then(response => {
          let bitcloutvolume = volume.totalbitcloutnanos / 1e9;
          let ethervolume = volume.totaletheramount;
          let bitcloutpriceUSD = bitcloutvolume * response.data.avgprice;
          let etherpriceUSD = ethervolume * etherPrice.USD;
          setVolumeUSD(bitcloutpriceUSD + etherpriceUSD);
          setAvgprice(response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }, [ethIsLoading, etherPrice]);

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
          onHide={() => setFilterModal(false)}
          style={{ display: "flex", margin: "auto" }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size={"lg"}
        >
          <Modal.Body>
            <Col>
              <div>
                <FiX
                  size={"2rem"}
                  style={{
                    position: "relative",
                    float: "right",
                    marginRight: "0.75rem",
                    zIndex: 99,
                    marginTop: "1rem",
                    color: "#ACB5BD",
                    cursor: "pointer"
                  }}
                  onClick={() => setFilterModal(false)}
                />
              </div>
            </Col>
            <Col style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginTop: "3%",
                  marginLeft: "2%"
                }}
              >
                Filter Swaps
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
                    paddingTop: "3.5%"
                  }}
                >
                  <Row>
                    <p
                      style={{
                        color: "#4263EB",
                        fontSize: "1.05rem",
                        marginLeft: "2%"
                      }}
                    >
                      Price per Bitclout
                    </p>
                    <p
                      style={{
                        color: "#6494FF",
                        fontSize: "0.8rem",
                        marginLeft: "10%",
                        marginTop: "1%"
                      }}
                    >
                      ${pricePerBitcloutFilter[0]} - $
                      {pricePerBitcloutFilter[1]}
                    </p>
                  </Row>
                  <Slider
                    min={pricesPerBitclout[0]}
                    max={pricesPerBitclout[1]}
                    value={pricePerBitcloutFilter}
                    onChange={handleChangePrice}
                    style={{ color: "#4263EB", width: "95%", marginTop: "10%" }}
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
                    paddingTop: "3.5%"
                  }}
                >
                  <Row>
                    <p
                      style={{
                        color: "#4263EB",
                        fontSize: "1.05rem",
                        marginLeft: "2%"
                      }}
                    >
                      Volume of Bitclout
                    </p>
                    <p
                      style={{
                        color: "#6494FF",
                        fontSize: "0.8rem",
                        marginLeft: "10%",
                        marginTop: "1%"
                      }}
                    >
                      {volumeFilter[0]} - {volumeFilter[1]}
                    </p>
                  </Row>
                  <Slider
                    min={volumes[0]}
                    max={volumes[1]}
                    style={{ color: "#4263EB", width: "90%", marginTop: "10%" }}
                    value={volumeFilter}
                    onChange={handleChangeVolume}
                    scale={volumeFilter => volumeFilter + 10000}
                    aria-labelledby="non-linear-slider"
                    step={1}
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
                marginBottom: "3%"
              }}
            >
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      // setFilterModal(false);
                      setPricePerBitcloutFilter(pricesPerBitclout);
                      setVolumeFilter(volumes);
                      setShowPriceTag(false);
                      setShowVolumeTag(false);
                    }}
                    style={{ backgroundColor: "#4263EB", width: "15rem" }}
                  >
                    Reset Filters
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
                  color: "#ACB5BD"
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
                        marginBottom: "2rem"
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
                  style={{
                    marginTop: "0.1rem",
                    backgroundColor: "white",
                    border: "#4263EB",
                    borderWidth: "0.05rem",
                    borderStyle: "solid",
                    color: "#4263EB",
                    marginLeft: "2%"
                  }}
                >
                  Tutorial
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col>
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "#DDE2E5",
                    borderWidth: "0.08rem",
                    borderRadius: 10,
                    paddingTop: "5%",
                    paddingLeft: "7%",
                    width: "14rem"
                  }}
                >
                  <p style={{ fontSize: "0.6rem" }}>
                    <span>Total Volume Transacted</span>
                  </p>

                  <p
                    style={{
                      color: "#212429",
                      fontSize: "1.25rem",
                      fontWeight: 700
                    }}
                  >
                    {volumeUSD
                      ? `$${Number(volumeUSD.toFixed(2)).toLocaleString()}`
                      : "Loading..."}
                  </p>
                </div>
              </Col>

              <Col>
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "#DDE2E5",
                    borderWidth: "0.08rem",
                    borderRadius: 10,
                    paddingTop: "5%",
                    paddingLeft: "7%",
                    width: "14rem"
                  }}
                >
                  <p style={{ fontSize: "0.75rem" }}>
                    <span>Average Swap Price</span>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 100, hide: 300 }}
                      overlay={averageSwapTooltip}
                    >
                      <FiHelpCircle
                        style={{
                          marginLeft: "23%",
                          color: "#212429",
                          fontWeight: 400
                        }}
                      />
                    </OverlayTrigger>
                  </p>

                  <p
                    style={{
                      color: "#212429",
                      fontSize: "1.25rem",
                      fontWeight: 700
                    }}
                  >
                    ${!statsLoading ? avgprice.avgprice.toFixed(2) : 100}
                  </p>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "#DDE2E5",
                    borderWidth: "0.08rem",
                    borderRadius: 10,
                    paddingTop: "5%",
                    paddingLeft: "7%",
                    width: "14rem"
                  }}
                >
                  <p style={{ fontSize: "0.75rem" }}>
                    <span>Volume Reinvested</span>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 100, hide: 300 }}
                      overlay={volumeReinvestedTooltip}
                    >
                      <FiHelpCircle
                        style={{
                          marginLeft: "23%",
                          color: "#212429",
                          fontWeight: 400,
                        }}
                      />
                    </OverlayTrigger>
                  </p>

                  <p
                    style={{
                      color: "#212429",
                      fontSize: "1.25rem",
                      fontWeight: 700
                    }}
                  >
                    {volume
                      ? `${((volume.totalbitcloutnanos / 1e9) * 0.02).toFixed(
                          2
                        )} BCLT`
                      : "Loading..."}
                  </p>
                </div>
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
            <Row style={{ marginLeft: "1rem", marginTop: "4%" }}>
              <FiFilter
                onClick={() => setFilterModal(true)}
                className="hoverCursor"
                size={"1rem"}
                color={"#6494FF"}
                style={{ marginTop: "0.7%", marginRight: "0.7%" }}
              />
              <p
                onClick={() => setFilterModal(true)}
                className="hoverCursor"
                style={{ color: "#6494FF", fontSize: "1em" }}
              >
                Filter
              </p>

              <div
                style={{
                  fontSize: "0.75rem",
                  border: "1px solid #6494FF",
                  backgroundColor: "white",
                  height: "0.85rem",
                  color: "#6494FF",
                  paddingBottom: "1.4rem",
                  width: "auto",
                  borderRadius: 50,
                  flexDirection: "row",
                  display: showPriceTag ? "flex" : "none",
                  marginLeft: "0.65rem",
                  paddingRight: "0.7rem"
                }}
              >
                {/* <FiXCircle
                  onClick={() => {
                    setShowPriceTag(false);
                    setPricePerBitcloutFilter(pricesPerBitclout);
                  }}
                  className="hoverCursor"
                  color={"#6494FF"}
                  size={"1rem"}
                  style={{ marginTop: "0.2rem", marginLeft: "0.3rem" }}
                /> */}
                <p style={{ marginLeft: "0.5rem", marginTop: "0.1rem" }}>
                  Price per Bitclout: ${pricePerBitcloutFilter[0]} - $
                  {pricePerBitcloutFilter[1]}
                </p>
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  border: "1px solid #6494FF",
                  backgroundColor: "white",
                  height: "0.85rem",
                  color: "#6494FF",
                  paddingBottom: "1.4rem",
                  width: "auto",
                  borderRadius: 50,
                  flexDirection: "row",
                  display: showVolumeTag ? "flex" : "none",
                  marginLeft: "0.65rem",
                  paddingRight: "0.7rem"
                }}
              >
                {/* <FiXCircle
                  onClick={() => {
                    setShowVolumeTag(false);
                    setVolumeFilter(volumes);
                  }}
                  className="hoverCursor"
                  color={"#6494FF"}
                  size={"1rem"}
                  style={{ marginTop: "0.2rem", marginLeft: "0.3rem" }}
                /> */}
                <p style={{ marginLeft: "0.5rem", marginTop: "0.1rem" }}>
                  Volume of Bitclout: {volumeFilter[0]} - {volumeFilter[1]}
                </p>
              </div>
            </Row>
            <Row
              style={{
                marginLeft: "1rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2%"
              }}
            >
              <FiSliders
                size={"1rem"}
                color={"#6494FF"}
                style={{ marginTop: "0.7%", marginRight: "0.7%" }}
              />
              {/* <p style={{ fontSize: "1em" }}>Sort</p> */}

              <Dropdown
                onSelect={(eventKey: any, event: Object) => {
                  switch (eventKey) {
                    case "1":
                      setDateSort("desc");
                      setPriceSort("");
                      setVolumeSort("");
                      break;
                    case "2":
                      setDateSort("asc");
                      setPriceSort("");
                      setVolumeSort("");
                      break;
                    case "3":
                      setDateSort("");
                      setPriceSort("asc");
                      setVolumeSort("");
                      break;
                    case "4":
                      setDateSort("");
                      setPriceSort("desc");
                      setVolumeSort("");
                      break;
                    case "5":
                      setDateSort("");
                      setPriceSort("");
                      setVolumeSort("asc");
                      break;
                    case "6":
                      setDateSort("");
                      setPriceSort("");
                      setVolumeSort("desc");
                      break;
                  }
                }}
              >
                <Dropdown.Toggle
                  style={{
                    backgroundColor: "white",
                    borderColor: "#6494FF",
                    color: "#6494FF"
                  }}
                >
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" active={dateSort === "desc"}>
                    Date, newest first
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" active={dateSort === "asc"}>
                    Date, oldest first
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" active={priceSort === "asc"}>
                    Price per Bitclout, ascending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="4" active={priceSort === "desc"}>
                    Price per Bitclout, descending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="5" active={volumeSort === "asc"}>
                    Volume, ascending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="6" active={volumeSort === "desc"}>
                    Volume, descending
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <FeedContent>
              <Col>
                <div
                  className="scrollNoBar"
                  style={
                    window.visualViewport.width > 768
                      ? {
                          background: "transparent",
                          maxHeight: "62vh",
                          overflowX: "hidden"
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
                      width: "2rem"
                    }
                  : {
                      display: "none"
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
                      marginLeft: "10%"
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
                        width: "100rem"
                      }}
                    />
                  </Row>
                  {userData.listings.map(listing => {
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
                    listing => listing.ongoing === true
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
                      marginLeft: "10%"
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
                        width: "100rem"
                      }}
                    />
                  </Row>
                  {userData.buys.map(listing =>
                    listing.ongoing ? (
                      <OngoingItem
                        bitcloutnanos={listing.bitcloutnanos}
                        usdamount={listing.usdamount}
                        listingid={listing._id}
                      />
                    ) : null
                  )}
                  {userData.buys.some(
                    listing => listing.ongoing === true
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
