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
import { FiBookmark, FiX } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import MediaQuery from "react-responsive";
import { getListings } from "../../services/listings";
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

  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostAd, setPostAdPart] = useState(false);

  useEffect(() => {
    console.log();
    getListings()
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
                  </p>
                  <p
                    style={
                      window.visualViewport.width <= 768
                        ? { display: "none" }
                        : { color: "#C4C4C4", fontSize: "0.8em" }
                    }
                  >
                    Posted Time
                  </p>
                </Row>
                {listings
                  .slice(0)
                  .reverse()
                  .map((listing: any, i: number) => (
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
        sm={3}
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
          <TextField
            id="username"
            label="Bitclout Id"
            variant="outlined"
            fullWidth={true}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "5%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <TextField
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
          />
          <TextField
            id="username"
            label="Amount of Bitclout"
            variant="outlined"
            fullWidth={true}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <TextField
            id="username"
            label="$USD per Bitclout"
            variant="outlined"
            fullWidth={true}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <TextField
            id="username"
            label="Amount of ETH"
            variant="outlined"
            fullWidth={true}
            // onChange={handleNameChange}
            size={"small"}
            style={{ marginTop: "15%" }}
            inputProps={{
              style: { fontSize: "1vh", height: "2vh", fontStyle: "lato" },
            }}
          />
          <Button
            style={{
              width: "10em",
              height: "2.5rem",
              backgroundColor: "#4263EB",
              marginTop: "15%",
            }}
          >
            Post Swap
          </Button>
        </Col>
      </Col>
    </Wrapper>
  );
};

export default Home;
