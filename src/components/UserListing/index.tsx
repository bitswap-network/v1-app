import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ListingSchema } from "../interfaces";
import { useAppSelector } from "../../components/hooks";
import styled from "styled-components";
import { RootState } from "../../store";
import { connect } from "react-redux";
import env from "../data/env.json";
import StyledContentLoader from "styled-content-loader";
import MediaQuery from 'react-responsive';


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
 
    <>
      <Container >
        <MediaQuery query="(max-device-width: 768px)">
        <Wrapper key={index} style={{ backgroundColor: "transparent", width: "20em"}}>
          <hr></hr>
          <Row key={index} className="align-items-center" >
            
            <Col style={{ textAlign: "left" }} xs={5}>
              <p className="userNameSellFeed" style={{fontSize: "0.9em"}}>{listing.name}<br></br>{"listing"}</p>
            </Col>
            
            <Col style={{ textAlign: "left",  }} xs={6} >
              <p className="detailsSellFeed" style={{fontSize: "0.9em"}}>
              {listing.bitcloutamount} $Bitclout for {listing.ethAmount} $ETH
              </p>
            </Col>
          </Row>
          <Col>
         
            <Col sm={0}>
              <Button
                style={{width: "12em", backgroundColor: "#4263EB", marginTop: "1.3em"}}
                onClick={() => {
                  // history.push(`/buy/${listing._id}`);
                }}
              >
                Delete Offer
              </Button>
            </Col>
          </Col>
      
        </Wrapper>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 768px)">
        <Wrapper key={index} style={{ backgroundColor: "transparent",width: "100em"}}>
          <hr></hr>
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
      
        </Wrapper>
        </MediaQuery>
        
       
      </Container>
    </>
  );
};
export default connect(mapStateToProps)(Listing);
