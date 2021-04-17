import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Button } from "react-bootstrap";


const Wrapper = styled(Container)`
    flex-direction: row;
    display: flex;
    padding-left: 0;
    margin-left: 0;
`

const LeftDisplay = styled(Col)`
  background-color: #DBE6FF;
  height: 100vh;  
  justify-content: center; 
  display:flex;
  flex-direction: column;

    
  @media only screen and (max-width: 768px){
    display: none;
  }

`

const RegArea = styled(Col)`
  padding-left: 6em;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 768px){
    padding-left: 1.8rem;
  }
`

const LogoRow = styled(Row)`
  margin-left: 5%;
  padding-top: 10%;
`
const MobileLogo = styled(Row)`
  display:none;
  @media only screen and (max-width: 768px){
    display:inline;
    margin-top: 8%;
    padding-left: 4%;
    margin-bottom: 7%;
  }
  
`

const ImageRow = styled(Row)`
  margin-top: -5%;
`

const HaveAnAccountText = styled.p`
  color: #ACB5BD; 
  font-size: 2.3vh;
  margin-top: 2%;
`


const UserField = styled(Row)`
  margin-top: 1%;
  margin-bottom: 1%;
`

const RegisterButton = styled(Button)`
  height: 80%;
  width: 90%;
  margin-top: 2%;
`
export { Wrapper, LeftDisplay, RegArea, LogoRow, ImageRow, HaveAnAccountText, UserField, RegisterButton, MobileLogo };