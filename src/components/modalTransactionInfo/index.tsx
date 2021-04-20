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
  // const [openModal, setOpenModal] = useState(open);
  // console.log(open, openModal);
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  return (
    <Modal show={open} onHide={close}>
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
        />
        <h4 style={{ marginTop: "1.25rem", marginLeft: "1.2rem" }}>
          <b>Transaction Details</b>
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
            <Row>BUYER</Row>
            <Row>
              <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                @john.smith
              </p>
            </Row>
          </Col>
          <Col sm={5}>
            <Row>OFFER</Row>
            <Row>
              <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                40 @ $135.00 USD
              </p>
            </Row>
          </Col>
          <Col sm={0}>
            <Row>TIME</Row>
            <Row>
              <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                1 minute ago
              </p>
            </Row>
          </Col>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
