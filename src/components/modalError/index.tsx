import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { RiUser3Line } from "react-icons/ri";
import { ListingSchema } from "../interfaces";
import { loggedInState, userState } from "../../store";
import { useRecoilValue } from "recoil";
import { buyListing } from "../../services/listings";
import { useUser } from "../hooks";

import {
  FiXCircle, FiX
} from "react-icons/fi";

interface ErrorModal {
  open: boolean;
  close(): any;
}

const ModalError: React.FC<ErrorModal> = ({ open, close }, props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);


  return (
    <Modal show={open} onHide={close} style={{  display:'flex', margin: 'auto' }}  aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Col style={{textAlign: "right"}}>
        <FiX
          className="hoverCursor"
          size={"1rem"}
          style={{
            marginTop: "1%",
            color: "#ACB5BD",
          }}
          onClick={close}
        />
        </Col>
        <Col style={{textAlign: "center"}}>
          <FiXCircle color={"#F03D3E"} size={'3rem'} />
        </Col>
        <Col style={{textAlign: "center", marginTop: "3%"}}>
          <p style={{fontSize: "1rem", color: "#ACB5BD"}}>Looks like something went wrong. Please refresh the page or contact us at admin@bitswap.ca</p>
        </Col>
        <Col>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ModalError;
