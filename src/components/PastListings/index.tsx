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

const PastTransactions: React.FC<FeedListing> = (
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
                Buyer
              </td>

          

              <td
                style={{
                  paddingBottom: "5%",
                  fontSize: getFontSize(0.5, 8),
                  color: "#C4C4C4",
                }}
              >
                Seller
              </td>

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
                Completed Time
              </td>
            </tr>
            <tr>
              <td style={{ width: "16%" }}>
                {"@vansh"}
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
              <td style={{ fontSize: getFontSize(0.5, 8), width: "30%" }}>
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
      
            </tr>
          </table>
          <hr style={{ marginTop: "3%", width: "150%" }}></hr>
        </Wrapper>

      </StyledContentLoader>
    </>
  );
};
export default PastTransactions;
