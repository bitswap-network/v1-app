import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NavBar from "components/NavBar";
import { userState, loggedInState } from "store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FiCodesandbox, FiActivity, FiX } from "react-icons/fi";
import { deposit, withdraw, getTransactions } from "services/users";
import { TransactionSchema } from "../../components/interfaces";

import TransactionModal from "../../components/modalTransactionInfo";
const Wallet = (props: any) => {
  const [transactionType, setTransactionType] = useState("Deposit");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(null);
  const [modalOpen, setOpenModal] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [txnView, setTxnView] = useState<TransactionSchema>();

  const [withdrawError, setWithdrawError] = useState(false);

  if (!isLoggedIn) {
    window.location.assign("/login");
  }

  // useEffect hook update user transactions on successful request
  useEffect(() => {
    getTransactions(user.token)
      .then(response => {
        setUser({
          ...user,
          transactions: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [successful]);

  const handleChange = e => {
    setAmount(e.target.value);
    console.log(
      parseFloat(e.target.value),
      user.bitswapbalance / 1e9,
      transactionType
    );
    if (
      transactionType === "Withdraw" &&
      parseFloat(e.target.value) > user.bitswapbalance / 1e9
    ) {
      console.log("oo");
      setWithdrawError(true);
    } else {
      setWithdrawError(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (transactionType === "Deposit") {
      deposit(user.token, amount)
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
      withdraw(user.token, amount)
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

  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <>
        <TransactionModal
          transaction={txnView}
          open={modalOpen}
          close={closeModal}
        />
      </>
      <Container
        style={
          window.innerWidth <= 768
            ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
            : {
                display: "flex",
                flexDirection: "row",
                marginLeft: "1.3rem"
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
            xl={window.innerWidth >= 1600 ? 11 : 8}
          >
            <Row style={{ marginTop: "0%" }}>
              <Col>
                <h3 style={window.innerWidth <= 768 ? { marginTop: "5%" } : {}}>
                  <b>Bitswap Wallet</b>
                </h3>
                <h4
                  style={
                    window.innerWidth <= 768
                      ? {
                          marginTop: "2%",
                          color: "#495057",
                          fontSize: "1.35rem"
                        }
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
                    marginTop: "8%"
                  }}
                >
                  TOTAL TRANSACTIONS
                </p>
                <p style={{ color: "#495057", fontSize: "1.3rem" }}>
                  <b style={{ fontSize: "1.8rem" }}>
                    {user.transactions.length}
                  </b>
                </p>
              </Col>
            </Row>
            <Row style={{ marginTop: "10%" }}>
              <Col sm={2}>
                <p
                  style={{
                    color:
                      transactionType === "Deposit" ? "#6494FF" : "#D7DFFF",
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
                    color:
                      transactionType === "Withdraw" ? "#6494FF" : "#D7DFFF",
                    cursor: "pointer"
                  }}
                  onClick={() => setTransactionType("Withdraw")}
                >
                  Withdraw
                </p>
              </Col>
            </Row>
            <Row sm={2} style={{ marginLeft: "0%", marginTop: "3%" }}>
              <Col style={{ padding: "0" }}>
                <TextField
                  id="amount"
                  label={`${transactionType} amount ($BTCLT)`}
                  variant="outlined"
                  fullWidth={true}
                  size={"small"}
                  type="number"
                  value={amount}
                  inputProps={{
                    style: { fontStyle: "initial" }
                  }}
                  onChange={handleChange}
                  error={withdrawError}
                />
              </Col>

              {transactionType === "Withdraw" && (
                <Col>
                  <Button
                    style={{
                      maxWidth: "15%",
                      backgroundColor: "#4263EB",
                      borderColor: "white",
                      color: "white",
                      fontSize: "0.85rem"
                    }}
                    onClick={() => {
                      setAmount(user.bitswapbalance / 1e9);
                    }}
                  >
                    Max
                  </Button>
                </Col>
              )}
            </Row>
            {transactionType === "Deposit" && (
              <Row style={{ marginBottom: "-3%", marginTop: "1%" }}>
                <Col>
                  <>
                    <div style={{ width: "50%", wordBreak: "break-all" }}>
                      <p style={{ color: "#495057", fontSize: "0.9rem" }}>
                        <b>Send exact amount to: </b>
                        <p style={{ color: "#495057", fontSize: "0.8rem" }}>
                          BC1YLgDkS56PRvHnmeW14u8i7PRxGnb8DGvcJYNqeuyqHe7PtmBq68r
                        </p>
                      </p>
                    </div>
                  </>
                </Col>
              </Row>
            )}
            <Row style={{ marginLeft: "0%", marginTop: "4%" }}>
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
                disabled={withdrawError}
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
              <h5 style={{ fontWeight: 600, marginLeft: "10%" }}>
                Transactions
              </h5>
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
              {user &&
                user.transactions &&
                user.transactions.map((transaction, index) => (
                  <React.Fragment key={index}>
                    <Row>
                      <hr
                        style={{
                          borderTop: "1px solid #DDE2E5",
                          width: "100rem"
                        }}
                      />
                    </Row>
                    <Row style={{ marginTop: "5%", marginLeft: "4%" }}>
                      <Col sm={3}>
                        <p style={{ color: "#495057" }}>
                          {transaction.transactiontype === "withdraw" &&
                            (transaction.bitcloutnanos / -1e9).toFixed(2)}
                          {transaction.transactiontype === "deposit" &&
                            (transaction.bitcloutnanos / 1e9).toFixed(2)}
                        </p>
                      </Col>
                      <Col sm={4}>
                        {transaction.status === "pending" && (
                          <div
                            style={{
                              borderRadius: "3px",
                              backgroundColor: "#DDE2E5",
                              textAlign: "center"
                            }}
                          >
                            <p style={{ fontSize: "0.8em", padding: "1px" }}>
                              Pending
                            </p>
                          </div>
                        )}
                        {transaction.status === "completed" && (
                          <div
                            style={{
                              borderRadius: "3px",
                              backgroundColor: "#6494FF",
                              textAlign: "center"
                            }}
                          >
                            <p
                              style={{
                                fontSize: "0.8rem",
                                padding: "3px",
                                color: "white"
                              }}
                            >
                              Completed
                            </p>
                          </div>
                        )}
                      </Col>
                      <Col>
                        <div
                          onClick={() => {
                            setTxnView(transaction);
                            setOpenModal(true);
                          }}
                        >
                          <p
                            className="hoverCursor"
                            style={{ color: "#4263EB", fontSize: "1rem" }}
                          >
                            Details →
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                ))}
            </div>
          </Col>
        </>
      </Container>
    </>
  );
};
export default Wallet;
export {};
