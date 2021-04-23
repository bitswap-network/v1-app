import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { Redirect } from "react-router-dom";
import MD5 from "crypto-js/md5";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { updateProfile, updatePassword } from "../../services/users";
import Cropper from "react-easy-crop";
import { useUser } from "components/hooks";
import { FaCheckCircle } from "react-icons/fa";
import { ImKey } from "react-icons/im";

const EditProfile = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [formUpdated, setFormUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const { userData, isLoading, isError } = useUser(user?.token);
  const [error, setError] = useState({
    name: false,
    email: false,
    ethereumaddress: false,
    password: false,
    newPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username,
    email: user.email,
    ethereumaddress: user.ethereumaddress,
    password: "",
    newPassword: "",
  });
  const valerrorHandler = () => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setError({
      ...error,
      name: form.name.length < 1 ? true : false,
      email: !regEmail.test(form.email) ? true : false,
      ethereumaddress: form.ethereumaddress.length < 1 ? true : false,
    });

    if (form.email.length < 1 || form.ethereumaddress.length < 1) {
      return false;
    } else {
      return true;
    }
  };
  const passerrorHandler = () => {
    setError({
      ...error,
      password:
        form.password.length < 1 && form.newPassword.length > 1 ? true : false,
      newPassword:
        form.newPassword.length < 1 && form.password.length > 1 ? true : false,
    });

    if (
      (form.password.length < 1 && form.newPassword.length > 1) ||
      (form.password.length > 1 && form.newPassword.length < 1)
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleNameChange = (e: any) => {
    setFormUpdated(true);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      email: false,
      ethereumaddress: false,
    });
  };
  const handlePassChange = (e: any) => {
    setPasswordUpdated(true);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      password: false,
      newPassword: false,
    });
  };

  const handlePost = () => {
    if (valerrorHandler()) {
      setLoading(true);
      updateProfile(form.username, form.email, form.ethereumaddress, user.token)
        .then((response) => {
          setLoading(false);
          setSuccessful(true);
          setFormUpdated(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          // Add error message in UI
          setLoading(false);
        });
    }
  };

  const handlePass = () => {
    if (passerrorHandler()) {
      setLoading(true);
      updatePassword(form.password, form.newPassword, user.token)
        .then((response) => {
          setLoading(false);
          setSuccessful(true);
          setPasswordUpdated(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          // Add error message in UI
          setLoading(false);
        });
    }
  };

  return (
    <Container
      style={
        window.innerWidth <= 768
          ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
          : { display: "flex", flexDirection: "row", marginLeft: "1.3rem" }
      }
    >
      <NavBar />
      <>
        <Container
          style={
            window.innerWidth <= 768
              ? { marginTop: "2rem" }
              : {
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                }
          }
        >
          <div
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              padding: "2%",
              borderRadius: "5px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <h3
                  style={window.innerWidth <= 768 ? { marginTop: "1em" } : {}}
                >
                  <a href={"https://bitclout.com/u/" + user.username}>
                    <b>@{user.username}</b>{" "}
                    {user.bitcloutverified && (
                      <FaCheckCircle color="#0059f7" fontSize="1.5rem" />
                    )}
                  </a>
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0",
                    marginBottom: "0.5rem",
                  }}
                >
                  {user.description}
                </p>
                <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                  <ImKey /> {user.bitcloutpubkey}
                </p>
                <Row>
                  <Col>
                    <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                      <b>BitClout account verification: {userData.verified}</b>
                    </p>
                  </Col>
                  <Col>
                    <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                      <b>
                        {userData.emailverified
                          ? "Email Verified"
                          : "Email Pending Verification"}
                      </b>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={window.visualViewport.width >= 1600 ? 3 : 2}>
                <img
                  src={
                    user.profilepicture
                      ? user.profilepicture
                      : `https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`
                  }
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>

          <Row
            style={{ flexDirection: "row", display: "flex", marginTop: "5%" }}
          >
            <Col>
              <Row style={{ marginBottom: "30px" }}>
                <Col>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={form.email}
                    error={error.email}
                    onChange={handleNameChange}
                    fullWidth={true}
                  />
                </Col>
              </Row>
              {/* <Row
                className="align-items-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Col>
                  <TextField
                    id="bitcloutpubkey"
                    label="Bitclout ID"
                    variant="outlined"
                    value={form.bitcloutpubkey}
                    error={error.bitcloutpubkey}
                    onChange={handleNameChange}
                    fullWidth={true}
                  />
                </Col>
              </Row> */}
              <Row
                className="align-items-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Col>
                  <TextField
                    id="ethereumaddress"
                    label="Ethereum Address"
                    variant="outlined"
                    value={form.ethereumaddress}
                    error={error.ethereumaddress}
                    onChange={handleNameChange}
                    fullWidth={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  style={
                    window.innerWidth <= 768 ? { marginBottom: "1.5em" } : {}
                  }
                >
                  <Button
                    onClick={handlePost}
                    style={{ height: "100%" }}
                    disabled={!formUpdated}
                  >
                    Update Profile
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col style={{ marginLeft: "10px" }}>
              <Row>
                <Col>
                  <TextField
                    id="password"
                    label="Current Password"
                    variant="outlined"
                    value={form.password}
                    error={error.password}
                    onChange={handlePassChange}
                    fullWidth={true}
                  />
                </Col>
              </Row>
              <Row
                className="align-items-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Col>
                  <TextField
                    id="newPassword"
                    label="New Password"
                    variant="outlined"
                    value={form.newPassword}
                    error={error.newPassword}
                    onChange={handlePassChange}
                    fullWidth={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={handlePass}
                    style={{ height: "100%" }}
                    disabled={!passwordUpdated}
                  >
                    Update Password
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  {successful ? (
                    <p>Your password was succesfully changed!</p>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    </Container>
  );
};
export default EditProfile;
