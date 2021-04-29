import { useState } from "react";
import "../../App.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import PasswordStrengthBar from "react-password-strength-bar";
import Logo from "url:../../assets/transparentLogo.png";
import RegImage from "url:../../assets/regImage.png";
import {
  Wrapper,
  LeftDisplay,
  RegArea,
  LogoRow,
  ImageRow,
  HaveAnAccountText,
  UserField,
  RegisterButton,
  MobileLogo,
} from "./styles";
import { register, getProfile } from "services/auth";
import { FaCheckCircle } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { profile } from "node:console";

const Register = (props: any) => {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState(0);

  const [error, setError] = useState({
    username: false,
    email: false,
    bitcloutpubkey: false,
    ethereumaddress: false,
    password: false,
    confirmPassword: false,
  });

  const [creationerror, setCreationerror] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [profileObj, setProfileObj] = useState(null);
  const [form, setForm] = useState({
    username: "" as string,
    email: "" as string,
    bitcloutpubkey: "" as string,
    ethereumaddress: "" as string,
    password: "" as string,
    confirmPassword: "" as string,
  });

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
  const handleImport = () => {
    setLoading(true);
    setErrorMsg("");
    if (form.username.length === 0) {
      setError({
        ...error,
        username: true,
      });
      setLoading(false);
    } else if (form.username.length !== 0) {
      getProfile(form.username)
        .then((response) => {
          console.log(response);
          setProfileObj(response);
          setForm({ ...form, bitcloutpubkey: response.PublicKeyBase58Check });
          setPageState(1);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
          setErrorMsg(error.response.data);
        });
    }
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
    if (valerrorHandler() && profileObj) {
      setLoading(true);

      register(
        form.username,
        form.email,
        form.password,
        form.bitcloutpubkey,
        form.ethereumaddress,
        profileObj.IsVerified,
        profileObj.ProfilePic,
        profileObj.Description
      )
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            if (error.response.status === 429) {
              setErrorMsg(error.response.data.error.text);
            } else {
              setErrorMsg(error.response.data.message);
            }
          } else if (error.message) {
            setErrorMsg(error.message);
          } else {
            setErrorMsg("An error occurred");
          }
        });
    }
  };

  return (
    <Wrapper>
      {/* Image */}
      <LeftDisplay sm={8} xl={window.innerWidth > 1600 ? 11 : 8}>
        <LogoRow>
          <img src={Logo} width={"18%"} height={"auto"} />
        </LogoRow>
        <ImageRow>
          <img src={RegImage} width={"100%"} height={"auto"} />
        </ImageRow>
      </LeftDisplay>

      {/* Registration Form */}
      <RegArea xs={12} sm={7} xxl={8}>
        <MobileLogo>
          <img src={Logo} width={"55%"} height={"auto"} />
        </MobileLogo>
        {creationerror && <h5 className="error">{errorMsg}</h5>}
        {!successful && pageState === 0 && (
          <>
            <h3>
              <b>Get Started</b>
            </h3>
            <h5>
              <HaveAnAccountText>
                Already have an account?{" "}
                <div onClick={() => window.location.assign("/login")}>
                  <Link to="/login" style={{ color: "#6494FF" }} replace>
                    Log In
                  </Link>
                </div>
              </HaveAnAccountText>
            </h5>
          </>
        )}
        {!successful && pageState === 1 && (
          <>
            <h3>
              <b>Profile Import</b>
            </h3>
            <h5>
              <HaveAnAccountText>
                Is this your BitClout Profile?
              </HaveAnAccountText>
            </h5>
          </>
        )}
        {!successful && pageState === 2 && (
          <>
            <h3>
              <b>Complete Profile</b>
            </h3>
            <h5>
              <HaveAnAccountText>
                Great! We've imported your BitClout profile. Let's finish
                signing up.
              </HaveAnAccountText>
            </h5>
          </>
        )}
        {loading && <div className="loader"></div>}
        {!successful && pageState === 0 && (
          <>
            <div style={{ marginTop: "1rem" }}>
              <p style={{ color: "red", fontSize: "0.7rem" }}>
                Note: Only whitelisted usernames can register right now.
              </p>
              <p>Let's start off by importing your BitClout profile.</p>
              <UserField>
                <Col>
                  <TextField
                    id="username"
                    label="BitClout Username"
                    variant="outlined"
                    value={form.username}
                    onChange={handleNameChange}
                    error={error.username}
                    style={{ width: "90%" }}
                  />
                </Col>
              </UserField>
              <Row>
                <Col>
                  <RegisterButton onClick={handleImport}>Next</RegisterButton>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px", textAlign: "center" }}>
                <Col>
                  <a href="https://bitswap.network/terms-and-conditions">
                    Bitswap Terms and Conditions
                  </a>
                </Col>
              </Row>
            </div>
            {errorMsg ? (
              <Row style={{ marginTop: "15px", textAlign: "center" }}>
                <Col>
                  <p style={{ color: "red" }}>{errorMsg}</p>
                </Col>
              </Row>
            ) : null}
          </>
        )}
        {!successful && pageState === 1 && profileObj && (
          <>
            <Row>
              <div
                style={{
                  marginTop: "1rem",
                  backgroundColor: "white",
                  padding: "2%",
                  borderRadius: "5px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  width: "100%",
                }}
              >
                <Row style={{ textAlign: "left" }}>
                  <Col sm={3}>
                    <img
                      src={profileObj.ProfilePic}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col style={{ paddingLeft: "0" }}>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem" }}>
                      <a
                        href={`https://bitclout.com/u/${profileObj.Username}`}
                        target="_blank"
                      >
                        <b>@{profileObj.Username} </b>
                        {profileObj.IsVerified && (
                          <FaCheckCircle color="#0059f7" fontSize="1rem" />
                        )}
                      </a>
                    </p>
                    <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                      {profileObj.Description}
                    </p>
                    <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                      <ImKey /> {profileObj.PublicKeyBase58Check}
                    </p>
                  </Col>
                </Row>
              </div>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col>
                <RegisterButton
                  onClick={() => {
                    setPageState(pageState - 1);
                  }}
                >
                  Back
                </RegisterButton>
              </Col>
              <Col>
                <RegisterButton
                  onClick={() => {
                    setPageState(pageState + 1);
                  }}
                >
                  Next
                </RegisterButton>
              </Col>
            </Row>
            {errorMsg ? (
              <Row style={{ marginTop: "15px", textAlign: "center" }}>
                <Col>
                  <p style={{ color: "red" }}>{errorMsg}</p>
                </Col>
              </Row>
            ) : null}
          </>
        )}
        {!successful && pageState === 2 && (
          <>
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
                  style={{ width: "90%" }}
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
                  style={{ width: "90%" }}
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
                  style={{ width: "90%" }}
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
                  style={{ width: "90%" }}
                />
                <PasswordStrengthBar
                  style={{ width: "90%", paddingTop: "20px" }}
                  password={form.password}
                />
              </Col>
            </UserField>
            <Row style={{ marginTop: "0.8rem", width: "100%" }}>
              <Col>
                <RegisterButton
                  onClick={() => {
                    setPageState(pageState - 1);
                  }}
                >
                  Back
                </RegisterButton>
              </Col>
              <Col>
                <RegisterButton onClick={handleSubmit}>Finish</RegisterButton>
              </Col>
            </Row>
            {error.password ? (
              <Row style={{ color: "red" }}>
                <Col>
                  <p>Passwords don't match!</p>
                </Col>
              </Row>
            ) : null}
          </>
        )}
        {successful && !loading && (
          <>
            <Row>
              <Col>
                <h3 style={{ marginBottom: "30px" }}>
                  Your account has been created! Please check your email for a
                  verification link.
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    props.history.push("/login");
                    window.location.reload();
                  }}
                  style={{ height: "100%", width: "50%", padding: "10px" }}
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
