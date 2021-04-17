import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ListingSchema } from "../interfaces";
import { useAppSelector } from "../../components/hooks";
import styled from "styled-components";
import { RootState } from "../../store";
import { connect } from "react-redux";
import env from "../data/env.json";
import StyledContentLoader from "styled-content-loader";

const mapStateToProps = (state: RootState) => ({ auth: state.auth });
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
  const { user: currentUser } = useAppSelector((state) => state.auth);
  console.log(props, listing);

  return (
    // <>
    //   <StyledContentLoader isLoading={loading}>
    //     <Wrapper key={index}>
    //       <Row>
    //         <Col>
    //           <h3>
    //             <b>{listing.name}</b>
    //           </h3>
    //         </Col>
    //       </Row>
    //       <Row className="align-items-center">
    //         <p className="detailsSellFeed">
    //           {listing.bitcloutamount} $Bitclout for {listing.ethAmount} $ETH
    //         </p>
    //       </Row>
    //       <Row style={{ marginTop: "5px" }}>
    //         {!listing.sold && (
    //           <Col>
    //             <Button
    //               onClick={() => {
    //                 let config = {
    //                   headers: {
    //                     Authorization: `Bearer ${currentUser.token}`,
    //                   },
    //                 };
    //                 axios
    //                   .post(
    //                     `${env.url}/deleteListing`,
    //                     {
    //                       id: listing._id,
    //                       username: listing.lister.username,
    //                     },
    //                     config
    //                   )
    //                   .then((response) => {
    //                     console.log(response);
    //                     window.location.reload();
    //                   })
    //                   .catch((error) => console.log(error));
    //               }}
    //               disabled={listing.processing}
    //             >
    //               Delete
    //             </Button>
    //           </Col>
    //         )}
    //         <Col>
    //           <Button
    //             onClick={() => {
    //               history.push(`/manage/${listing._id}`);
    //             }}
    //           >
    //             View
    //           </Button>
    //         </Col>
    //       </Row>
    //       {listing.processing && !listing.sold && <h5>Swap Ongoing</h5>}
    //       <div style={{ marginTop: "10px" }}>
    //         {buy && <h5>Swapped from {listing.lister.username}</h5>}
    //         {!buy && listing.buyer && <h5>Sold to {listing.buyer.username}</h5>}
    //       </div>
    //     </Wrapper>
    //   </StyledContentLoader>
    // </>
    <>
      <StyledContentLoader isLoading={loading} >
        <hr></hr>
        <Wrapper key={index} style={{ backgroundColor: "transparent",width: "100em"}}>
          <Row key={index} className="align-items-center" >
            
            <Col style={{ textAlign: "left" }} sm={2}>
              <p className="userNameSellFeed" style={{fontSize: "0.9em"}}>{listing.name}</p>
            </Col>
            
            <Col style={{ textAlign: "left",  }} sm={2} >
              <p className="detailsSellFeed" style={{fontSize: "0.9em"}}>
              {listing.bitcloutamount} $Bitclout for {listing.ethAmount} $ETH
              </p>
            </Col>
            <Col style={{ textAlign: "center"}} sm={2}>
              <p className="detailsSellFeed" style={{fontSize: "0.9em"}}>
                {"<1 minute ago"}
              </p>
            </Col>
            <Col sm={1}>
              <Button
                style={{width: "12em", backgroundColor: "#4263EB"}}
                onClick={() => {
                  // history.push(`/buy/${listing._id}`);
                }}
              >
                Delete Offer
              </Button>
            </Col>
          </Row>
          {listing.processing && (
            <h5>Swap Ongoing w/ {"sigil"}</h5>
          )}
        </Wrapper>
       
      </StyledContentLoader>
    </>
  );
};
export default connect(mapStateToProps)(Listing);
