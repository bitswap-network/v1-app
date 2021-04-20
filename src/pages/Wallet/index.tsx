import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NavBar from "components/NavBar";
import { userState } from "store";
import { useRecoilState } from "recoil";
import { FiCodesandbox, FiActivity, FiX } from "react-icons/fi";
import { deposit, withdraw, getTransactions } from "services/users";

const Wallet = (props: any) => {
  const [transactionType, setTransactionType] = useState("Deposit");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(null);
  const [modalOpen, setOpenModal] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [withdrawError, setWithdrawError] = useState(false);

  // useEffect hook update user transactions on successful request
  useEffect(() => {
    getTransactions(user.token)
      .then((response) => {
        setUser({
          ...user,
          transactions: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [successful]);

  const handleChange = (e) => {
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
      deposit(amount, user.token)
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch((error) => {
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
        .catch((error) => {
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
    <>
      <Modal show={modalOpen} onHide={true}>
        <Modal.Body>
          <FiX
            size={"1rem"}
            onClick={() => {
              setOpenModal(false);
            }}
            style={{
              float: "right",
              marginRight: "0.75rem",
              marginTop: "0.5rem",
              color: "#ACB5BD",
            }}
          />
          <h4 style={{ marginTop: "1.25rem", marginLeft: "1.2rem" }}>
            <b>Transaction Details</b>
          </h4>
          <Col
            style={{
              display: "flex",
              flexDirection: "row",
              color: "#ACB5BD",
              fontSize: "0.7rem",
              marginTop: "1.5rem",
              marginLeft: "0.5rem",
            }}
          >
            <Col sm={4}>
              <Row>BUYER</Row>
              <Row>
                <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                  @john.smith
                </p>
              </Row>
            </Col>
            <Col sm={5}>
              <Row>OFFER</Row>
              <Row>
                <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                  40 @ $135.00 USD
                </p>
              </Row>
            </Col>
            <Col sm={0}>
              <Row>TIME</Row>
              <Row>
                <p style={{ fontSize: "0.75rem", color: "#495057" }}>
                  1 minute ago
                </p>
              </Row>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>

      <Container
        style={
          window.innerWidth <= 768
            ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
            : {
                display: "flex",
                flexDirection: "row",
                marginLeft: "1.3rem",
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
                      ? {
                          marginTop: "2%",
                          color: "#495057",
                          fontSize: "1.35rem",
                        }
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
                    marginTop: "8%",
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
                    cursor: "pointer",
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
                    cursor: "pointer",
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
                label={`${transactionType} amount ($BTCLT)`}
                variant="outlined"
                fullWidth={true}
                size={"small"}
                type="number"
                value={amount}
                inputProps={{
                  style: { fontStyle: "initial" },
                }}
                onChange={handleChange}
                error={withdrawError}
              />
              {transactionType === "Withdraw" && (
                <Button
                  style={{
                    maxWidth: "10%",
                    marginLeft: "3%",
                    backgroundColor: "#4263EB",
                    borderColor: "white",
                    color: "white",
                    fontSize: "0.85rem",
                  }}
                  onClick={() => {
                    setAmount(user.bitswapbalance / 1e9);
                  }}
                >
                  Max
                </Button>
              )}
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
                  width: "2rem",
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
                  marginLeft: "10%",
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
                          width: "100rem",
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
                              textAlign: "center",
                            }}
                          >
                            Pending
                          </div>
                        )}
                      </Col>
                      <Col>
                        <p style={{ color: "#4263EB", fontSize: "1rem" }}>
                          Details →
                        </p>
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
