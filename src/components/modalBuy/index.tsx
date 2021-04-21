import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { RiUser3Line } from "react-icons/ri";
import { ListingSchema } from "../interfaces";
import { loggedInState, userState } from "../../store";
import { useRecoilValue } from "recoil";
import {
  FiCodesandbox,
  FiActivity,
  FiX,
  FiDollarSign,
  FiBox
} from "react-icons/fi";

interface ListingModal {
  listing: ListingSchema;
  open: boolean;
  close(): any;
}

const BuyModal: React.FC<ListingModal> = (
  { listing, open, close },
  props: any
) => {
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
    <Modal show={open} onHide={close}>
      <Modal.Body>
        <FiX
          className="hoverCursor"
          size={"1rem"}
          style={{
            float: "right",
            marginRight: "0.75rem",
            marginTop: "0.5rem",
            color: "#ACB5BD"
          }}
          onClick={close}
        />
        <h3 style={{ marginTop: "1.7rem", marginLeft: "2rem" }}>
          <b>Confirm Payment</b>
        </h3>
        <p
          style={{
            color: "#212429",
            fontSize: "0.7rem",
            marginLeft: "2rem",
            marginTop: "0.75rem"
          }}
        >
          By clicking confirm, you will agree to purchase the following
          BitClout.
        </p>
        <Col
          style={{
            display: "flex",
            flexDirection: "row",
            color: "#ACB5BD",
            fontSize: "0.7rem",
            marginTop: "1.5rem",
            justifyContent: "center"
          }}
        >
          <Col sm={4}>
            <Row style={{ justifyContent: "center" }}>
              <FiDollarSign
                size={"1.5rem"}
                style={{ color: "#212429", marginTop: "0.4rem" }}
              />
              <p style={{ color: "#212429", fontSize: "1.5rem" }}>
                {listing.usdamount}
              </p>
              <p
                style={{
                  color: "#212429",
                  fontSize: "0.9rem",
                  marginTop: "0.7rem",
                  marginLeft: "0.5rem"
                }}
              >
                USD
              </p>
            </Row>
          </Col>
          <Col sm={1}>
            <p
              style={{
                color: "#212429",
                fontSize: "0.9rem",
                marginTop: "0.7rem"
              }}
            >
              <b>FOR</b>
            </p>{" "}
          </Col>
          <Col sm={5}>
            <Row style={{ justifyContent: "center" }}>
              <FiBox
                size={"1.5rem"}
                style={{
                  color: "#212429",
                  marginTop: "0.4rem",
                  marginLeft: "1rem"
                }}
              />
              <p style={{ color: "#212429", fontSize: "1.5rem" }}>
                {(listing.bitcloutnanos / 1e9).toFixed(2)}
              </p>
              <p
                style={{
                  color: "#212429",
                  fontSize: "0.9rem",
                  marginTop: "0.7rem",
                  marginLeft: "0.5rem"
                }}
              >
                BTCLT
              </p>
            </Row>
          </Col>
        </Col>
        <Col
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Button
            style={{ width: "20rem", marginTop: "3%", marginBottom: "4%" }}
          >
            Confirm Swap
          </Button>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default BuyModal;
