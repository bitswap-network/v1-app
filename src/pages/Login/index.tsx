import React, { useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { getListings } from "../../actions/auth";
import main from "../../services/main.service";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import Logo from "url:../../assets/transparentLogo.png";
import RegImage from "url:../../assets/regImage.png";
import axios from "axios";
import env from "../../components/data/env.json";

import MediaQuery from 'react-responsive';


const Login = (props: any) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({
    username: "" as string,
    password: "" as string,
  });
  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post(`${env.url}/auth/login`, {
        username: form.username,
        password: form.password,
      })
      .then((response) => {
        console.log(response);
        props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        setInvalid(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Container
      style={{
        flexDirection: "row",
        display: "flex",
        paddingLeft: "0",
        marginLeft: "0",
      }}
    >
      



      {/* Image */}
      <MediaQuery minWidth={768}>
      <Col xs={0} sm={8} style={{ backgroundColor: "#DBE6FF", height: "100vh",  justifyContent: "center", display:"flex", flexDirection: "column" }}>
        <Row style={{ marginLeft: "5%", paddingTop: "10%" }}>
          <img src={Logo} style={{ width: "18%", height: "auto" }} />
        </Row>
        <Row style={{marginTop: "-5%"}}>
          <img
            src={RegImage}
            style={{ width: "100%", height: "auto"}}
          />
        </Row>
      </Col>
      </MediaQuery>

      {/* Registration Form */}
      <MediaQuery minWidth={768}>
      <Col xs={12} sm={6} style={{ paddingLeft: "6em", alignContent: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{fontSize: "30px"}}>
          <b>Log In</b>
        </h3>
        <h5>
          <p style={{ color: "#ACB5BD", fontSize: "0.8em", marginTop: "3%" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6494FF" }} replace>
              Create an Account
            </Link>
          </p>
        </h5>

        <>
          <Row style={{ marginTop: "7%", marginBottom: "3%" }}>
            <Col>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={form.username}
                onChange={handleNameChange}
                style={{width: "92%"}}

              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3%", marginBottom: "3%" }}>
            <Col>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={form.password}
                onChange={handleNameChange}
                style={{width: "92%"}}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "2%" }}>
              <Button
                onClick={handleLogin}
                style={{ height: "120%", width: "92%" }}
              >
                Login
              </Button>
            </Col>
          </Row>
        </>
      </Col>
    </MediaQuery>

     {/* Registration Form */}
     <MediaQuery maxWidth={768}>
      <Col xs={12} sm={6} style={{marginTop:"2em",marginLeft: "1.5em", alignContent: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Row>
          <img src={Logo} style={{ width: "45%", height: "auto" }} />
        </Row>
        <h3 style={{fontSize: "25px", marginTop: "10%"}}>
          <b>Log In</b>
        </h3>
        <h5>
          <p style={{ color: "#ACB5BD", fontSize: "%", marginTop: "3%" }}>
            Don't have an account?<br />
            <Link to="/register" style={{ color: "#6494FF" }} replace>
              <p style={{marginTop: "2%"}}>
              Create an Account
              </p>
            </Link>
          </p>
        </h5>

        <>
          <Row style={{ marginTop: "7%", marginBottom: "3%" }}>
            <Col>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={form.username}
                onChange={handleNameChange}
                style={{width: "92%"}}

              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3%", marginBottom: "3%" }}>
            <Col>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={form.password}
                onChange={handleNameChange}
                style={{width: "92%"}}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "2%" }}>
              <Button
                onClick={handleLogin}
                style={{ height: "120%", width: "92%" }}
              >
                Login
              </Button>
            </Col>
          </Row>
        </>
      </Col>
    </MediaQuery>
    
    </Container>
  );
};

export default Login;
