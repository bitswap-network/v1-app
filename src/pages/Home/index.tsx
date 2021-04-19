import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FeedListing from "../../components/FeedListing";
import { ListingSchema } from "../../components/interfaces";
import env from "../../components/data/env.json";
import { FiBookmark, FiX, FiChevronUp, FiChevronDown } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import MediaQuery from "react-responsive";
import { getListings, createListing } from "../../services/listings";
import { getBTCLT, getETHUSD } from "../../services/price";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import {
  MainContent,
  Wrapper,
  DesktopButton,
  MobileButton,
  FeedContent,
  SearchBarWrapper,
} from "./styles";

const Home = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [amountBitclout, setAmountBitclout] = useState("");
  const [amountError, setamountError] = useState(false);
  const [usdPerError, setusdPerError] = useState(false);
  const [usdPerBitclout, setusdPerBitclout] = useState("");
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostAd, setPostAdPart] = useState(false);
  const [bitcloutprice, setBitcloutprice] = useState(0);
  const [etherPrice, setetherPrice] = useState(0);
  const [volumeSort, setVolumeSort] = useState("desc");
  const [dateSort, setDateSort] = useState("desc");
  useEffect(() => {
    getListings(volumeSort, dateSort)
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getBTCLT()
      .then((price) => {
        console.log(price);
        setBitcloutprice(price);
        setusdPerBitclout(price.toFixed(2));
      })
      .catch((error) => {
        console.log(error);
      });
    getETHUSD().then((response) => {
      setetherPrice(parseFloat(response.data.USD));
    });
  }, []);

  const handleBitcloutChange = (e) => {
    setusdPerBitclout(e.target.value);
    if (parseFloat(e.target.value) <= 0) {
      setusdPerError(true);
    }
  };
  const handleAmountChange = (e) => {
    setAmountBitclout(e.target.value);
    setamountError(false);
    console.log(parseFloat(e.target.value) * 1e9, user.bitswapbalance);
    if (isLoggedIn) {
      if (parseFloat(e.target.value) * 1e9 > user.bitswapbalance) {
        setamountError(true);
      }
      if (parseFloat(amountBitclout) <= 0) {
        setamountError(true);
      }
    }
  };

  const submitPost = () => {
    if (!amountError && !usdPerError && isLoggedIn) {
      //add loading animation
      createListing(
        parseFloat(amountBitclout),
        parseFloat(usdPerBitclout),
        user.token
      ).then((response) => {
        console.log(response);
      });
    }
  };
  const handleSort = (type: string) => {
    if (type == "date") {
      if (dateSort == "desc") {
        setDateSort("asc");
      } else {
        setDateSort("desc");
      }
    }
    if (type == "volume") {
      if (volumeSort == "desc") {
        setVolumeSort("asc");
      } else {
        setVolumeSort("desc");
      }
    }
  };

  useEffect(() => {
    getListings(volumeSort, dateSort)
      .then((res) => {
        console.log(res);
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateSort, volumeSort]);

  return (
    <Wrapper>
      <NavBar />
      <Col>
        <MainContent sm={12}>
          <Row>
            <h3
              style={
                window.visualViewport.width <= 768
                  ? { marginLeft: "2.5rem" }
                  : {}
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
              $Bitclout price: ~${bitcloutprice.toFixed(2)}
            </h5>
            <MediaQuery query="(min-device-width: 768px)">
              <DesktopButton
                onClick={() => {
                  setPostAdPart(true);
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
          </MediaQuery>
          <FeedContent>
            <Col>
              <SearchBarWrapper>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FiBookmark size={20} color={"#43494f"} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search Offers"
                    aria-label="Search Offers"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </SearchBarWrapper>

              <div
                className="scrollNoBar"
                style={{ background: "transparent" }}
              >
                <Row style={{ marginBottom: "-1.2em", marginLeft: "1em" }}>
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
                            marginRight: "22em",
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
                            marginRight: "23em",
                            fontSize: "0.8em",
                          }
                    }
                  >
                    Offer
                    {/* {volumeSort === "desc" ? (
                      <FiChevronDown
                        size={20}
                        color={"black"}
                        onClick={() => handleSort("volume")}
                      />
                    ) : (
                      <FiChevronUp
                        size={20}
                        color={"black"}
                        onClick={() => handleSort("volume")}
                      />
                    )} */}
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
                        color={"black"}
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
              </div>
            </Col>
          </FeedContent>
        </MainContent>
      </Col>
      <Col
        style={
          showPostAd
            ? {
                flexDirection: "row",
                transition: "margin-left 10s 1s",
                display: "flex",
                marginLeft: "-10%",
                overflowX: "hidden",
              }
            : { display: "none" }
        }
        sm={showPostAd ? 3 : 0}
      >
        <div
          style={{
            borderLeft: "1px solid #DDE2E5",
            height: "100vh",
            width: "1rem",
          }}
        />

        <Col
          style={{
            marginLeft: "2%",
            marginTop: "15%",
          }}
        >
          <FiX
            size={30}
            color={"gray"}
            style={{ marginLeft: "100%" }}
            onClick={() => {
              setPostAdPart(false);
            }}
          />

          <p style={{ fontSize: "2.5vh", marginTop: "15%" }}>
            <b>Post Swap</b>
          </p>
          {/* <TextField
            id="username"
            label="Bitclout Id"
            variant="outlined"
            fullWidth={true}
            value={user.bitcloutpubkey}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "5%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          /> */}
          {/* <TextField
            id="username"
            label="ETH Wallet Address"
            variant="outlined"
            fullWidth={true}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          /> */}
          <TextField
            id="username"
            label="Amount of Bitclout"
            variant="outlined"
            fullWidth={true}
            onChange={handleAmountChange}
            value={amountBitclout}
            size={"medium"}
            error={amountError}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "2vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <TextField
            id="username"
            label="$USD per Bitclout"
            variant="outlined"
            fullWidth={true}
            onChange={handleBitcloutChange}
            value={usdPerBitclout}
            error={usdPerError}
            size={"medium"}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "2vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <h5>
            Total $USD:{" "}
            {parseFloat(amountBitclout) > 0 && parseFloat(usdPerBitclout) > 0
              ? (
                  parseFloat(amountBitclout) * parseFloat(usdPerBitclout)
                ).toFixed(2)
              : `0`}
          </h5>
          <h5>
            Total $ETH: ~
            {parseFloat(amountBitclout) > 0 &&
            parseFloat(usdPerBitclout) > 0 &&
            etherPrice > 0
              ? (
                  (parseFloat(amountBitclout) * parseFloat(usdPerBitclout)) /
                  etherPrice
                ).toFixed(2)
              : `0`}
          </h5>
          <Button
            style={{
              width: "10em",
              height: "2.5rem",
              backgroundColor: "#4263EB",
              marginTop: "15%",
            }}
            disabled={usdPerError || amountError}
            onClick={submitPost}
          >
            Submit
          </Button>
        </Col>
      </Col>
    </Wrapper>
  );
};

export default Home;
