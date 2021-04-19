import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { logout } from "../../actions/auth";
import FeedListing from "../../components/FeedListing";
import { RootState } from "../../reduxStore";
import { ListingSchema } from "../../components/interfaces";
import env from "../../components/data/env.json";
import Ongoing from "../../components/Ongoing";
import { FiBookmark } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import MediaQuery from "react-responsive";
import {
  MainContent,
  Wrapper,
  DesktopButton,
  MobileButton,
  FeedContent,
  SearchBarWrapper
} from "./styles";

const mapStateToProps = (state: RootState) => ({ auth: state.auth });

const Home = (props: any) => {
  // const state = store.getState();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  // const { user: currentUserT } = useAppSelector(state => state.auth);
  // const [currentUser, setCurrentUser] = useState(currentUserT);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [ongoingListings, setOngoingListings] = useState<ListingSchema[]>([]);
  const price = props.auth.priceFeed || 1;

  useEffect(() => {
    console.log();
    setListings([
      {
        bitCloutSent: false,
        bitcloutTransactionId: "yessir",
        bitcloutamount: 10,
        buyer: null,
        created: "yesterday",
        escrowFull: false,
        ethAmount: 10,
        lister: null,
        name: "ues",
        processing: false,
        sold: false,
        _id: "yes",
        escrowBalance: 10,
        finalTransactionId: undefined
      },
      {
        bitCloutSent: false,
        bitcloutTransactionId: "yessir",
        bitcloutamount: 10,
        buyer: null,
        created: "yesterday",
        escrowFull: false,
        ethAmount: 10,
        lister: null,
        name: "ues",
        processing: false,
        sold: false,
        _id: "yes",
        escrowBalance: 10,
        finalTransactionId: undefined
      },
      {
        bitCloutSent: false,
        bitcloutTransactionId: "yessir",
        bitcloutamount: 10,
        buyer: null,
        created: "yesterday",
        escrowFull: false,
        ethAmount: 10,
        lister: null,
        name: "ues",
        processing: false,
        sold: false,
        _id: "yes",
        escrowBalance: 10,
        finalTransactionId: undefined
      },
      {
        bitCloutSent: false,
        bitcloutTransactionId: "yessir",
        bitcloutamount: 10,
        buyer: null,
        created: "yesterday",
        escrowFull: false,
        ethAmount: 10,
        lister: null,
        name: "ues",
        processing: false,
        sold: false,
        _id: "yes",
        escrowBalance: 10,
        finalTransactionId: undefined
      }
    ]);

    if (isLoggedIn) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      };
      axios
        .get(`${env.url}/listings`, config)
        .then(response => {
          console.log(response.data);
          setListings(response.data);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
      axios
        .post(
          `${env.url}/listings/${currentUser.username}`,
          { ongoing: true },
          config
        )
        .then(response => {
          setOngoingListings(response.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
      axios
        .post(`${env.url}/uid/`, { id: currentUser._id })
        .then(response => {
          setCurrentUser(response.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  }, []);
  const scaler = () => {
    if (isLoggedIn && currentUser.buying) {
      if (currentUser.buying.state) {
        return 3;
      }
    } else {
      return 0;
    }
  };
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
                  props.history.push("/postad");
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
                            fontSize: "0.8em"
                          }
                        : {
                            color: "#C4C4C4",
                            marginRight: "22em",
                            fontSize: "0.8em"
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
                            fontSize: "0.8em"
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
                      price={price}
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
        <Col
          sm={3}
          style={{
            alignItems: "left",
            textAlign: "center",
            marginRight: "-100px"
          }}
        >
          <>
            {false && isLoggedIn && currentUser.buying.state && (
              <>
                <h5>
                  <b>Ongoing Buy</b>
                </h5>
                <div style={{ marginBottom: "40%" }}>
                  <Button
                    onClick={() => {
                      props.history.push(`/buy/${currentUser.buying.id}`);
                    }}
                  >
                    View
                  </Button>
                </div>
              </>
            )}

            {ongoingListings && ongoingListings.length > 0 && (
              <>
                <h5>
                  <b>Ongoing Sell</b>
                </h5>
                <Ongoing listings={ongoingListings} history={props.history} />
              </>
            )}
          </>
        </Col>
      </Col>
    </Wrapper>
  );
};

export default connect(mapStateToProps)(Home);
