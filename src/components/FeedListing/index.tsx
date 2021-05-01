import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";
import { connect } from "react-redux";
import StyledContentLoader from "styled-content-loader";
import MD5 from "crypto-js/md5";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import BuyModal from "../modalBuy";
import ErrorModal from "../modalError";
import { getFontSize } from "../../helpers/styling";
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
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [modalOpen, setOpenModal] = useState(false);
  const [errorOpen, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const closeError = () => {
    setError(false);
  };
  // console.log(listing);

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
      <ErrorModal open={errorOpen} close={closeError} error={errorMessage} />
      <BuyModal listing={listing} open={modalOpen} close={closeModal} />
      <StyledContentLoader isLoading={false}>
        <Wrapper key={index} style={{ backgroundColor: "transparent" }}>
          <table
            style={
              window.visualViewport.width > 768
                ? { width: "110%", marginTop: "-3%", overflowX: "hidden" }
                : { width: "150%", marginTop: "-6%", overflowX: "visible" }
            }
          >
            <tr style={index == 0 ? {} : { display: "none" }}>
              <td
                style={{
                  paddingBottom: "5%",
                  fontSize: getFontSize(0.5, 8),
                  color: "#C4C4C4",
                }}
              >
                Username
              </td>

              <td
                style={{
                  paddingBottom: "5%",
                  fontSize: getFontSize(0.5, 8),
                  color: "#C4C4C4",
                }}
              ></td>

              <td
                style={{
                  paddingBottom: "5%",
                  fontSize: getFontSize(0.5, 8),
                  color: "#C4C4C4",
                }}
              >
                Offer
              </td>

              <td
                style={{
                  paddingBottom: "5%",
                  fontSize: getFontSize(0.5, 8),
                  color: "#C4C4C4",
                }}
              >
                Posted Time
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%" }}>
                <img
                  src={listing.seller.profilepicture}
                  alt="profile"
                  style={{
                    borderRadius: "60px",
                    height: "auto",
                    width: getFontSize(2.5, 10),
                    maxHeight: getFontSize(2.5, 10),
                  }}
                />
              </td>
              <td style={{ fontSize: getFontSize(0.5, 8), width: "20%" }}>
                <a
                  style={{ color: "black" }}
                  href={`/profile/${listing.seller.username}`}
                >
                  @
                  {listing.seller.username.length > 12
                    ? `${listing.seller.username.substring(0, 12)}...`
                    : listing.seller.username}
                  {listing.seller.bitcloutverified && (
                    <FaCheckCircle
                      color="#0059f7"
                      fontSize="1.0rem"
                      style={{ marginLeft: "3px" }}
                    />
                  )}
                </a>
              </td>
              <td style={{ fontSize: getFontSize(0.5, 8), width: "26%" }}>
                <b>
                  {listing.bitcloutnanos / 1e9} @{" "}
                  {(listing.usdamount / (listing.bitcloutnanos / 1e9)).toFixed(
                    2
                  )}{" "}
                </b>
                $USD
              </td>
              <td style={{ fontSize: getFontSize(0.5, 8), width: "23%" }}>
                {dateRender(listing.created)}
              </td>
              <Button
                style={{
                  width: getFontSize(6, 15),
                  height: getFontSize(
                    2.5,
                    window.visualViewport.width < 768 ? 13 : 2
                  ),
                  backgroundColor: "#4263EB",
                  borderColor: "white",
                  fontSize: getFontSize(0.8, 3),
                  textAlign: "center",
                  alignItems: "center",
                  borderRadius: "50px",
                }}
                onClick={() => {
                  if (isLoggedIn) {
                    setOpenModal(true);
                  } else {
                    setErrorMessage("You must be logged in to buy listings.");
                    setError(true);
                  }
                }}
                disabled={isLoggedIn ? listing.seller._id === user._id : false}
              >
                Buy
              </Button>
            </tr>
          </table>
          <hr style={{ marginTop: "3%", width: "150%" }}></hr>
        </Wrapper>
        {/* <MediaQuery query="(max-device-width: 768px)">
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
                  if (isLoggedIn) {
                    setOpenModal(true);
                  } else {
                    setErrorMessage("You must be logged in to buy listings.");
                    setError(true);
                  }
                }}
                disabled={isLoggedIn ? listing.seller._id === user._id : false}
              >
                Buy
              </Button>
            </Col>
          </Row>
        </MediaQuery> */}

        {/* <MediaQuery query="(min-device-width: 768px)">
          <Wrapper
            key={index}
            style={{ backgroundColor: "transparent", width: "100em" }}
          >
            <Row key={index} className="align-items-center">
              <Col sm={0.2}>
                <img
                  alt="profile"
                  src={
                    listing.seller.profilepicture
                      ? listing.seller.profilepicture
                      : `https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`
                  }
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
                    if (isLoggedIn) {
                      setOpenModal(true);
                    } else {
                      setErrorMessage("You must be logged in to buy listings.");
                      setError(true);
                    }
                  }}
                  disabled={
                    isLoggedIn ? listing.seller._id === user._id : false
                  }
                >
                  Buy
                </Button>
              </Col>
            </Row>
          </Wrapper>

        </MediaQuery> */}
      </StyledContentLoader>
    </>
  );
};
export default Listing;
