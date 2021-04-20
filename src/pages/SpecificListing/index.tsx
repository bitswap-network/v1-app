import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { Redirect } from "react-router-dom";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { FiChevronsRight, FiCheck} from "react-icons/fi";


const SpecificListing = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);

 
  useEffect(() => {
   
  },);


  return (
    <Container
      style={
        window.innerWidth <= 768
          ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
          : {
              display: "flex",
              flexDirection: "row",
              marginLeft: 0,
              marginRight: "1.3rem",
              
            }
      }
    >
      <NavBar />
        <>
          <Col
            style={
              window.innerWidth > 768
                ? {marginTop: "5%"}
                : { marginLeft: "8%" }
            }
            xs={window.innerWidth <= 768 ? 10 : 10}
            xl={window.innerWidth >= 1600 ? 12 : 8}
          >
            <Row>
              <Col>
                <h3 style={window.innerWidth <= 768 ? { marginTop: "5%" } : {}}>
                  <b>My Listings</b>
                </h3>
                <h4 style={window.innerWidth <= 768 ? { marginTop: "2%", color: "#495057", fontSize: "1.35rem" } : {marginTop: "2.5%",color: "#9b9c9d", fontSize: "1.35rem"}}>
                  Listing Number: 1023
                </h4>
              </Col>
            </Row>
            <Row style={{marginTop: "5%"}}>
              <Col sm={1}>
                <FiCheck size={'2rem'} style={{ color: "white", backgroundColor: "#4263EB", borderRadius: 50/2, padding: "6px"}} />
                <div
                  style={{
                    height: "17.5vh",
                    backgroundColor: "#6494FF",
                    marginRight: 0,
                    paddingRight: 0,
                    width: "0.2rem", 
                    marginLeft: "45%",
                    justifySelf: "center"
                  }}
                />
              </Col>
              <Col sm={6}>
                  <p style={{color: "#4263EB", fontSize: "1.1rem", fontWeight: 600}}>$ETH Transfer to escrow</p>
                  <p style={{color: "#6494FF", fontSize: "0.85rem"}}>Transfer from @john.smith complete</p>
              </Col>
            </Row>
            <Row>
              <Col sm={1}>
                <FiChevronsRight size={'2rem'} style={{ color: "white", backgroundColor: "#6494FF", borderRadius: 50/2, padding: "6px"}} />
                <div
                    style={{
                      height: "49vh",
                      backgroundColor: "#6494FF",
                      marginRight: 0,
                      paddingRight: 0,
                      width: "0.2rem", 
                      marginLeft: "45%",
                      justifySelf: "center",
                      overflow: 'hidden',
                    }}
                  />
              </Col>
              <Col sm={8}>
                <p style={{color: "#6494FF", fontSize: "1.1rem", fontWeight: 600}}>$BCL Transfer to escrow</p>
                <p style={{color: "#6494FF", fontSize: "0.85rem"}}>Awaiting transfer to BitSwap Address ...</p>
                <p style={{color: "#ACB5BD", fontSize: "0.8rem", marginTop: "1rem"}}>1. Copy Bitclout Public ID into <a style={{color: "#A8C2FF", fontStyle: "italic"}} href="https://bitclout.com/browse">Bitclout Explorer</a></p>
                <p style={{color: "#ACB5BD", fontSize: "0.8rem", marginTop: "0rem"}}>2. Copy Transaction ID from Explorer</p>
                <p style={{color: "#ACB5BD", fontSize: "0.8rem", marginTop: "0rem"}}>3. Paste into input field below to verify transaction</p>
                <p style={{marginTop: "5%", color: "#ACB5BD"}}>BitClout Public ID: BC1YLiUNMPD6SS1dCzV7wocHtBr1RZ9k2DNwjRDQruBmdm4wL85e6KR</p>
                <Button
                      style={{
                        width: "40%",
                        backgroundColor: "#4263EB",
                        borderColor: 'white',
                        color: "white",
                        fontSize: "0.85rem",
                        padding: "1.2%",
                        marginTop: "2.5%"
                      }}
                    >
                      Copy Public ID
                </Button>
                <br />
                <TextField
                    id="transactiionID"
                    label="Enter Transaction ID here"
                    size={"small"}
                    fullWidth={false}
                    variant="outlined"
                    style={{marginTop: "2rem"}}
                  />
                  <Button
                      style={{
                        width: "40%",
                        backgroundColor: "#4263EB",
                        borderColor: 'white',
                        color: "white",
                        fontSize: "0.85rem",
                        padding: "1.2%",
                        marginTop: "2.1rem",
                        marginLeft: "5%"
                      }}
                    >
                      Confirm Transaction
                </Button>

              </Col>
              
            </Row>
          </Col>

          <Col>
            <Row>
              <div
                  style={{
                    borderRight: "1px solid #DDE2E5",
                    height: "100vh",
                    marginRight: 0,
                    paddingRight: 0,
                    width: "2rem"
                  }}
                />
            </Row>
          </Col>

          <Col sm={4} style={{marginTop: "6%"}}>
              <Row>
                <h5 style={{fontWeight: 600,  marginLeft: "10%"}}>Seller Found</h5>
              </Row>
              <Row>
                <p style={{color: "#ACB5BD", fontSize: "0.75rem", marginTop: "12%",  marginLeft: "10%"}}>Amount (BCL)</p>
              </Row>

              {/* One Transaction */}
              <div className="scrollNoBar">
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>
              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>40</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>


              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>40</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>


              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>4000</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>

              
              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>400000</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>

              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>400</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>


              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>120</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>


              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>420</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>

              <Row style={{marginTop: "5%", marginLeft: "4%"}}>
                <Col ><p style={{color: "#495057"}}>69</p></Col>
                <Col><p style={{color: "#4263EB", fontSize: '1rem'}}>Details →</p></Col>
              </Row>
              <Row>
                <hr style={{borderTop: "1px solid #DDE2E5", width: "100rem"}} />
              </Row>

              
              </div>
              
            

          </Col>
        </>
    </Container>
  );
};
export default SpecificListing;
export {};
