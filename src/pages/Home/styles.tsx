import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Button } from "react-bootstrap";


const Wrapper = styled(Container)`
    display: flex;
    flex-direction: row;
    
    @media only screen and (max-width: 768px){
      margin-left: 0;
      margin-right:0;
      padding-left: 0;
      padding-right:0; 
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
  }
`

const MainContent = styled(Col)`
  margin-top: 7%;
  margin-left: -5%;
`

const DesktopButton = styled(Button)`
  width: 10em;
  background-color: white;
  border-color: #4263EB;
  color: #4263EB; 
  margin-left: 45em;
`

const MobileButton = styled(Button)`
 width: 10em;
 background-color: white;
 border-color: #4263EB;
 color: #4263EB;
 margin-top: 5%;
 margin-bottom: 10%;
 margin-left: 1.6rem;
`

const FeedContent = styled(Row)`
  margin-top: 10vh;
  @media only screen and (max-width: 768px){
  margin-top: 0vh;
  }
`

const SearchBarWrapper = styled(Row)`
 width: 20em; 
 margin-left: 45rem;
 margin-bottom: 2rem;
 @media only screen and (max-width: 768px){
   display: none;
 }
`


export { Wrapper, MainContent, DesktopButton, MobileButton, FeedContent, SearchBarWrapper };