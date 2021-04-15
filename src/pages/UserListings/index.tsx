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

const mapStateToProps = (state: RootState) => ({ auth: state.auth });
const UserListings = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [buylistings, setBuyListings] = useState<ListingSchema[]>([]);
  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .post(
        `${env.url}/listings/${currentUser.username}`,
        { ongoing: "none" },
        config
      )
      .then((response) => {
        console.log(response.data);
        setListings(response.data);
        setLoading(false);
      });
    axios
      .post(
        `${env.url}/buylistings/${currentUser.username}`,
        { ongoing: "none" },
        config
      )
      .then((response) => {
        console.log(response.data);
        setBuyListings(response.data);
        setLoading(false);
      });
  }, []);

  const Rows: Function = (groups: any[]): JSX.Element[] =>
    listings.map((listing: any, i: number) => {
      return (
        <>
          {listing && (
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
    <Container className="p-3" style={{ marginTop: "6%", marginLeft: "5%" }}>
      <Row className="align-items-center"  style={{width: "70em"}}>
        <Col>
          {listings.length == 0 && (
            <h3>
              <b>No Listings</b>
            </h3>
          )}
          {isLoggedIn && listings.length > 0 && (
            <>
              <h3>
                <b>My Listings</b>
              </h3>
              <h4 style={{marginTop: "1em"}}>
                Listing Feed
              </h4>
              <Row style={{width: "20em", marginLeft: "45rem", marginTop: "2em"}}>
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
              <Row style={{marginBottom: "-1.2em", marginLeft: "1em"}}>
                    <p style={{color: "#C4C4C4", marginRight: "14em", fontSize: "0.8em"}}>Listing Name</p>
                    <p style={{color: "#C4C4C4", marginRight: "23em", fontSize: "0.8em"}}>Offer</p>
                    <p style={{color: "#C4C4C4", fontSize: "0.8em"}}>Posted Time</p>
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
