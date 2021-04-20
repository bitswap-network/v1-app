import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NavBar from "components/NavBar";
import { userState } from "store";
import { useRecoilValue } from "recoil";
import { FiCodesandbox, FiActivity } from "react-icons/fi";
import { deposit, withdraw } from "services/users";

const Wallet = (props: any) => {
  const [transactionType, setTransactionType] = useState("Deposit");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(null);
  const user = useRecoilValue(userState);

  // useEffect hook update user transactions on successful request

  // useEffect(() => {
  //   if (successful) {
  //     // fetch transactions again
  //   }
  // }, [successful]);

  const handleChange = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (transactionType === "Deposit") {
      deposit(amount, user.token)
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("An error occurred");
          }
        });
    } else {
      withdraw(amount, user.token)
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("An error occurred");
          }
        });
    }
  };

  return (
    <Container
      style={
        window.innerWidth <= 768
          ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
          : {
              display: "flex",
              flexDirection: "row",
              marginLeft: 0,
              marginRight: "1.3rem"
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
          xl={window.innerWidth >= 1600 ? 12 : 8}
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
                        fontSize: "1.35rem"
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
                  marginTop: "8%"
                }}
              >
                BITSWAP BALANCE
              </p>
              <p style={{ color: "#495057", fontSize: "1.3rem" }}>
                <b style={{ fontSize: "1.8rem" }}>{user.bitswapbalance}</b>{" "}
                BTCLT
              </p>
            </Col>
            <Col sm={4}>
              <FiActivity size={"2.2rem"} style={{ color: "#ACB5BD" }} />
              <p
                style={{
                  color: "#ACB5BD",
                  fontSize: "0.75rem",
                  marginTop: "8%"
                }}
              >
                TOTAL TRANSACTIONS
              </p>
              <p style={{ color: "#495057", fontSize: "1.3rem" }}>
                <b style={{ fontSize: "1.8rem" }}>{user.transactions.length}</b>
              </p>
            </Col>
          </Row>
          <Row style={{ marginTop: "10%" }}>
            <Col sm={2}>
              <p
                style={{
                  color: transactionType === "Deposit" ? "#6494FF" : "#D7DFFF",
                  cursor: "pointer"
                }}
                onClick={() => setTransactionType("Deposit")}
              >
                Deposit
              </p>
            </Col>
            <Col>
              <p
                style={{
                  color: transactionType === "Withdraw" ? "#6494FF" : "#D7DFFF",
                  cursor: "pointer"
                }}
                onClick={() => setTransactionType("Withdraw")}
              >
                Withdraw
              </p>
            </Col>
          </Row>
          <Row sm={2} style={{ marginLeft: "0%", marginTop: "3%" }}>
            <TextField
              id="amount"
              label={`${transactionType} amount`}
              variant="outlined"
              fullWidth={true}
              size={"small"}
              type="number"
              value={amount}
              inputProps={{
                style: { fontStyle: "initial" }
              }}
              onChange={handleChange}
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
                padding: "1.2%"
              }}
              onClick={handleSubmit}
            >
              Confirm {transactionType}
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
                width: "2rem"
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
                marginLeft: "10%"
              }}
            >
              Amount (BTCLT)
            </p>
          </Row>

          {/* One Transaction */}
          <div className="scrollNoBar">
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>
            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>40</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>40</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>4000</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>400000</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>400</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>120</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>420</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>

            <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
              <Col>
                <p style={{ color: "#495057" }}>69</p>
              </Col>
              <Col>
                <p style={{ color: "#4263EB", fontSize: "1rem" }}>Details →</p>
              </Col>
            </Row>
            <Row>
              <hr style={{ borderTop: "1px solid #DDE2E5", width: "100rem" }} />
            </Row>
          </div>
        </Col>
      </>
    </Container>
  );
};
export default Wallet;
export {};
