import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Container, Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { logout } from "../../actions/auth";
import FeedListing from "../../components/FeedListing";
import { RootState } from "../../store";
import { ListingSchema } from "../../components/interfaces";
import env from "../../components/data/env.json";
import Ongoing from "../../components/Ongoing";
import socketIOClient from "socket.io-client";
import { FiBookmark } from "react-icons/fi"
import NavBar from "../../components/NavBar"


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
  const [socketOn, setSocketOn] = useState(false);
  const socket = socketIOClient(`${env.url}`, {
    autoConnect: false,
    path: "/socket.io",
    transports: ["websocket"],
    secure: true
  });
  socket.on("connect", () => {
    setSocketOn(true);
    console.log("socket connected");
  });

  socket.on("disconnect", () => {
    setSocketOn(false);
    console.log("socket disconnected");
  });
  socket.on("usertoken", arg => {
    console.log("socket usertoken", arg); // world
  });
  socket.on("listings", arg => {
    console.log("socket listings", arg); // world
    setListings(arg);
  });
  socket.on("ongoing", arg => {
    console.log("ongoing listings", arg); // world
    setOngoingListings(arg);
  });
  console.log(listings, price);
  // if (currentUser && Object.keys(currentUser).length === 0) {
  //   dispatch(logout() as any);
  // }

  useEffect(() => {
    setListings([  {bitCloutSent: false,
      bitcloutTransactionId: "yessir",
      bitcloutamount: 10,
      buyer: null,
      created: "yesterday",
      escrowFull: false,
      ethAmount: 10,
      lister: null,
      name: 'ues',
      processing: false,
      sold: false,
      _id: 'yes',
      escrowBalance: 10,
      finalTransactionId: undefined},
      {bitCloutSent: false,
        bitcloutTransactionId: "yessir",
        bitcloutamount: 10,
        buyer: null,
        created: "yesterday",
        escrowFull: false,
        ethAmount: 10,
        lister: null,
        name: 'ues',
        processing: false,
        sold: false,
        _id: 'yes',
        escrowBalance: 10,
        finalTransactionId: undefined},
        {bitCloutSent: false,
          bitcloutTransactionId: "yessir",
          bitcloutamount: 10,
          buyer: null,
          created: "yesterday",
          escrowFull: false,
          ethAmount: 10,
          lister: null,
          name: 'ues',
          processing: false,
          sold: false,
          _id: 'yes',
          escrowBalance: 10,
          finalTransactionId: undefined},
          {bitCloutSent: false,
            bitcloutTransactionId: "yessir",
            bitcloutamount: 10,
            buyer: null,
            created: "yesterday",
            escrowFull: false,
            ethAmount: 10,
            lister: null,
            name: 'ues',
            processing: false,
            sold: false,
            _id: 'yes',
            escrowBalance: 10,
            finalTransactionId: undefined}
          ])

    if (isLoggedIn) {
      if (!socketOn) {
        let usertoken = currentUser.token;
        socket.auth = { usertoken };
        socket.connect();
        setSocketOn(true);
      }
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      };
      axios.get(`${env.url}/verifytoken`, config).catch(err => {
        dispatch(logout() as any);
      });
      axios
        .get(`${env.url}/listings`, config)
        .then(response => {
          console.log(response.data)
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
    } else {
      if (socketOn) {
        socket.disconnect();
      }
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
    <Container style={{display:"flex", flexDirection: "row"}}>
      <NavBar />
      <Col>
        <Col sm={12} style={{marginTop: "7%", marginLeft: "-5%"}}>
              <Row>
                <h3>
                  <b>Swap Feed</b>
                </h3>
                
                  <Button
                    style={{width: "10em", backgroundColor: "white", borderColor: "#4263EB", color: "#4263EB", marginLeft: "45em"}}
                    onClick={() => {
                      props.history.push("/postad");
                    }}
                  >
                    Post Swap
                  </Button>
              </Row>
              <Row style={{marginTop: "10vh"}}>
                
                <Col>
                  
                  <Row style={{width: "20em", marginLeft: "45rem", marginBottom: "2rem"}}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FiBookmark size={20} style={{color: "#43494f"}} /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="Search Offers"
                        aria-label="Search Offers"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Row>

                  <div className="scrollNoBar" style={{background: "transparent"}}>
                  <Row style={{marginBottom: "-1.2em", marginLeft: "1em"}}>
                    <p style={{color: "#C4C4C4", marginRight: "22em", fontSize: "0.8em"}}>Username</p>
                    <p style={{color: "#C4C4C4", marginRight: "23em", fontSize: "0.8em"}}>Offer</p>
                    <p style={{color: "#C4C4C4", fontSize: "0.8em"}}>Posted Time</p>
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
              </Row>
          
        </Col>
        <Col
          sm={3}
          style={{
            alignItems: "left",
            textAlign: "center",
            marginRight: "-100px"
          }}
        >
          <>
            {isLoggedIn && currentUser.buying.state && (
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
    </Container>
  );
};

export default connect(mapStateToProps)(Home);
