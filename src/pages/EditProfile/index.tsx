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
import { logout } from "../../actions/auth";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";
import MD5 from "crypto-js/md5";
import NavBar from "components/NavBar";
const Web3 = require("web3");

const EditProfile = (props: any) => {
  const dispatch = useAppDispatch();

  const [updated, setUpdated] = useState(false);

  const [error, setError] = useState({
    email: false,
    bitcloutid: false,
    ethAddress: false,
    password: false,
    newPassword: false,
  });
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { user: currentUser } = useAppSelector((state) => state.auth);

  if (currentUser && Object.keys(currentUser).length === 0) {
    dispatch(logout() as any);
  }

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [form, setForm] = useState({
    email: "Vansh Sethi",
    bitcloutid: "0xfewfwefweffewfwefewfwefwe",
    ethAddress: "0xfewfwefweffewfwefewfwefwe",
    password: "",
    newPassword: "",
  });
  const valerrorHandler = () => {
    setError({
      ...error,
      email: form.email.length < 1 ? true : false,
      bitcloutid: form.bitcloutid.length < 1 ? true : false,
      ethAddress: form.ethAddress.length < 1 ? true : false,
    });

    if (
      form.email.length < 1 ||
      form.bitcloutid.length < 1 ||
      form.ethAddress.length < 1
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
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      email: false,
      bitcloutid: false,
      ethAddress: false,
    });
  };
  const handlePassChange = (e: any) => {
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

  useEffect(() => {
    if (isLoggedIn) {
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios.get(`${env.url}/verifytoken`, config).catch((err) => {
        dispatch(logout() as any);
      });
    }
    if (form && updated) {
      setUpdated(false);
    }
  }, [updated]);

  const handlePost = () => {
    if (valerrorHandler()) {
      setLoading(true);
      // console.log({
      //   name: form.name,
      //   username: form.username,
      //   bitcloutid: form.bitcloutid
      // });
      let config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      axios
        .post(
          `${env.url}/updateProfile`,
          {
            username: currentUser.username,
            email: form.email,
            bitcloutid: form.bitcloutid,
            ethAddress: form.ethAddress,
          },
          config
        )
        .then((response) => {
          console.log(response);
          setLoading(false);
          setSuccessful(true);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const handlePass = () => {
    if (passerrorHandler()) {
      setLoading(true);
      // console.log({
      //   name: form.name,
      //   username: form.username,
      //   bitcloutid: form.bitcloutid
      // });
      // let config = {
      //   headers: { Authorization: `Bearer ${currentUser.token}` },
      // };
      // axios
      //   .post(
      //     `${env.url}/updatePassword`,
      //     {
      //       username: currentUser.username,
      //       password: form.password,
      //       newPassword: form.newPassword,
      //     },
      //     config
      //   )
      //   .then((response) => {
      //     console.log(response);
      //     setLoading(false);
      //     setSuccessful(true);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setLoading(false);
      //   });
    }
  };


  return (
    <Container style={window.innerWidth <= 768 ? {marginLeft: 0, marginRight:0,paddingLeft: 0, paddingRight:0} : {display: "flex", flexDirection: "row",}}>
        <NavBar />
        <>
        <Container style={window.innerWidth <= 768 ? {marginTop: "2rem"}:{display: "flex", flexDirection: "column", alignSelf: "center"}}>
          <Row
            style={{ marginBottom: "40px"}}
          >
            <Col sm={2}>
                <img
                  src={`https://pbs.twimg.com/profile_images/1368690205784498177/5PkA1F5-_400x400.jpg`}
                  style={{ borderRadius: "60px", height:"auto", width: "6em" }}
                />
            </Col>
            <Col>
              <h3 style={window.innerWidth <= 768 ? {marginTop: "1em"}: {}}>
                <b>{"@"}{"Vansh"}</b>
              </h3>
              <h6 style={{marginTop: "1em"}}>
                <a href={"https://bitclout.com/u/" + "Vansh"}>https://bitclout.com/u/Vansh</a>
              </h6>
            </Col>
            
          </Row>
          <Row style={{flexDirection: "row", display: "flex", marginTop: "5%"}}>
            
            <Col sm={5}>
              <Row
                style={{ marginBottom: "30px" }}
              >
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
                    id="bitcloutid"
                    label="Bitclout ID"
                    variant="outlined"
                    value={form.bitcloutid}
                    error={error.bitcloutid}
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
                    id="ethAddress"
                    label="Ethereum Address"
                    variant="outlined"
                    value={form.ethAddress}
                    error={error.ethAddress}
                    onChange={handleNameChange}
                    fullWidth={true}

                  />
                </Col>
              </Row>
              <Row>
                <Col style={window.innerWidth <= 768 ? {marginBottom: "1.5em"}: {}}>
                  <Button onClick={handlePost} style={{ height: "100%" }}>
                    Update Profile
                  </Button>
                </Col>
              </Row>
             
            </Col>
            <Col sm={5} style={{marginLeft: "10px"}}>
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
                  <Button onClick={handlePass} style={{ height: "100%" }}>
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
