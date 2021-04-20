import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";

import { connect } from "react-redux";
import env from "../data/env.json";
import StyledContentLoader from "styled-content-loader";
import MediaQuery from "react-responsive";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
const Wrapper = styled.section`
  background-color: #f8f9fa;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
  align-items: center;
  text-align: center;
`;

interface UserListing {
  listing: ListingSchema;
  index: number;
  history: any;
  loading: boolean;
  buy: boolean;
}

const Listing: React.FC<UserListing> = (
  { listing, index, history, loading, buy },
  props: any
) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  console.log(props, listing);
  const dateRender = (date: Date) => {
    let diffTime =
      Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;
    if (diffTime < 60) {
      return "<1 minute ago";
    } else if (diffTime > 60 && diffTime < 3600) {
      return `${diffTime / 60} minutes ago`;
    } else if (diffTime > 3600 && diffTime < 86400) {
      return `${(diffTime / 3600).toFixed(0)} hours ago`;
    } else if (diffTime > 86400) {
      return `${(diffTime / 86400).toFixed(0)} days ago`;
    }
  };
  return (
    <>
      <Container>
        <MediaQuery query="(max-device-width: 768px)">
          <Wrapper
            key={index}
            style={{ backgroundColor: "transparent", width: "20em" }}
          >
            <hr></hr>
            <Row key={index} className="align-items-center">
              <Col style={{ textAlign: "left" }} xs={5}>
                <p className="userNameSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.buyer
                    ? `${listing.buyer.username}`
                    : "No Transactor"}
                  <br></br>
                </p>
              </Col>

              <Col style={{ textAlign: "left" }} xs={6}>
                <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.bitcloutnanos / 1e9} $BTCLT @
                </p>
                <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BTCLT
                </p>
              </Col>
            </Row>
            <Col>
              <Col sm={0}>
                <Button
                  style={{
                    width: "10em",
                    backgroundColor: "#4263EB",
                    marginTop: "1.3em",
                  }}
                  onClick={() => {
                    history.push(`/listing/${listing._id}`);
                  }}
                >
                  View
                </Button>
              </Col>
            </Col>
          </Wrapper>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 768px)">
          <Wrapper
            key={index}
            style={{ backgroundColor: "transparent", width: "100em" }}
          >
            <hr></hr>
            <Row key={index} className="align-items-center">
              <Col style={{ textAlign: "left" }} sm={2}>
                <p className="userNameSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.buyer
                    ? `${listing.buyer.username}`
                    : "No Transactor"}
                </p>
              </Col>

              <Col style={{ textAlign: "left" }} sm={2}>
                <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.bitcloutnanos / 1e9} $BTCLT @
                </p>
                <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
                  {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BTCLT
                </p>
              </Col>
              <Col style={{ textAlign: "center" }} sm={2}>
                <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
                  {dateRender(listing.created)}
                </p>
              </Col>
              <Col sm={1}>
                <Button
                  style={{ width: "10em", backgroundColor: "#4263EB" }}
                  onClick={() => {
                    history.push(`/listing/${listing._id}`);
                  }}
                >
                  View
                </Button>
              </Col>
            </Row>
          </Wrapper>
        </MediaQuery>
      </Container>
    </>
  );
};
export default Listing;
