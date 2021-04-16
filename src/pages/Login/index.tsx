import React, { useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { getListings } from "../../actions/auth";
import main from "../../services/main.service";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import Logo from "url:../../assets/transparentLogo.png";
import RegImage from "url:../../assets/regImage.png";

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
    return <Redirect to="/home" />;
  }

  return (
    // <Container
    //   className="p-3 align-items-center"
    //   style={{ textAlign: "center", marginTop: "20%" }}
    // >
    //   {invalid && <h5 className="error">Invalid Login</h5>}

    //   <h3>
    //     <b>Login:</b>
    //   </h3>
    //   <Row
    //     className="align-items-center"
    //     style={{ marginTop: "3%", marginBottom: "3%" }}
    //   >
    //     <Col>
    //       <TextField
    //         id="username"
    //         label="Username"
    //         variant="outlined"
    //         value={form.username}
    //         onChange={handleNameChange}
    //       />
    //     </Col>
    //   </Row>
    //   <Row
    //     className="align-items-center"
    //     style={{ marginTop: "3%", marginBottom: "3%" }}
    //   >
    //     <Col>
    //       <TextField
    //         id="password"
    //         label="Password"
    //         variant="outlined"
    //         type="password"
    //         value={form.password}
    //         onChange={handleNameChange}
    //       />
    //     </Col>
    //   </Row>
    //  
    // </Container>
    <Container style={{flexDirection: "row", display:'flex', paddingLeft: "0", marginLeft:"0"}}>
    {/* Image */}
    <Col sm={8} style={{backgroundColor:"#DBE6FF", height: "100vh", }}>
      <Row style={{paddingLeft: "40px", paddingTop: "30px"}}>
      <img
              src={Logo}
              style={{ width: "18%", height: "auto" }}
            />
      </Row>
      <Row style={{marginTop: "-90px"}}>
      <img
            src={RegImage}
            style={{ width: "100%", height: "auto", marginTop: "30px" }}
      />
      </Row>
    </Col>


    {/* Registration Form */}
    <Col sm={7} style={{paddingLeft: "6em", marginTop: "13em"}}>
      <h3>
        <b>Log In</b>
      </h3>
      <h5>
        <p style={{color: "#ACB5BD", fontSize: "0.8em", marginTop: "3%"}}>Don't have an account?   <Link to="/register" style={{ color: "#6494FF" }} replace>Create an Account</Link></p>
      </h5>
     
        <>
          <Row
            style={{ marginTop: "7%", marginBottom: "3%" }}
          >
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
          </Row>
          <Row
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
            fullWidth={true}
          />
            </Col>
          </Row>
         
      
          {/* <Row>
            <Col>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ alignItems: "right" }}
              />
              <h6>Agree to let us send emails to you.</h6>
            </Col>
          </Row> */}
      <Row>
         <Col style={{marginTop: "2%"}}>
           <Button
            onClick={handleLogin}
            style={{ height: "120%", width: "100%" }}
          >
            Login
          </Button>
        </Col>
      </Row>
        </>
       
    </Col>
    </Container>
  );
};
export default Login;
