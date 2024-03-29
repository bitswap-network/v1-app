import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import {
  updateProfile,
  updatePassword,
  verifyBitclout,
} from "../../services/users";
import { useUser } from "components/hooks";
import { FaCheckCircle } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { FiXCircle, FiPlusCircle, FiX } from "react-icons/fi";

const EditProfile = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [formUpdated, setFormUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [copied, setCopy] = useState(false);
  const [verifyState, setVerifyState] = useState("primary");
  const { userData, isLoading, isError } = useUser(user?.token);
  const [error, setError] = useState({
    email: false,
    ethereumaddress: false,
    password: false,
    newPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [successfulpass, setSuccessfulPass] = useState(false);
  const [setAddresses, setSetAddresses] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    ethereumaddress: Array.isArray(userData?.ethereumaddress)
      ? userData?.ethereumaddress
      : [userData?.ethereumaddress],
    password: "",
    newPassword: "",
  });
  useEffect(() => {
    if (!isLoading && !setAddresses) {
      setSetAddresses(true);
      setForm({
        ...form,
        ethereumaddress: Array.isArray(userData?.ethereumaddress)
          ? userData?.ethereumaddress
          : [userData?.ethereumaddress],
      });
    }
  }, [userData]);
  const valerrorHandler = () => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setError({
      ...error,
      email: !regEmail.test(form.email) ? true : false,
      ethereumaddress: form.ethereumaddress.length < 1 ? true : false,
    });

    if (form.email.length < 1 || form.ethereumaddress.length < 1) {
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
    setFormUpdated(true);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      email: false,
      ethereumaddress: false,
    });
  };

  const handlePassChange = (e: any) => {
    setPasswordUpdated(true);
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

  const handlePost = () => {
    if (valerrorHandler()) {
      setLoading(true);
      updateProfile(form.email, user.token)
        .then((response) => {
          setLoading(false);
          setSuccessful(true);
          setFormUpdated(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          // Add error message in UI
          setLoading(false);
        });
    }
  };

  const handlePass = () => {
    if (passerrorHandler()) {
      setLoading(true);
      updatePassword(form.password, form.newPassword, user.token)
        .then((response) => {
          setLoading(false);
          setSuccessfulPass(true);
          setPasswordUpdated(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          // Add error message in UI
          setLoading(false);
        });
    }
  };
  const handleVerify = () => {
    setVerifyState("secondary");
    verifyBitclout(user.token)
      .then((response) => {
        // console.log(response.data);
        setVerifyState("success");
      })
      .catch((error) => {
        console.log(error);
        setVerifyState("danger");
      });
  };
  return (
    <>
      <Modal
        show={verifyModal}
        onHide={() => {
          setVerifyModal(false);
          setVerifyState("primary");
        }}
        style={{ display: "flex", margin: "auto" }}
        // aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Col style={{ textAlign: "right" }}>
            <FiX
              className="hoverCursor"
              size={"1rem"}
              style={{
                marginTop: "1%",
                color: "#ACB5BD",
              }}
              onClick={() => {
                setVerifyModal(false);
              }}
            />
          </Col>

          <Col style={{ textAlign: "center", marginTop: "0%" }}>
            <h3>
              <b>Verify Profile</b>
            </h3>
          </Col>
          <Col>
            <p>Post on bitclout to verify your profile:</p>
            <img
              src={
                "https://cdn.discordapp.com/attachments/803030950116065290/836025514372235314/unknown.png"
              }
              style={{ width: "100%" }}
            />
            <Col style={{ textAlign: "center" }}>
              <p style={{ marginTop: "3%" }}>
                Verifying my @bitswap account!{" "}
                {userData?.verification.bitcloutString}
              </p>
            </Col>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button
              style={{ backgroundColor: "white", color: "blue" }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `Verifying my @bitswap account! ${userData?.verification.bitcloutString}`
                );
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 2500);
              }}
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </Col>
          <Col style={{ textAlign: "center", marginTop: "3%" }}>
            <Button variant={verifyState} onClick={handleVerify}>
              {verifyState === "primary" && "Check Verification"}
              {verifyState === "secondary" && "Loading"}
              {verifyState === "success" && "Success!"}
              {verifyState === "danger" && "Failed to Verify"}
            </Button>
          </Col>
        </Modal.Body>
      </Modal>

      <Container
        style={
          window.innerWidth <= 768
            ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
            : { display: "flex", flexDirection: "row", marginLeft: "1.3rem" }
        }
      >
        <NavBar />
        <>
          <Container
            style={
              window.innerWidth <= 768
                ? { marginTop: "2rem" }
                : {
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    marginLeft: "3rem",
                  }
            }
          >
            <div
              style={{
                marginTop: "1rem",
                backgroundColor: "white",
                padding: "2%",
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  <h3
                    style={window.innerWidth <= 768 ? { marginTop: "1em" } : {}}
                  >
                    <a href={"https://bitclout.com/u/" + user.username}>
                      <b>@{user.username}</b>{" "}
                      {user.bitclout.verified && (
                        <FaCheckCircle color="#0059f7" fontSize="1.5rem" />
                      )}
                    </a>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {user.bitclout.bio}
                  </p>
                  <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                    <ImKey /> {user.bitclout.publicKey}
                  </p>
                  <Row>
                    {userData && !isLoading && !isError && (
                      <>
                        <Col>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              marginTop: "0",
                              fontWeight: "bold",
                              color:
                                userData.verification.status === "verified"
                                  ? "#4263EB"
                                  : "#F03D3E",
                            }}
                          >
                            {userData.verification.status === "unverified" &&
                              "Profile Unverified"}
                            {userData.verification.status === "pending" &&
                              "Profile Verification Pending"}
                            {userData.verification.status === "verified" &&
                              "Profile Verified"}
                          </p>
                          {userData.verification.status !== "verified" && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setVerifyModal(true)}
                            >
                              Verify Profile
                            </Button>
                          )}
                        </Col>

                        <Col>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              marginTop: "0",
                              fontWeight: "bold",
                              color: userData.verification.email
                                ? "#4263EB"
                                : "#F03D3E",
                            }}
                          >
                            {userData.verification.email
                              ? "Email Verified"
                              : "Email Not Verified"}
                          </p>
                        </Col>
                      </>
                    )}
                  </Row>
                </Col>
                <Col sm={window.visualViewport.width >= 1600 ? 3 : 2}>
                  <img
                    src={
                      user.bitclout.profilePicture
                        ? user.bitclout.profilePicture
                        : `https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`
                    }
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </div>

            <Row
              style={{ flexDirection: "row", display: "flex", marginTop: "5%" }}
            >
              <Col>
                <Row style={{ marginBottom: "30px" }}>
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

                <Row>
                  <Col
                    style={
                      window.innerWidth <= 768 ? { marginBottom: "1.5em" } : {}
                    }
                  >
                    <Button
                      onClick={handlePost}
                      style={{ height: "100%" }}
                      disabled={!formUpdated}
                    >
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col style={{ marginLeft: "10px" }}>
                <Row>
                  <Col>
                    <TextField
                      id="password"
                      label="Current Password"
                      type="password"
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
                      type="password"
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
                    <Button
                      onClick={handlePass}
                      style={{ height: "100%" }}
                      disabled={!passwordUpdated}
                    >
                      Update Password
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {successfulpass ? (
                      <p>Your password was succesfully changed!</p>
                    ) : null}
                    {successful ? (
                      <p>Your profile was succesfully updated!</p>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      </Container>
    </>
  );
};
export default EditProfile;
