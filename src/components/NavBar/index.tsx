import React, { useState } from "react";
import { Row, Container, Col, Navbar, Nav } from "react-bootstrap";
import Logo from "url:../../assets/bitswap.png";
import { Link } from "react-router-dom";
import { FiHome, FiUploadCloud, FiInbox, FiDollarSign } from "react-icons/fi";
import MediaQuery from "react-responsive";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { useUser } from "components/hooks";

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
        window.location.assign(props.linkto);
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
          <FiDollarSign size={18} style={{ color: "#43494f" }} />
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
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
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
              width={window.visualViewport.width > 1800 ? "60%" : "30%"}
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
                <div onClick={() => window.location.replace(`/logout`)}>
                  <Nav.Link href="/logout" style={{ color: "red" }}>
                    Logout
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </MediaQuery>

      <MediaQuery query="(min-device-width: 768px)">
        <Col
          style={{ flexDirection: "row", display: "flex", marginLeft: 0 }}
          sm={3}
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
                  {/* <Row className="navRow" style={{ paddingTop: "2vh" }}>
                    <NavElement
                      label="Post"
                      linkto="/postad"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row> */}
                  <Row className="navRow" style={{ paddingTop: "2vh" }}>
                    <NavElement
                      label=" Listings"
                      linkto="/userlistings"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Row>
                  <Row className="navRow" style={{ paddingTop: "4vh" }}>
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
              <Row
                style={{
                  marginTop: "30vh",
                  textAlign: "left",
                  width: "200%",
                }}
              >
                <p style={{fontSize: "0.85rem"}}>
                  {isLoggedIn && (
                    <b>
                      Balance:{" "}
                      {isLoading || isError
                        ? user.bitswapbalance.toFixed(2)
                        : userData.bitswapbalance.toFixed(2)}{" "}
                      $BTCLT
                    </b>
                  )}
                </p>
              </Row>

              {user ? (
                <Row style={{ width: "120%" }}>
                  <img
                    src={
                      user.profilepicture
                        ? user.profilepicture
                        : `https://cdn.discordapp.com/attachments/831893651844104243/834221365648949278/iu.png`
                    }
                    style={{
                      borderRadius: "60px",
                      height: "auto",
                      width: "6vh",
                    }}
                  />
                  <Row
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <a
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        marginLeft: "4vh",
                        fontSize: "1.8vh",
                        height: "50%",
                      }}
                      href="/profile"
                    >
                      {"@"}
                      {user.username}
                    </a>

      
                  </Row>
                  <Link
                        to={"/logout"}
                        style={{
                          color: "red",
                          fontFamily: "inherit",
                          fontSize: "1.5vh",
                          marginLeft: "-4.5vh",
                          marginTop: "3vh"

                        }}
                        
                      >
                        {"Logout"}
                      </Link>
                </Row>
              ) : (
                <Col style={{ width: "100%" }}>
                  <Row>
                    <a
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        fontSize: "2vh",
                        height: "50%",
                      }}
                      href="/login"
                    >
                      Login
                    </a>
                  </Row>
                  <Row
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <a
                      style={{
                        color: "#43494f",
                        fontFamily: "inherit",
                        fontSize: "2vh",
                        marginTop: "0.5rem",
                        height: "50%",
                      }}
                      href="/register"
                    >
                      Register
                    </a>
                  </Row>
                </Col>
              )}
            </Col>
          </Container>
          <Container style={{marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0, width: 10}}>
            <div
              style={{
                borderLeft: "1px solid #DDE2E5",
                height: "100vh",
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
