import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";

const Wrapper = styled(Container)`
  flex-direction: row;
  display: flex;
  padding-left: 0;
  margin-left: 0;
`;

const LeftDisplay = styled(Col)`
  background-color: #dbe6ff;
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex-grow: initial;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const RegArea = styled(Col)`
  padding-left: 6em;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    padding-left: 1.8rem;
  }
`;

const LogoRow = styled(Row)`
  margin-left: 5%;
  padding-top: 10%;
`;
const MobileLogo = styled(Row)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    margin-top: 8%;
    padding-left: 4%;
  }
`;

const ImageRow = styled(Row)`
  margin-top: -5%;
`;

const LoginText = styled.h3`
  font-size: 4.5vh;
  @media only screen and (max-width: 768px) {
    margin-top: 9%;
  }
`;

const RegAccountText = styled.p`
  color: #acb5bd;
  font-size: 2.3vh;
  margin-top: 3%;
`;

const UsernameRow = styled(Row)`
  margin-top: 7%;
  margin-bottom: 3%;
`;

const PasswordRow = styled(Row)`
  margin-top: 3%;
  margin-bottom: 3%;
`;

export {
  Wrapper,
  LeftDisplay,
  RegArea,
  LogoRow,
  ImageRow,
  LoginText,
  RegAccountText,
  UsernameRow,
  PasswordRow,
  MobileLogo
};
