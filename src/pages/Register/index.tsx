import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { register } from "../../actions/auth";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import PasswordStrengthBar from "react-password-strength-bar";
import Checkbox from "@material-ui/core/Checkbox";
import Logo from "url:../../assets/transparentLogo.png";
import RegImage from "url:../../assets/regImage.png";
import {Wrapper, LeftDisplay, RegArea, LogoRow, ImageRow, HaveAnAccountText, UserField, RegisterButton, MobileLogo} from "./styles"


const Register = (props: any) => {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState({
    username: false,
    email: false,
    bitcloutpubkey: false,
    ethereumaddress: false,
    password: false,
    confirmPassword: false,
  });
  const [creationerror, setCreationerror] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    username: "" as string,
    email: "" as string,
    bitcloutpubkey: "" as string,
    ethereumaddress: "" as string,
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
      bitcloutpubkey: false,
      ethereumaddress: false,
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
      bitcloutpubkey: form.bitcloutpubkey.length !== 55 ? true : false,
      ethereumaddress: form.ethereumaddress.length !== 42 ? true : false,
      password: form.password !== form.confirmPassword,
    });

    if (
      form.username.length < 1 ||
      !regEmail.test(form.email) ||
      form.bitcloutpubkey.length !== 55 ||
      form.ethereumaddress.length !== 42 ||
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
        .post(`${env.url}/auth/register`, {
          username: form.username,
          email: form.email,
          password: form.password,
          bitcloutpubkey: form.bitcloutpubkey,
          ethereumaddress: form.ethereumaddress,
        })
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch((err) => {
          //console.log("err", err.response);
          if (err.response.status === 403) {
            setErrorMsg(err.response.data.message);
          } else {
            console.log(err.response);
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
    <Wrapper>
      {/* Image */}
      <LeftDisplay sm={8} xl={window.innerWidth > 1600 ?  11 : 8}>

        <LogoRow>
          <img src={Logo} width={'18%'} height={'auto'} />
        </LogoRow>
        <ImageRow>
          <img
            src={RegImage} width={'100%'} height={'auto'}
          />
        </ImageRow>
      </LeftDisplay>

      {/* Registration Form */}
      <RegArea  xs={12} sm={7} xxl={8} >
         <MobileLogo>
          <img src={Logo} width={"55%"} height={'auto'}/>
        </MobileLogo>
        {creationerror && <h5 className="error">{errorMsg}</h5>}
        {!successful && (
          <>
            <h3>
              <b>Get Started</b>
            </h3>
            <h5>
              <HaveAnAccountText>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#6494FF" }} replace>
                  Log In
                </Link>
              </HaveAnAccountText>
            </h5>
          </>
        )}
        {loading && <div className="loader"></div>}
        {!successful && !loading && (
          <>
            <Row style={{ marginTop: "5%", marginBottom: "3%" }}>
              <Col>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  value={form.username}
                  onChange={handleNameChange}
                  error={error.username}
                  style={{width: '90%'}}
                />
              </Col>
            </Row>
            <UserField>
              <Col>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={form.email}
                  onChange={handleNameChange}
                  error={error.email}
                  style={{width: '90%'}}

                />
              </Col>
            </UserField>
            <UserField>
              <Col>
                <TextField
                  id="bitcloutpubkey"
                  label="BitClout Public Key"
                  variant="outlined"
                  value={form.bitcloutpubkey}
                  onChange={handleNameChange}
                  error={error.bitcloutpubkey}
                  style={{width: '90%'}}
                />
              </Col>
            </UserField>
            <UserField>
              <Col>
                <TextField
                  id="ethereumaddress"
                  label="Ethereum Address"
                  variant="outlined"
                  value={form.ethereumaddress}
                  onChange={handleNameChange}
                  error={error.ethereumaddress}
                  style={{width: '90%'}}
                />
              </Col>
            </UserField>
            <UserField>
              <Col>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={form.password}
                  onChange={handleNameChange}
                  error={error.password}
                  style={{width: '90%'}}
                />
              </Col>
            </UserField>
            <UserField>
              <Col>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={form.confirmPassword}
                  onChange={handleNameChange}
                  error={error.confirmPassword}
                  style={{width: '90%'}}
                />
                <PasswordStrengthBar
                  style={{ width: "90%", paddingTop: "20px" }}
                  password={form.password}
                />
              </Col>
            </UserField>
            {error.password ? (
              <Row style={{color: "red"}}>
                <Col>
                  <p>Passwords don't match!</p>
                </Col>
              </Row>
            ) : null}

            <Row>
              <Col>
                <RegisterButton onClick={handleSubmit}>
                  Register
                </RegisterButton>
              </Col>
            </Row>
            <Row style={{ marginTop: "15px", textAlign: "center" }}>
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
      </RegArea>
    </Wrapper>
  );
};
export default Register;
