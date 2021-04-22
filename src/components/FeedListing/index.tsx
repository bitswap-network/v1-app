import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { RiUser3Line } from "react-icons/ri";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";
import { connect } from "react-redux";
import StyledContentLoader from "styled-content-loader";
import MD5 from "crypto-js/md5";
import MediaQuery from "react-responsive";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import BuyModal from "../modalBuy";
const Wrapper = styled.section`
  background-color: #f8f9fa;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
`;

interface FeedListing {
  listing: ListingSchema;
  index: number;
  price: number;
  loading: boolean;
  history: any;
}

const Listing: React.FC<FeedListing> = (
  { listing, index, price, loading, history },
  props: any
) => {
  const state = { modalOpen: false };
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [modalOpen, setOpenModal] = useState(false);
  console.log(listing);
  const viewCheck = () => {
    if (listing.ongoing) {
      if (user.username === listing.buyer.username) {
        return false;
      } else {
        return true;
      }
    }
    if (false) {
      return true;
    } else {
      return false;
    }
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const dateRender = (date: Date) => {
    let diffTime =
      Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;
    if (diffTime < 120) {
      return "<1 minute ago";
    } else if (diffTime > 120 && diffTime < 3600) {
      return `${(diffTime / 60).toFixed(0)} minutes ago`;
    } else if (diffTime > 3600 && diffTime < 86400) {
      return `${(diffTime / 3600).toFixed(0)} hour${
        (diffTime / 3600).toFixed(0) === "1" ? "" : "s"
      } ago`;
    } else if (diffTime > 86400) {
      return `${(diffTime / 86400).toFixed(0)} day${
        (diffTime / 86400).toFixed(0) === "1" ? "" : "s"
      } ago`;
    }
  };
  return (
    <>
      <BuyModal listing={listing} open={modalOpen} close={closeModal} />
      <StyledContentLoader isLoading={false}>
        <hr></hr>
        <MediaQuery query="(max-device-width: 768px)">
          <Row key={index} className="align-items-center">
            <Col
              style={{ marginRight: "0.3rem", marginLeft: "-0.3rem" }}
              xs={2}
            >
              <img
                src={`https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`}
                alt="profile"
                style={{
                  borderRadius: "60px",
                  height: "auto",
                  width: "5vh",
                  marginLeft: "1.2em",
                  marginRight: "1.3rem",
                }}
              />
            </Col>
            <Col xs={4}>
              <p style={{ fontSize: "0.8rem" }} className="userNameSellFeed">
                {"@"}
                {listing.seller.username}
              </p>
            </Col>

            <Col xs={6}>
              <p style={{ fontSize: "0.8rem" }} className="detailsSellFeed">
                {listing.bitcloutnanos / 1e9} @{" "}
                {(listing.usdamount / (listing.bitcloutnanos / 1e9)).toFixed(2)}{" "}
                $USD
              </p>
            </Col>

            <Col style={{ marginLeft: "5rem", marginTop: "3%" }}>
              <Button
                style={{
                  width: "10em",
                  height: "2.5rem",
                  backgroundColor: "#4263EB",
                  borderColor: "white",
                }}
                onClick={() => {
                  state.modalOpen = true;
                }}
                disabled={listing.seller._id === user._id}
              >
                Buy
              </Button>
            </Col>
          </Row>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 768px)">
          <Wrapper
            key={index}
            style={{ backgroundColor: "transparent", width: "100em" }}
          >
            <Row key={index} className="align-items-center">
              <Col sm={0.2}>
                <img
                  alt="profile"
                  src={`https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`}
                  style={{
                    borderRadius: "60px",
                    height: "auto",
                    width: "5vh",
                    marginLeft: "1.2em",
                    marginRight: "1.3rem",
                  }}
                />
              </Col>
              <Col
                style={{ textAlign: "left" }}
                sm={window.visualViewport.width <= 1800 ? 1 : 2}
              >
                <p className="userNameSellFeed">
                  {"@"}
                  {listing.seller.username}
                </p>
              </Col>

              <Col
                style={{ textAlign: "left" }}
                sm={window.visualViewport.width <= 1800 ? 1 : 2}
              >
                <p className="detailsSellFeed">
                  {listing.bitcloutnanos / 1e9} @{" "}
                  {(listing.usdamount / (listing.bitcloutnanos / 1e9)).toFixed(
                    2
                  )}{" "}
                  $USD
                </p>
              </Col>
              <Col style={{ textAlign: "center", marginRight: "5em" }} sm={2}>
                <p className="detailsSellFeed">{dateRender(listing.created)}</p>
              </Col>
              <Col sm={0} style={{ marginLeft: "-4em" }}>
                <Button
                  style={{
                    width: "7em",
                    backgroundColor: "#4263EB",
                    borderColor: "white",
                  }}
                  onClick={() => {
                    // history.push(`/buy/${listing._id}`);
                    setOpenModal(true);
                  }}
                  disabled={listing.seller._id === user._id}
                >
                  Buy
                </Button>
              </Col>
            </Row>
          </Wrapper>
          {/* <ModaltoBuy
            show={state.modalOpen}
            onHide={() => console.log("hehy")}
          /> */}
        </MediaQuery>
      </StyledContentLoader>
    </>
  );
};
export default Listing;
