import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { loggedInState, userState } from "../../store";
import { useRecoilValue } from "recoil";
import { TransactionSchema } from "../interfaces";
import { FiX } from "react-icons/fi";
import config from "../../helpers/config.json";

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
            color: "#ACB5BD",
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
                  marginTop: "1rem",
                }}
              >
                ID:{" "}
                {transaction.tx_id ? (
                  <a
                    href={`https://explorer.bitclout.com/?transaction-id=${transaction.tx_id}&query-node=https:%2F%2Fapi.bitclout.com`}
                    target="_blank"
                  >
                    {transaction.tx_id}
                  </a>
                ) : (
                  `pending`
                )}
              </p>
            </h4>

            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#ACB5BD",
                fontSize: "0.7rem",
                marginTop: "1.5rem",
                marginLeft: "0.5rem",
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
              <Col sm={4}>
                <Row>AMOUNT</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.bitcloutnanos / 1e9} $BCLT
                  </p>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>FEES (nanos)</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.fees ? transaction.fees : "N/A"}
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
                marginLeft: "0.5rem",
              }}
            >
              <Col sm={4}>
                <Row>STATUS</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {transaction.status}
                  </p>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>START TIME</Row>
                <Row>
                  <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                    {new Date(transaction.created).toLocaleDateString()}:{" "}
                    {new Date(transaction.created).toLocaleTimeString()}
                  </p>
                </Row>
              </Col>
              {transaction.status === "completed" ? (
                <>
                  <Col sm={4}>
                    <Row> COMPLETED TIME</Row>
                    <Row>
                      <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                        {new Date(transaction.completed).toLocaleDateString()}:{" "}
                        {new Date(transaction.completed).toLocaleTimeString()}
                      </p>
                    </Row>
                  </Col>
                </>
              ) : (
                <>
                  <Col sm={4}>
                    <Row> COMPLETED TIME</Row>
                    <Row>
                      <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                        pending
                      </p>
                    </Row>
                  </Col>
                </>
              )}
            </Col>
            {transaction.transactiontype === "deposit" &&
              transaction.status === "pending" && (
                <Col style={{ textAlign: "center", marginTop: "5%" }}>
                  <p style={{ fontSize: "0.7rem", marginBottom: "0%" }}>
                    If you haven't already, send the required amount to:
                  </p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "#495057",
                      fontWeight: "bold",
                    }}
                  >
                    {config.bclt_address}
                  </p>
                  <p style={{ fontSize: "0.7rem", marginBottom: "2%" }}>
                    Do NOT send duplicate deposits.
                  </p>{" "}
                  <p style={{ fontSize: "0.7rem", marginBottom: "0%" }}>
                    Contact{" "}
                    <a href="mailto:support@bitswap.network" target="_blank">
                      support@bitswap.network
                    </a>{" "}
                    if your deposit doesnt show up.
                  </p>
                </Col>
              )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
