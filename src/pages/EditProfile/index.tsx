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
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { updateProfile, updatePassword } from "../../services/users";

const EditProfile = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [formUpdated, setFormUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [error, setError] = useState({
    name: false,
    email: false,
    bitcloutpubkey: false,
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
    bitcloutpubkey: user.bitcloutpubkey,
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
      bitcloutpubkey: form.bitcloutpubkey.length < 1 ? true : false,
      ethereumaddress: form.ethereumaddress.length < 1 ? true : false,
    });

    if (
      form.email.length < 1 ||
      form.bitcloutpubkey.length < 1 ||
      form.ethereumaddress.length < 1
    ) {
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
      bitcloutpubkey: false,
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
      updateProfile(
        form.username,
        form.email,
        form.bitcloutpubkey,
        form.ethereumaddress,
        user.token
      )
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
          <Row style={{ marginBottom: "40px" }}>
            <Col sm={window.visualViewport.width >= 1600 ? 3 : 2}>
              <img
                src={`https://pbs.twimg.com/profile_images/1368690205784498177/5PkA1F5-_400x400.jpg`}
                style={{ borderRadius: "60px", height: "auto", width: "6em" }}
              />
            </Col>
            <Col>
              <h3 style={window.innerWidth <= 768 ? { marginTop: "1em" } : {}}>
                <b>@{user.username}</b>
              </h3>
              <h6 style={{ marginTop: "1em" }}>
                <a href={"https://bitclout.com/u/" + user.username}>
                  https://bitclout.com/u/{user.username}
                </a>
              </h6>
            </Col>
          </Row>
          <Row
            style={{ flexDirection: "row", display: "flex", marginTop: "5%" }}
          >
            <Col sm={5}>
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
              <Row
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
              </Row>
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
            <Col sm={5} style={{ marginLeft: "10px" }}>
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
