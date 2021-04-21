import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const OngoingItem = (props: any) => {
  return (
    <>
      <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
        <Col>
          <p style={{ color: "#495057" }}>
            {props.bitcloutnanos / 1e9} BTCLT @ ${props.usdamount}
          </p>
        </Col>
        <Col>
          <p
            style={{ color: "#4263EB", fontSize: "1rem" }}
            onClick={() =>
              window.location.replace(`/listing/${props.listingid}`)
            }
          >
            View →
          </p>
        </Col>
      </Row>
      <Row>
        <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
      </Row>
    </>
  );
};
export default OngoingItem;
