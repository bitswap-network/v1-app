import React, { useState, useEffect } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { login, logout } from "../../actions/auth";
import { useAppSelector, useAppDispatch } from "../../components/hooks";
import { Redirect } from "react-router-dom";

const Logout = (props: any) => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      dispatch(logout() as any);
      props.history.push("/login");
      window.location.reload();
    } else {
      props.history.push("/login");
      window.location.reload();
    }
  }, []);
  return (
    <div className="App">
      <Container className="p-3">Logging out...</Container>
    </div>
  );
};
export default Logout;
