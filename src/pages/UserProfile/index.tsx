import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "components/NavBar";
import { FaCheckCircle } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { getProfile } from "services/users";

const Profile = (props: any) => {
  let { username }: any = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile(username).then((profile) => {
      setUser(profile.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
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
                    <b>@{username}</b>{" "}
                    {user.bitcloutverified && (
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
                  {user.description}
                </p>
                <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                  <ImKey /> {user.bitcloutpubkey}
                </p>
                <Row>
                  {user && (
                    <>
                      <Col>
                        <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                          <b>BitClout account verification: {user.verified}</b>
                        </p>
                      </Col>
                      <Col>
                        <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
                          <b>
                            {user.emailverified
                              ? "Email Verified"
                              : "Email Pending Verification"}
                          </b>
                        </p>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col sm={window.visualViewport.width >= 1600 ? 3 : 2}>
                <img
                  src={
                    user.profilepicture
                      ? user.profilepicture
                      : `https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`
                  }
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </>
    </Container>
  );
};
export default Profile;
