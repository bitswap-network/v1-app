import React, { useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { getListings } from "../../actions/auth";
import main from "../../services/main.service";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";

const Login = (props: any) => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({
    username: "" as string,
    password: "" as string
  });
  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = () => {
    // dispatch(login(form.username, form.password) as any)
    //   .then(() => {
    //     dispatch(getListings() as any).then(() => {
    //       props.history.push("/");
    //       window.location.reload();
    //     });
    //   })
    //   .catch((error: any) => {
    //     console.log("not logged in ", error);
    //     setInvalid(true);
    //   });

    main
      .login(form.username, form.password)
      .then(() => {
        props.history.push("/");
        window.location.reload();
      })
      .catch(err => {
        setInvalid(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container
      className="p-3 align-items-center"
      style={{ textAlign: "center", marginTop: "20%" }}
    >
      {invalid && <h5 className="error">Invalid Login</h5>}

      <h3>
        <b>Login:</b>
      </h3>
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
            variant="outlined"
            type="password"
            value={form.password}
            onChange={handleNameChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={handleLogin}
            style={{ height: "100%", width: "50%" }}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
