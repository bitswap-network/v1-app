import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";
import { getFontSize } from "../../helpers/styling";
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
  margin-left: 0px;
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
    // <>
    //   <Container>
    //     <MediaQuery query="(max-device-width: 768px)">
    //       <Wrapper
    //         key={index}
    //         style={{ backgroundColor: "transparent", width: "20em" }}
    //       >
    //         <hr></hr>
    //         <Row key={index} className="align-items-center">
    //           <Col style={{ textAlign: "left" }} xs={5}>
    //             <p className="userNameSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.buyer
    //                 ? `${listing.buyer.username}`
    //                 : "No Transactor"}
    //               <br></br>
    //             </p>
    //           </Col>

    //           <Col style={{ textAlign: "left" }} xs={6}>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.bitcloutnanos / 1e9} $BCLT @
    //             </p>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BCLT
    //             </p>
    //           </Col>
    //         </Row>
    //         <Col>
    //           <Col sm={0}>
    //             {/* <Link to={`/listing/${listing._id}`}> */}
    //             <Button
    //               style={{
    //                 width: "10em",
    //                 backgroundColor: "#4263EB",
    //                 marginTop: "1.3em",
    //               }}
    //               onClick={() => {
    //                 // history.push(`/listing/${listing._id}`);
    //                 window.location.replace(`/listing/${listing._id}`);
    //               }}
    //             >
    //               View
    //             </Button>
    //             {/* </Link> */}
    //           </Col>
    //         </Col>
    //       </Wrapper>
    //     </MediaQuery>

    //     <MediaQuery query="(min-device-width: 768px)">
    //       <Wrapper
    //         key={index}
    //         style={{ backgroundColor: "transparent", width: "100em" }}
    //       >
    //         <hr></hr>
    //         <Row key={index} className="align-items-center">
    //           <Col style={{ textAlign: "left" }} sm={2}>
    //             <p className="userNameSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.buyer
    //                 ? `${listing.buyer.username}`
    //                 : "No Transactor"}
    //             </p>
    //           </Col>

    //           <Col style={{ textAlign: "left" }} sm={2}>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.bitcloutnanos / 1e9} $BCLT @
    //             </p>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BCLT
    //             </p>
    //           </Col>
    //           <Col style={{ textAlign: "center" }} sm={1}>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {dateRender(listing.created)}
    //             </p>
    //           </Col>
    //           <Col style={{ textAlign: "center" }} sm={1}>
    //             <p className="detailsSellFeed" style={{ fontSize: "0.9em" }}>
    //               {listing.ongoing ? "In progress" : ""}
    //               {listing.completed.status ? "Completed" : ""}
    //               {!listing.ongoing && !listing.completed.status
    //                 ? "Available"
    //                 : ""}
    //               {}
    //             </p>
    //           </Col>
    //           <Col sm={1}>
    //             <Button
    //               style={{ width: "10em", backgroundColor: "#4263EB" }}
    //               onClick={() => {
    //                 window.location.replace(`/listing/${listing._id}`);
    //               }}
    //             >
    //               View
    //             </Button>
    //           </Col>
    //         </Row>
    //       </Wrapper>
    //     </MediaQuery>
    //   </Container>
    // </>
    <>
      <table style={{ width: "100%", marginTop: "-2%", overflowX: "hidden" }}>
        <tr>
          <td style={{ width: "3%" }}></td>
          <td style={{ fontSize: "0.8rem", width: "25%" }}>
            {listing.buyer ? (
              <>
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
              </>
            ) : (
              "No Transactor"
            )}
          </td>
          <td style={{ fontSize: "0.8rem", width: "30%" }}>
            {listing.bitcloutnanos / 1e9} @{" "}
            {listing.usdamount / (listing.bitcloutnanos / 1e9)}$ / $BCLT
          </td>
          <td style={{ fontSize: "0.8rem", width: "25%" }}>
            {dateRender(listing.created)}
          </td>
          <td>
            <Button
              style={{
                width: "10em",
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
