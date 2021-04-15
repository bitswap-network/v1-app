import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { register } from "../../actions/auth";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import PasswordStrengthBar from "react-password-strength-bar";
import Checkbox from "@material-ui/core/Checkbox";

const Register = (props: any) => {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState({
    username: false,
    email: false,
    bitcloutid: false,
    ethAddress: false,
    password: false,
    confirmPassword: false,
  });
  const [creationerror, setCreationerror] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    username: "" as string,
    email: "" as string,
    bitcloutid: "" as string,
    ethAddress: "" as string,
    password: "" as string,
    confirmPassword: "" as string,
  });
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      username: false,
      email: false,
      bitcloutid: false,
      ethAddress: false,
      password: false,
      confirmPassword: false,
    });
    setCreationerror(false);
  };
  const valerrorHandler = () => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setError({
      ...error,
      username: form.username.length < 1 ? true : false,
      email: !regEmail.test(form.email) ? true : false,
      bitcloutid: form.bitcloutid.length !== 55 ? true : false,
      ethAddress: form.ethAddress.length !== 42 ? true : false,
      password: form.password !== form.confirmPassword,
    });

    if (
      form.username.length < 1 ||
      !regEmail.test(form.email) ||
      form.bitcloutid.length !== 55 ||
      form.ethAddress.length !== 42 ||
      form.password !== form.confirmPassword
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = () => {
    if (valerrorHandler()) {
      setLoading(true);

      axios
        .post(`${env.url}/register`, {
          username: form.username,
          email: form.email,
          password: form.password,
          bitcloutid: form.bitcloutid,
          ethAddress: form.ethAddress,
        })
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(err => {
          //console.log("err", err.response);
          if (err.response.status === 403) {
            setErrorMsg(err.response.data.message);
          } else {
            console.log(err.response.data);
            setErrorMsg(
              err.response.data.name === "MongoError"
                ? `Field error: ${Object.keys(err.response.data.keyPattern)}`
                : "Error while registering"
            );
          }
          setCreationerror(true);
          setSuccessful(false);
          setLoading(false);
        });
    }
  };

  return (
    <Container
      className="p-3 align-items-center"
      style={{ textAlign: "center", marginTop: "10%" }}
    >
      {creationerror && <h5 className="error">{errorMsg}</h5>}
      <h3>
        <b>Register:</b>
      </h3>
      {loading && <div className="loader"></div>}
      {!successful && !loading && (
        <>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={form.username}
                onChange={handleNameChange}
                error={error.username}
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={form.email}
                onChange={handleNameChange}
                error={error.email}
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="bitcloutid"
                label="BitClout Public Key"
                variant="outlined"
                value={form.bitcloutid}
                onChange={handleNameChange}
                error={error.bitcloutid}
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="ethAddress"
                label="Ethereum Address"
                variant="outlined"
                value={form.ethAddress}
                onChange={handleNameChange}
                error={error.ethAddress}
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={form.password}
                onChange={handleNameChange}
                error={error.password}
              />
            </Col>
          </Row>
          <Row
            className="align-items-center"
            style={{ marginTop: "3%", marginBottom: "3%" }}
          >
            <Col>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={form.confirmPassword}
                onChange={handleNameChange}
                error={error.confirmPassword}
              />
              <PasswordStrengthBar
                style={{ width: "40%", margin: "auto", padding: "10px" }}
                password={form.password}
              />
            </Col>
          </Row>
          {error.password ? (
            <Row style={{ marginTop: "15px", color: "red" }}>
              <Col>
                <p>Passwords don't match!</p>
              </Col>
            </Row>
          ) : null}
          {/* <Row>
            <Col>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ alignItems: "right" }}
              />
              <h6>Agree to let us send emails to you.</h6>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Button
                onClick={handleSubmit}
                style={{ height: "100%", width: "50%" }}
              >
                Register
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col>
              <a href="https://bitswap.network/terms-and-conditions">
                Bitswap Terms and Conditions
              </a>
            </Col>
          </Row>
        </>
      )}
      {successful && !loading && (
        <>
          <Row>
            <Col>
              <h3>Account Created!</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  props.history.push("/login");
                  window.location.reload();
                }}
                style={{ height: "100%", width: "50%" }}
              >
                Login
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default Register;
