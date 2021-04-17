import React, { useState } from "react";
import "../../App.css";
import { Row, Col, Button, Container } from "react-bootstrap";
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
import {Wrapper, LeftDisplay, RegArea, LogoRow, ImageRow, LoginText, RegAccountText, UsernameRow, PasswordRow, MobileLogo} from "./styles"

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
        dispatch(getListings() as any).then(() => {
                props.history.push("/home");
                window.location.reload();
              });
        window.location.reload();
      })
      .catch((err) => {
        setInvalid(true);
      });
    // main
    // .login(form.username, form.password)
    // .then(() => {
    //   props.history.push("/");
    //   window.location.reload();
    // });
  };



  return (
    <Wrapper>
      {/* Image */}


      <LeftDisplay className="col-xxl-10"  sm={8} xl={window.innerWidth > 1600 ?  11 : 8}>
        <LogoRow>
          <img src={Logo} width={"18%"} height={'auto'}/>
        </LogoRow>
        <ImageRow>
          <img src={RegImage} width={'100%'} height={'auto'}/>
        </ImageRow>
      </LeftDisplay>

      {/* Registration Form */}
      <RegArea className="col-xxl-8" xs={12} sm={6} xxl={8} >
        <MobileLogo>
          <img src={Logo} width={"55%"} height={'auto'}/>
        </MobileLogo>
        <LoginText>
          <b>Log In</b>
        </LoginText>
        <h5>
          <RegAccountText>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6494FF" }} replace>
              Create an Account
            </Link>
          </RegAccountText>
        </h5>

          <UsernameRow>
            <Col>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={form.username}
                onChange={handleNameChange}
                fullWidth={true}
              />
            </Col>
          </UsernameRow>

          <PasswordRow>
            <Col>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={form.password}
                onChange={handleNameChange}
                fullWidth={true}
              />
            </Col>
          </PasswordRow>

          <Row>
            <Col style={{ marginTop: "2%" }}>
              <Button
                onClick={handleLogin}
                style={{width: "100%"}}
              >
                Login
              </Button>
            </Col>
          </Row>
      </RegArea>
    </Wrapper>
  );
};

export default Login;
