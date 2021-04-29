import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { getFontSize } from "../../helpers/styling";

const Wrapper = styled.section`
  background-color: #f8f9fa;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 0px;
  align-items: center;
  text-align: center;
`;

interface UserListing {
  listing: ListingSchema;
  index: number;
  buy: boolean;
  history: any;
  loading: boolean;
}

const Listing: React.FC<UserListing> = (
  { listing, index, buy, history, loading },
  props: any
) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const dateRender = (date: Date) => {
    let diffTime =
      Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;
    if (diffTime < 60) {
      return "<1 minute ago";
    } else if (diffTime > 60 && diffTime < 3600) {
      return `${(diffTime / 60).toFixed(0)} minutes ago`;
    } else if (diffTime > 3600 && diffTime < 86400) {
      return `${(diffTime / 3600).toFixed(0)} hours ago`;
    } else if (diffTime > 86400) {
      return `${(diffTime / 86400).toFixed(0)} days ago`;
    }
  };
  return (
    <>
      <table
        style={
          window.visualViewport.width > 768
            ? { width: "100%", marginTop: "-2%", overflowX: "hidden" }
            : { width: "150%", marginTop: "1%" }
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
          <td style={{ fontSize: "0.8rem", width: "25%" }}>
            {listing.buyer ? (
              <>
                {buy ? (
                  <Col>
                    <img
                      src={listing.seller.profilepicture}
                      alt="profile"
                      style={{
                        borderRadius: "60px",
                        height: "auto",
                        width: getFontSize(2.5, 10),
                      }}
                    />
                    <a href={`/profile/${listing.seller.username}`}>
                      <p>${listing.seller.username}</p>
                    </a>
                  </Col>
                ) : (
                  <Col>
                    <img
                      src={listing.buyer.profilepicture}
                      alt="profile"
                      style={{
                        borderRadius: "60px",
                        height: "auto",
                        width: getFontSize(2.5, 10),
                      }}
                    />
                    <a href={`/profile/${listing.buyer.username}`}>
                      <p>${listing.buyer.username}</p>
                    </a>
                  </Col>
                )}
              </>
            ) : (
              "Awaiting Buy"
            )}
          </td>
          <td style={{ fontSize: getFontSize(0.5, 8), width: "35%" }}>
            {listing.bitcloutnanos / 1e9} @{" "}
            {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BCLT
          </td>
          <td style={{ fontSize: getFontSize(0.5, 8), width: "30%" }}>
            {dateRender(listing.created)}
          </td>
          <td>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#4263EB",
              }}
              onClick={() => {
                // history.push(`/listing/${listing._id}`);
                window.location.assign(`/listing/${listing._id}`);
              }}
            >
              View
            </Button>
          </td>
        </tr>
      </table>
      <hr style={{ marginTop: "3%", marginBottom: "4.5%" }}></hr>
    </>
  );
};
export default Listing;
