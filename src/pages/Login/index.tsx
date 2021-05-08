import { useEffect, useState } from "react";
import "../../App.css";
import { Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
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
import { login, identityLogin } from "services/auth";
import { saveData } from "helpers/local";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, userState } from "store";
import { launch, jwt } from "../../identity/core";
import { setIdentityServiceUsers } from "../../identity/store";

interface identityUser {
  accessLevel: number;
  accessLevelHmac: string;
  btcDepositAddress: string;
  encryptedSeedHex: string;
  hasExtraText: boolean;
  network: string;
}

const Login = (props: any) => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const setUser = useSetRecoilState(userState);

  const [form, setForm] = useState({
    username: "" as string,
    password: "" as string,
  });

  const [error, setError] = useState(null);

  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginBitclout = () => {
    launch("/log-in").subscribe((res) => {
      console.log(res);
      setIdentityServiceUsers(res.users, res.publicKeyAdded);
      const pubkeyadded = res.publicKeyAdded;
      const i_user: identityUser = res.users[res.publicKeyAdded];
      let payload = {
        accessLevel: i_user.accessLevel,
        accessLevelHmac: i_user.accessLevelHmac,
        encryptedSeedHex: i_user.encryptedSeedHex,
      };
      jwt(payload).subscribe((token) => {
        console.log("TOKEN: ", token);
        identityLogin(pubkeyadded, token.jwt)
          .then((response) => {
            if (response.status === 200) {
              saveData("user", JSON.stringify(response.data));
              setUser(response.data);
              window.location.assign("/");
            } else {
              setError(response.data);
            }
          })
          .catch((error: any) => {
            if (error.response.status === 300) {
              window.location.assign(`/register/${pubkeyadded}`);
            } else {
              console.log(error);
              setError(error.response.data.error);
            }
          });
      });
    });
  };

  const handleLogin = () => {
    login(form.username, form.password)
      .then((response) => {
        if (response.status === 200) {
          saveData("user", JSON.stringify(response.data));
          setUser(response.data);
          window.location.assign("/");
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
          <b>Log In</b>
        </LoginText>
        <h5>
          <RegAccountText>
            Don't have an account?{" "}
            <div onClick={() => window.location.replace("/register")}>
              <Link to="/register" style={{ color: "#6494FF" }} replace>
                Create an Account
              </Link>
            </div>
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
        <Row>
          <Col style={{ marginTop: "2%" }}>
            <Button onClick={handleLoginBitclout} style={{ width: "100%" }}>
              Login with Bitclout
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "4%" }}>
            <a
              href="https://bitswap.network/bitswap-guide"
              style={{ color: "#6494FF" }}
            >
              New to Bitswap?{" "}
              <span style={{ color: "#6494FF" }}>Check out the Guide</span>
            </a>
          </Col>
        </Row>

        {error ? (
          <Row>
            <Col style={{ marginTop: "4%" }}>
              <p style={{ color: "red" }}>
                Error: {error}{" "}
                <a
                  href="#"
                  onClick={() => window.location.assign("/forgot")}
                  style={{ color: "#6494FF" }}
                >
                  Forgot Password?
                </a>
              </p>
            </Col>
          </Row>
        ) : null}
      </RegArea>
    </Wrapper>
  );
};

export default Login;
