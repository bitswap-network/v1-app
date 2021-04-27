import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { RiUser3Line } from "react-icons/ri";
import { ListingSchema } from "../interfaces";
import styled from "styled-components";
import { connect } from "react-redux";
import StyledContentLoader from "styled-content-loader";
import MD5 from "crypto-js/md5";
import MediaQuery from "react-responsive";
import { loggedInState, userState } from "../../store";
import { useRecoilValue } from "recoil";
import { TransactionSchema } from "../interfaces";
import { FiCodesandbox, FiActivity, FiX } from "react-icons/fi";

interface TxnModal {
  transaction: TransactionSchema;
  open: boolean;
  close(): any;
}

const TransactionModal: React.FC<TxnModal> = (
  { transaction, open, close },
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
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  console.log(transaction);
  return (
    <Modal
      show={open}
      onHide={close}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <FiX
          size={"1rem"}
          onClick={close}
          style={{
            float: "right",
            marginRight: "0.75rem",
            marginTop: "0.5rem",
            color: "#ACB5BD"
          }}
          className="hoverCursor"
        />
        {transaction && (
          <>
            <h4 style={{ marginTop: "1.25rem", marginLeft: "1.2rem" }}>
              <b>Transaction Details</b>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#495057",
                  marginTop: "1rem"
                }}
              >
                ID: {transaction.tx_id}
              </p>
            </h4>

            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#ACB5BD",
                fontSize: "0.7rem",
                marginTop: "1.5rem",
                marginLeft: "0.5rem"
              }}
            >
              <Col sm={4}>
                <Row>TXN TYPE</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.transactiontype}
                  </p>
                </Row>
              </Col>
              <Col sm={5}>
                <Row>AMOUNT</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.bitcloutnanos / 1e9} $BCLT
                  </p>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>STATUS</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.status}
                  </p>
                </Row>
              </Col>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#ACB5BD",
                fontSize: "0.7rem",
                marginTop: "1.5rem",
                marginLeft: "0.5rem"
              }}
            >
              <Col sm={0}>
                <Row>START TIME</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {new Date(transaction.created).toLocaleDateString()}:{" "}
                    {new Date(transaction.created).toLocaleTimeString()}
                  </p>
                </Row>
              </Col>
              <Col>
                {transaction.status === "completed" && (
                  <>
                    <Row> COMPLETED TIME</Row>
                    <Row>
                      <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                        {new Date(transaction.completed).toLocaleDateString()}:{" "}
                        {new Date(transaction.completed).toLocaleTimeString()}
                      </p>
                    </Row>
                  </>
                )}
              </Col>
            </Col>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
