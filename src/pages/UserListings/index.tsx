import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAppSelector } from "../../components/hooks";
import { Container, Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import env from "../../components/data/env.json";
import UserListing from "../../components/UserListing";
import { ListingSchema } from "../../components/interfaces";
import { RootState } from "../../store";
import { FiBookmark } from "react-icons/fi"
import NavBar from "components/NavBar";

const mapStateToProps = (state: RootState) => ({ auth: state.auth });
const UserListings = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [buylistings, setBuyListings] = useState<ListingSchema[]>([]);
  useEffect(() => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${currentUser.token}`,
  //     },
  //   };
  //   axios
  //     .post(
  //       `${env.url}/listings/${currentUser.username}`,
  //       { ongoing: "none" },
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setListings(response.data);
  //       setLoading(false);
  //     });
  //   axios
  //     .post(
  //       `${env.url}/buylistings/${currentUser.username}`,
  //       { ongoing: "none" },
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setBuyListings(response.data);
  //       setLoading(false);
  //     });
    setListings([{  bitCloutSent: true,
      bitcloutTransactionId: 'yessir',
      bitcloutamount: 5,
      buyer: null,
      created: 'yesterday',
      escrowFull: true,
      ethAmount: 10,
      lister: null,
      name: 'vanish',
      processing: true,
      sold: false,
      _id: 'yessir',
      escrowBalance: 10,
      finalTransactionId: 'yes'},
      {  bitCloutSent: true,
        bitcloutTransactionId: 'yessir',
        bitcloutamount: 5,
        buyer: null,
        created: 'yesterday',
        escrowFull: true,
        ethAmount: 10,
        lister: null,
        name: 'vanish',
        processing: true,
        sold: false,
        _id: 'yessir',
        escrowBalance: 10,
        finalTransactionId: 'yes'},
        {  bitCloutSent: true,
          bitcloutTransactionId: 'yessir',
          bitcloutamount: 5,
          buyer: null,
          created: 'yesterday',
          escrowFull: true,
          ethAmount: 10,
          lister: null,
          name: 'vanish',
          processing: true,
          sold: false,
          _id: 'yessir',
          escrowBalance: 10,
          finalTransactionId: 'yes'},
          {  bitCloutSent: true,
            bitcloutTransactionId: 'yessir',
            bitcloutamount: 5,
            buyer: null,
            created: 'yesterday',
            escrowFull: true,
            ethAmount: 10,
            lister: null,
            name: 'vanish',
            processing: true,
            sold: false,
            _id: 'yessir',
            escrowBalance: 10,
            finalTransactionId: 'yes'},
            
    ]);
  }, []);

  const Rows: Function = (groups: any[]): JSX.Element[] =>
    listings.map((listing: any, i: number) => {
      return (
        <>
          {true && (
            <UserListing
              listing={listing}
              index={i}
              history={props.history}
              loading={loading}
              buy={false}
            />
          )}
        </>
      );
    });
  const BuyRows: Function = (groups: any[]): JSX.Element[] =>
    buylistings.map((buylistings: any, i: number) => {
      return (
        <>
          {buylistings && (
            <UserListing
              listing={buylistings}
              index={i}
              history={props.history}
              loading={loading}
              buy={true}
            />
          )}
        </>
      );
    });

  return (
    <Container style={window.visualViewport.width <= 768 ? {marginLeft: 0, marginRight:0,paddingLeft: 0, paddingRight:0, display: "flex", flexDirection: "column"} : {display: "flex", flexDirection: "row",}}>
      <NavBar />
      <Row style={{width: "70em", marginTop: "8%"}}>
        <Col>
          {listings.length == 0 && (
            <h3>
              <b>No Listings</b>
            </h3>
          )}
          {true && listings.length > 0 && (
            <>
              <h3 style={window.visualViewport.width <= 768 ? {marginLeft: "2rem"}:{}}>
                <b>My Listings</b>
              </h3>
              <h4 style={window.visualViewport.width <= 768 ? {marginTop: "1em", marginLeft: "2rem"}: {marginTop: "1em"}}>
                Listing Feed
              </h4>
              <Button
                    style={window.visualViewport.width <= 768 ? {width: "10em", backgroundColor: "white", borderColor: "#4263EB", color: "#4263EB", marginTop: "2%", marginLeft: "2rem"}:{width: "10em", backgroundColor: "white", borderColor: "#4263EB", color: "#4263EB", marginTop: "2%", marginLeft: "55rem"}}
                    onClick={() => {
                      props.history.push("/postad");
                    }}
                  >
                    
                    Post Swap
                  </Button>
              <Row style={window.visualViewport.width <= 768 ? {width: "16em", marginTop: "2em", marginLeft: "2rem"}:{width: "20em", marginLeft: "45rem", marginTop: "2em"}}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FiBookmark size={20} style={{color: "#43494f"}} /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="Search Listings"
                        aria-label="Search Listings"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <p></p>
              </Row>
            
              <div className="scrollNoBar" style={{marginTop: "2em"}}>
              <Row style={{marginBottom: "-1.2em", marginLeft: "2em"}}>
                    <p style={window.visualViewport.width <= 768 ? {color: "#C4C4C4", fontSize: "0.8em", marginRight: "4.5em" }:{color: "#C4C4C4", marginRight: "14em", fontSize: "0.8em"}}>Listing Name</p>
                    <p style={window.visualViewport.width <= 768 ? {color: "#C4C4C4", fontSize: "0.8em"}:{color: "#C4C4C4", marginRight: "23em", fontSize: "0.8em"}}>Offer</p>
                    <p style={window.visualViewport.width <= 768 ? {display: "none"}:{color: "#C4C4C4", fontSize: "0.8em"}}>Posted Time</p>
              </Row>
                <Rows />
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          {isLoggedIn && buylistings.length > 0 && (
            <>
              <h3>
                <b>Your Past Buys</b>
              </h3>
              <div className="scrollNoBar">
                <BuyRows />
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          {isLoggedIn && (
            <Button
            style={{ height: "100%", width: "50%", backgroundColor: "white", borderColor: "#4263EB", color: "#4263EB", marginTop: "2em" }}
              onClick={() => {
                props.history.push("/postad");
                window.location.reload();
              }}
            >
              Post a New Listing
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(UserListings);
