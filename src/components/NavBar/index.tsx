import React, { useState } from "react";
import { Row, Container, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../../components/hooks";
import Logo from "url:../../assets/bitswap.png";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FiHome, FiUploadCloud, FiInbox } from "react-icons/fi"
import MD5 from "crypto-js/md5";



const NavElement = (props: any) => {
  return (
    <div
      style={{
        margin: "0%",
        marginRight: "15%",
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
      
      {props.label == "Home" ? (<><FiHome size={20} style={{color: "#43494f"}} /></>) : (<> </>)}
      {props.label == "Post" ? (<><FiUploadCloud size={20} style={{color: "#43494f"}} /></>) : (<> </>)}
      {props.label == "  Listings" ? (<><FiInbox size={20} style={{color: "#43494f"}} /></>) : (<> </>)}
      <Link to={props.linkto} style={{color: "#43494f", fontFamily: "inherit"}} replace>
        {props.label}
      </Link>
    </div>
  );
};

export const NavBar: React.FC = (props: any) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  console.log(currentUser);
  return (
    <>
      <Container
        style={{ flexDirection: "column", marginTop: "5px", textAlign: "right", height:"90vh", display:'flex' }}
      >
        <Row style={{ marginTop: "5px", height: "10%" }}>
          <img
            src={Logo}
            style={{ width: "100%", height: "auto", marginTop: "10px" }}
          />
        </Row>
        {/* Login Button */}
        {/* <Row
          style={{
            backgroundColor: "#f8f9fa",
            padding: "3px",
            borderRadius: "10px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {isLoggedIn ? (
            <p className="usernameNav">
              <Link to="/profile" style={{ color: "black" }} replace>
                {currentUser.username}
              </Link>
            </p>
          ) : (
            <p className="usernameNav">-/-</p>
          )}
        </Row> */}
        <Col style={{alignContent: "center", paddingTop: "25vh"}}>
        <Row className="navRow">
          

          <NavElement
            label="Home"
            linkto="/"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Row>

        {isLoggedIn ? (
          <>
            <Row className="navRow"  style={{paddingTop: "2vh"}}>
              <NavElement
                label="Post"
                linkto="/postad"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Row>
            <Row className="navRow" style={{paddingTop: "4vh"}}>
              <NavElement
                label="  Listings"
                linkto="/userlistings"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Row>
            {/* <Row className="navRow">
              <NavElement
                label="Profile"
                linkto="/profile"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Row>
            <Row className="navRow">
              <NavElement
                label="Logout"
                linkto="/logout"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Row> */}
            {/* {currentUser.admin && (
              <Row className="navRow">
                <NavElement
                  label="Admin"
                  linkto="/admin"
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Row>
            )} */}
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

        <Row style={{paddingTop: "35vh", width:"150%"}}>
          <img
            src={`https://gravatar.com/avatar/${MD5(
              currentUser.email.toLowerCase()
            ).toString()}?s=120&d=mp`}
            style={{ borderRadius: "60px", height: "6vh", width:"6vh" }}
          />
          <Row style={{flexDirection: "column", display:"flex", alignItems: "flex-start"}}>
            <Link to={"/profile"} style={{color: "#43494f", fontFamily: "inherit", marginLeft: "4vh", fontSize: "1.8vh", height: "50%"}} replace>
            {"@"}{currentUser.username}
            </Link>
            <Link to={"/logout"} style={{color: "red", fontFamily: "inherit", marginLeft: "4vh", fontSize: "1.5vh", height: "50%"}} replace>
              {"    Logout"}
            </Link>
          </Row>
        </Row>
        </Col>
        
      </Container>
    </>
  );
};
export default NavBar;
