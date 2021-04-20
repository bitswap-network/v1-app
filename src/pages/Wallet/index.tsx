import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import env from "../../components/data/env.json";
import { Redirect } from "react-router-dom";
import NavBar from "components/NavBar";
import { loggedInState, userState } from "store";
import { getTransactions } from "../../services/users";
import { useRecoilValue } from "recoil";
import { FiCodesandbox, FiActivity } from "react-icons/fi";
import { TransactionSchema } from "../../components/interfaces";

const Wallet = (props: any) => {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [transactions, setTransactions] = useState<TransactionSchema[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      getTransactions(user.token)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
              ? { alignSelf: "center", justifySelf: "center" }
              : { marginLeft: "8%" }
          }
          xs={window.innerWidth <= 768 ? 10 : 10}
          xl={window.innerWidth >= 1600 ? 10 : 8}
        >
          <Row style={{ marginTop: "0%" }}>
            <Col>
              <h3 style={window.innerWidth <= 768 ? { marginTop: "5%" } : {}}>
                <b>Bitswap Wallet</b>
              </h3>
              <h4
                style={
                  window.innerWidth <= 768
                    ? { marginTop: "2%", color: "#495057", fontSize: "1.35rem" }
                    : {
                        marginTop: "10%",
                        color: "#495057",
                        fontSize: "1.35rem",
                      }
                }
              >
                ACCOUNT OVERVIEW:
              </h4>
            </Col>
          </Row>
          <Row style={{ marginTop: "5%" }}>
            <Col sm={4}>
              <FiCodesandbox size={"2.2rem"} style={{ color: "#ACB5BD" }} />
              <p
                style={{
                  color: "#ACB5BD",
                  fontSize: "0.75rem",
                  marginTop: "8%",
                }}
              >
                BITCLOUT BALANCE
              </p>
              <p style={{ color: "#495057", fontSize: "1.3rem" }}>
                <b style={{ fontSize: "1.8rem" }}>
                  {(user.bitswapbalance / 1e9).toFixed(4)}
                </b>{" "}
                BTCLT
              </p>
            </Col>
            <Col sm={4}>
              <FiActivity size={"2.2rem"} style={{ color: "#ACB5BD" }} />
              <p
                style={{
                  color: "#ACB5BD",
                  fontSize: "0.75rem",
                  marginTop: "8%",
                }}
              >
                TOTAL TRANSACTIONS
              </p>
              <p style={{ color: "#495057", fontSize: "1.3rem" }}>
                <b style={{ fontSize: "1.8rem" }}>{transactions.length}</b> TRA
              </p>
            </Col>
          </Row>
          <Row style={{ marginTop: "10%" }}>
            <Col sm={2}>
              <p style={{ color: "#6494FF" }}>Deposit</p>
            </Col>
            <Col>
              <p style={{ color: "#D7DFFF" }}>Withdraw</p>
            </Col>
          </Row>
          <Row sm={2} style={{ marginLeft: "0%", marginTop: "3%" }}>
            <TextField
              id="username"
              label="Deposit Amount"
              variant="outlined"
              fullWidth={true}
              size={"small"}
              inputProps={{
                style: { fontStyle: "initial" },
              }}

              // onChange={handleNameChange}
            />
          </Row>
          <Row style={{ marginLeft: "0%", marginTop: "5%" }}>
            <Button
              style={{
                height: "100%",
                width: "30%",
                backgroundColor: "#4263EB",
                borderColor: "white",
                color: "white",
                fontSize: "0.85rem",
                padding: "1.2%",
              }}
            >
              Confirm Deposit
            </Button>
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
                width: "2rem",
              }}
            />
          </Row>
        </Col>

        <Col sm={4} style={{ marginTop: "6%" }}>
          <Row>
            <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>Transactions</h5>
          </Row>
          <Row>
            <p
              style={{
                color: "#ACB5BD",
                fontSize: "0.75rem",
                marginTop: "12%",
                marginLeft: "10%",
              }}
            >
              Amount (BCL)
            </p>
          </Row>

          {/* One Transaction */}
          <div className="scrollNoBar">
            {isLoggedIn &&
              transactions &&
              transactions.map((transaction, index) => (
                <>
                  <Row>
                    <hr
                      style={{
                        borderTop: "1px solid #DDE2E5",
                        width: "100rem",
                      }}
                    />
                  </Row>
                  <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                    <Col>
                      <p style={{ color: "#495057" }}>
                        {(transaction.bitcloutnanos / 1e9).toFixed(2)}
                      </p>
                    </Col>
                    <Col>
                      <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                        Details →
                      </p>
                    </Col>
                  </Row>
                </>
              ))}
          </div>
        </Col>
      </>
    </Container>
  );
};
export default Wallet;
export {};
