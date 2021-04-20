import React, { useState } from "react";
import { Row, Container, Col, Navbar, Nav } from "react-bootstrap";
import Logo from "url:../../assets/bitswap.png";
import { Link } from "react-router-dom";
import { FiHome, FiUploadCloud, FiInbox, FiMonitor } from "react-icons/fi";
import MediaQuery from "react-responsive";
import { userState } from "store";
import { useRecoilValue } from "recoil";

const NavElement = (props: any) => {
  return (
    <div
      style={{
        margin: "0%",
        marginRight: "0%",
        marginLeft: "0%",
        textAlign: "left",
      }}
      onClick={() => {
        props.setCurrentPage(props.linkto);
      }}
    >
      {/* {window.location.pathname == props.linkto ? (
        <>
          <Link to={props.linkto} replace>
            {props.label}
          </Link>
        </>
      ) : (
        <>
          <Link to={props.linkto} replace>
            {props.label}
          </Link>
        </>
      )} */}

      {props.label == "Home" ? (
        <>
          <FiHome size={18} style={{ color: "#43494f" }} />
        </>
      ) : (
        <> </>
      )}
      {props.label == "Post" ? (
        <>
          <FiUploadCloud size={18} style={{ color: "#43494f" }} />
        </>
      ) : (
        <> </>
      )}
      {props.label == " Listings" ? (
        <>
          <FiInbox size={18} style={{ color: "#43494f" }} />
        </>
      ) : (
        <> </>
      )}
      {props.label == "  Wallet" ? (
        <>
          <FiMonitor size={18} style={{ color: "#43494f" }} />
        </>
      ) : (
        <> </>
      )}
      <Link
        to={props.linkto}
        style={{ color: "#43494f", fontFamily: "inherit" }}
        replace
      >
        {props.label}
      </Link>
    </div>
  );
};

export const NavBar: React.FC = (props: any) => {
  const user = useRecoilValue(userState);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  return (
    <>
      <MediaQuery query="(max-device-width: 768px)">
        <Col
          style={{
            flexDirection: "row",
            display: "flex",
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
          }}
        >
          <Navbar expand="lg">
            <img
              src={Logo}
              width={"30%"}
              height={"auto"}
              style={{ paddingTop: "2%", paddingLeft: "2%" }}
            />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Swap Feed</Nav.Link>
                {/* <Nav.Link href="/PostAd">Post Ad</Nav.Link> */}
                <Nav.Link href="/userlistings">My Listings</Nav.Link>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/logout" style={{ color: "red" }}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </MediaQuery>

      <MediaQuery query="(min-device-width: 768px)">
        <Col
          style={{ flexDirection: "row", display: "flex", marginLeft: 0 }}
          sm={window.visualViewport.width > 1600 ? 5 : 4}
        >
          <Container
            style={{
              flexDirection: "column",
              marginTop: "5px",
              textAlign: "right",
              height: "90vh",
              display: "flex",
            }}
          >
            <Row style={{ marginTop: "5px", height: "10%" }}>
              <img
                src={Logo}
                width={"80%"}
                height={"auto"}
                style={{ marginTop: "20%" }}
              />
            </Row>

            <Col style={{ alignContent: "center", paddingTop: "25vh" }}>
              <Row className="navRow">
                <NavElement
                  label="Home"
                  linkto="/"
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Row>

              {true ? (
                <>
                  <Row className="navRow" style={{ paddingTop: "2vh" }}>
                    <NavElement
                      label="Post"
                      linkto="/postad"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                  <Row className="navRow" style={{ paddingTop: "4vh" }}>
                    <NavElement
                      label=" Listings"
                      linkto="/userlistings"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                  <Row className="navRow" style={{ paddingTop: "6vh" }}>
                    <NavElement
                      label="  Wallet"
                      linkto="/wallet"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                </>
              ) : (
                <>
                  <Row className="navRow">
                    <NavElement
                      label="Login"
                      linkto="/login"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                  <Row className="navRow">
                    <NavElement
                      label="Register"
                      linkto="/register"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                </>
              )}

              {user ? (
                <Row style={{ paddingTop: "30vh", width: "150%" }}>
                  <img
                    src={`https://pbs.twimg.com/profile_images/1368690205784498177/5PkA1F5-_400x400.jpg`}
                    style={{
                      borderRadius: "60px",
                      height: "auto",
                      width: "5vh",
                    }}
                  />
                  <Row
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Link
                      to={"/profile"}
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        marginLeft: "4vh",
                        fontSize: "1.8vh",
                        height: "50%",
                      }}
                      replace
                    >
                      {"@"}
                      {user.username}
                    </Link>
                    <Link
                      to={"/logout"}
                      style={{
                        color: "red",
                        fontFamily: "inherit",
                        marginLeft: "4vh",
                        fontSize: "1.5vh",
                        height: "50%",
                      }}
                      replace
                    >
                      {"Logout"}
                    </Link>
                  </Row>
                </Row>
              ) : (
                <Col style={{ paddingTop: "35vh", width: "100%" }}>
                  <Row>
                    <Link
                      to={"/login"}
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        fontSize: "1.8vh",
                        height: "50%",
                      }}
                      replace
                    >
                      Login
                    </Link>
                  </Row>
                  <Row
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Link
                      to={"/register"}
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        fontSize: "1.8vh",
                        height: "50%",
                      }}
                      replace
                    >
                      Register
                    </Link>
                  </Row>
                </Col>
              )}
            </Col>
          </Container>
          <Container>
            <div
              style={{
                borderLeft: "1px solid #DDE2E5",
                height: "100vh",
                marginLeft: "7vh",
                width: "1rem",
              }}
            />
          </Container>
        </Col>
      </MediaQuery>
    </>
  );
};
export default NavBar;
