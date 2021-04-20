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
  MobileLogo
} from "./styles";
import { login } from "services/auth";
import { saveData } from "helpers/local";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, userState } from "store";

const Login = (props: any) => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const setUser = useSetRecoilState(userState);

  const [form, setForm] = useState({
    username: "" as string,
    password: "" as string
  });

  const [error, setError] = useState(null);

  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = () => {
    login(form.username, form.password)
      .then(response => {
        if (response.status === 200) {
          saveData("user", JSON.stringify(response.data));
          setUser(response.data);
          props.history.push("/");
          window.location.reload();
        } else {
          setError(response.data);
        }
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
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      {/* Image */}

      <LeftDisplay
        className="col-xxl-10"
        sm={8}
        xl={window.innerWidth > 1600 ? 11 : 8}
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
            <Button onClick={handleLogin} style={{ width: "100%" }}>
              Login
            </Button>
          </Col>
        </Row>

        {error ? (
          <Row>
            <Col style={{ marginTop: "4%" }}>
              <p style={{ color: "red" }}>Error: {error}</p>
            </Col>
          </Row>
        ) : null}
      </RegArea>
    </Wrapper>
  );
};

export default Login;
