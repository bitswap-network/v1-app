import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { Redirect } from "react-router-dom";
import MD5 from "crypto-js/md5";
import StyledContentLoader from "styled-content-loader";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
// const Web3 = require("web3");

const Admin = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [email, setEmail] = useState("  ");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (isLoggedIn && !currentUser.admin) {
    return <Redirect to="/" />;
  }

  return (
    <StyledContentLoader isLoading={loading}>
      <Container
        className="p-3"
        style={{ textAlign: "center", marginTop: "3%" }}
      >
        <Row
          className="align-items-center"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <Col>
            <h3>
              <b>Admin Panel</b>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </StyledContentLoader>
  );
};
export default Admin;
