import { useEffect, useState } from "react";
import "../../App.css";
import { Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Logo from "url:../../assets/transparentLogo.png";
import RegImage from "url:../../assets/regImage.png";
import {
  Wrapper,
  LeftDisplay,
  RegArea,
  LogoRow,
  ImageRow,
  LoginText,
  RegAccountText,
  UsernameRow,
  PasswordRow,
  MobileLogo,
} from "./styles";
import { forgotPassword} from "services/auth";
import { saveData } from "helpers/local";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, userState } from "store";

declare let window: any;

const ForgotPassword = (props: any) => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const setUser = useSetRecoilState(userState);
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    email: "" as string,
  });

  const [error, setError] = useState(null);

  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleForgotPassword = () => {
    forgotPassword(form.email)
      .then((response) => {
        setSuccess(true)
      })
      .catch((error: any) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      });
  };

  if (isLoggedIn) {
    window.location.assign("/");
  }

  return (
    <Wrapper>
      {/* Image */}

      <LeftDisplay
        className="col-xxl-10"
        sm={8}
        xl={window.innerWidth > 1800 ? 10 : 7}
      >
        <LogoRow>
          <img src={Logo} width={"18%"} height={"auto"} />
        </LogoRow>
        <ImageRow>
          <img src={RegImage} width={"100%"} height={"auto"} />
        </ImageRow>
      </LeftDisplay>

      {/* Registration Form */}
      <RegArea className="col-xxl-8" xs={12} sm={6} xxl={8}>
        <MobileLogo>
          <img src={Logo} width={"55%"} height={"auto"} />
        </MobileLogo>
        <LoginText>
          <b>Recover Password</b>
        </LoginText>
        <h5>
          <RegAccountText>
            <div onClick={() => window.location.replace("/login")}>
              <Link to="/login" style={{ color: "#6494FF" }} replace>
                Login Into Your Account
              </Link>
            </div>
          </RegAccountText>
        </h5>

        <UsernameRow>
          <Col>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={form.email}
              onChange={handleNameChange}
              fullWidth={true}
            />
          </Col>
        </UsernameRow>

       

        <Row>
          <Col style={{ marginTop: "2%" }}>
            <Button onClick={handleForgotPassword} style={{ width: "100%" }}>
              Send Recovery Email
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "4%" }}>
            <a
              style={{  color: "#6494FF" }}
            >
              Need Support?{" "}
              <span style={{ color: "#6494FF" }}>Email us at <a href="mailto:support@bitswap.com">support@bitswap.com</a></span>
            </a>
          </Col>
        </Row>

        {error ? (
          <Row>
            <Col style={{ marginTop: "4%" }}>
              <p style={{ color: "red" }}>Error: {error}</p>
            </Col>
          </Row>
        ) : null}
        {success ? (
          <Row>
            <Col style={{ marginTop: "4%" }}>
              <p style={{ color: "#6494FF" }}>An email has been sent to your account {error}</p>
            </Col>
          </Row>
        ) : null}
      </RegArea>
    </Wrapper>
  );
};

export default ForgotPassword;
