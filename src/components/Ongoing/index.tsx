import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ListingSchema } from "../interfaces";
import env from "../../components/data/env.json";

interface OngoingType {
  listings: ListingSchema[];
  history: any;
}
const Ongoing: React.FC<OngoingType> = ({ listings, history }, props: any) => {
  return (
    <>
      <Container
        style={{ flexDirection: "row", marginTop: "5px", textAlign: "center" }}
      >
        {listings.map((listing: ListingSchema) => (
          <>
            <Row
              style={{
                backgroundColor: "#f8f9fa",
                padding: "5%",
                borderRadius: "10px",
                textAlign: "center",
                marginTop: "4%",
                marginBottom: "4%",
              }}
            >
              <Col>
                <h6>
                  <b>{listing.name}</b>
                </h6>
                <h6>{listing.buyer.username}</h6>
                <Button
                  onClick={() => {
                    history.push(`/manage/${listing._id}`);
                  }}
                >
                  View
                </Button>
              </Col>
            </Row>
          </>
        ))}
      </Container>
    </>
  );
};
export default Ongoing;
