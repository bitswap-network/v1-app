import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import NavBar from "components/NavBar";
import { userState, loggedInState } from "store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FiCodesandbox, FiActivity, FiX, FiHelpCircle } from "react-icons/fi";
import {
  deposit,
  withdraw,
  getTransactions,
  preFlightTxn,
} from "services/users";
import { TransactionSchema } from "../../components/interfaces";
import { useUser } from "../../components/hooks";
import config from "../../helpers/config.json";
import TransactionModal from "../../components/modalTransactionInfo";

const renderTooltip = (props) => (
  <Tooltip id="wallet-tooltip" {...props}>
    This is the amount of Bitclout you have on BitSwap. You can increase the
    balance by depositing Bitclout which is required to post listings. Buying
    Bitclout on BitSwap will also add funds to your wallet. You can withdraw the
    funds at any time.
  </Tooltip>
);

const Wallet = (props: any) => {
  const [transactionType, setTransactionType] = useState("Deposit");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [modalOpen, setOpenModal] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [confirmModal, confirmModalOpen] = useState(false);
  const [txnView, setTxnView] = useState<TransactionSchema>();
  const { userData, isLoading, isError } = useUser(user?.token);
  const [withdrawError, setWithdrawError] = useState(false);
  const [fees, setFees] = useState(0);
  const [max, setMax] = useState(null);

  if (!isLoggedIn) {
    window.location.assign("/login");
  }

  // useEffect hook update user transactions on successful request
  useEffect(() => {
    // getMax();
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

  useEffect(() => {
    getMax();
  }, [isLoading]);

  const handleChange = (e) => {
    setAmount(e.target.value);
    if (
      (transactionType === "Withdraw" &&
        parseFloat(e.target.value) > userData?.bitswapbalance) ||
      e.target.value.length === 0 ||
      parseFloat(e.target.value) <= 0
    ) {
      // console.log(parseFloat(e.target.value),u)
      setWithdrawError(true);
    } else {
      setWithdrawError(false);
    }
    // console.log(amount, typeof amount);
  };

  const getMax = () => {
    if (!isLoading && !isError) {
      if (userData.bitswapbalance > 0) {
        preFlightTxn(user.token, userData.bitswapbalance)
          .then((response) => {
            // console.log(response.data);
            setMax(
              userData.bitswapbalance - parseInt(response.data.FeeNanos) / 1e9
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (transactionType === "Deposit") {
      deposit(user.token, amount)
        .then(() => {
          confirmModalOpen(false);
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
      withdraw(user.token, amount, fees)
        .then(() => {
          setSuccessful(true);
          setLoading(false);
          confirmModalOpen(false);
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
  const preFlight = () => {
    preFlightTxn(user.token, amount)
      .then((response) => {
        // console.log(response.data);
        setFees(parseInt(response.data.FeeNanos));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const closeConfirmModal = () => {
    confirmModalOpen(false);
    setError(null);
  };
  return (
    <>
      <>
        <TransactionModal
          transaction={txnView}
          open={modalOpen}
          close={closeModal}
        />
        <Modal
          show={confirmModal}
          onHide={closeConfirmModal}
          style={{ display: "flex", margin: "auto" }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body style={{ padding: "2em" }}>
            <Col style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2rem", color: "black" }}>
                Confirm {transactionType}
              </p>
            </Col>

            <Col style={{ textAlign: "center", marginTop: "2%" }}>
              {transactionType === "Withdraw" ? (
                <p style={{ fontSize: "1rem", color: "#000" }}>
                  {amount} $BCLT will be sent to ${user.username}.
                </p>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#000",
                      marginBottom: "0%",
                    }}
                  >
                    <b>Send {amount} $BCLT to:</b>
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "#495057" }}>
                    {config.bclt_address}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#000" }}>
                    Your deposit will be processed and reflect in your balance
                    1-3 minutes after being sent.
                  </p>
                </>
              )}
            </Col>

            <Col style={{ textAlign: "center", marginTop: "2%" }}>
              {transactionType === "Withdraw" && (
                <p style={{ fontSize: "0.8rem", color: "#979ca1" }}>
                  A bitclout transaction fee of ~{(fees / 1e9).toFixed(9)} $BCLT
                  will be deducted from the total.
                </p>
              )}
            </Col>

            <Row>
              <Col style={{ textAlign: "center", marginTop: "3%" }}>
                <Button
                  style={{
                    height: "100%",
                    backgroundColor: "#4263EB",
                    borderColor: "white",
                    color: "white",
                    fontSize: "0.85rem",
                    padding: "2.5%",
                    paddingLeft: "4%",
                    paddingRight: "4%",
                    marginRight: "5%",
                  }}
                  onClick={handleSubmit}
                  disabled={withdrawError}
                >
                  {loading ? "Loading..." : `Confirm ${transactionType}`}
                </Button>
                <Button
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    borderColor: "#4263EB",
                    color: "#4263EB",
                    fontSize: "0.85rem",
                    padding: "2.5%",
                    paddingLeft: "4%",
                    paddingRight: "4%",
                  }}
                  onClick={closeConfirmModal}
                  disabled={withdrawError}
                >
                  Cancel {transactionType}
                </Button>
              </Col>
            </Row>

            <Col style={{ textAlign: "center", paddingTop: "1rem" }}>
              {error && (
                <p style={{ color: "#F03D3E", fontSize: "0.8rem" }}>{error}</p>
              )}
            </Col>
          </Modal.Body>
        </Modal>
      </>
      <Container
        style={
          window.innerWidth <= 768
            ? { marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }
            : {
                display: "flex",
                flexDirection: "row",
                marginLeft: "0.3rem",
              }
        }
      >
        <NavBar />
        <>
          <Col
            style={
              window.innerWidth > 768
                ? {
                    alignSelf: "center",
                    justifySelf: "center",
                    marginLeft: "5%",
                  }
                : { marginLeft: "8%" }
            }
            xs={window.innerWidth <= 768 ? 10 : 10}
            xl={window.innerWidth >= 1600 ? 11 : 8}
          >
            <Row style={{ marginTop: "0%" }}>
              <Col>
                <h3 style={window.innerWidth <= 768 ? { marginTop: "5%" } : {}}>
                  <b>Bitswap Wallet</b>{" "}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 100, hide: 300 }}
                    overlay={renderTooltip}
                  >
                    <FiHelpCircle
                      style={
                        window.visualViewport.width > 768
                          ? { marginTop: "-8px", marginLeft: "12px" }
                          : { display: "none" }
                      }
                    />
                  </OverlayTrigger>
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
                    {userData
                      ? userData.bitswapbalance.toFixed(2)
                      : user.bitswapbalance.toFixed(2)}
                  </b>{" "}
                  BCLT
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
                    {userData
                      ? userData.transactions.length
                      : user.transactions.length}
                  </b>
                </p>
              </Col>
            </Row>
            <Row style={{ marginTop: "10%" }}>
              <Col sm={1}>
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
              <Col
                style={
                  window.visualViewport.width > 768 ? { marginLeft: "5%" } : {}
                }
              >
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
              <Col style={{ padding: "0" }}>
                <TextField
                  id="amount"
                  label={`${transactionType} amount ($BCLT)`}
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
              </Col>

              {transactionType === "Withdraw" && (
                <Col>
                  <Button
                    style={{
                      maxWidth: "100%",
                      backgroundColor: "#4263EB",
                      borderColor: "white",
                      color: "white",
                      fontSize: "0.85rem",
                    }}
                    onClick={() => {
                      setAmount(userData?.bitswapbalance);
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
                    <div style={{ width: "80%", wordBreak: "break-all" }}>
                      <p style={{ color: "#495057", fontSize: "0.9rem" }}>
                        <b>Send exact amount to: </b>
                        <p style={{ color: "#495057", fontSize: "0.8rem" }}>
                          {config.bclt_address}
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
                  padding: "1.2%",
                }}
                onClick={() => {
                  confirmModalOpen(true);
                  preFlight();
                }}
                disabled={
                  withdrawError ||
                  amount === 0 ||
                  userData?.verified !== "verified"
                }
              >
                Confirm {transactionType}
              </Button>
              {userData?.verified !== "verified" && (
                <Col>
                  <p style={{ color: "red" }}>Profile Verification Required</p>
                </Col>
              )}
            </Row>
          </Col>

          <Col>
            <Row>
              <div
                style={
                  window.visualViewport.width > 768
                    ? {
                        borderRight: "1px solid #DDE2E5",
                        height: "100vh",
                        paddingRight: 0,
                        width: "2rem",
                      }
                    : {
                        display: "none",
                      }
                }
              />
            </Row>
          </Col>

          <Col sm={4} style={{ marginTop: "6%" }}>
            <Row>
              <h5
                style={
                  window.visualViewport.width > 768
                    ? { fontWeight: 600, marginLeft: "10%" }
                    : { marginTop: "10%", fontWeight: 600, marginLeft: "10%" }
                }
              >
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
                Amount (BCLT)
              </p>
            </Row>

            {/* One Transaction */}
            <div className="scrollNoBar">
              {userData &&
                userData.transactions &&
                userData.transactions //reverses the array to show recent transactions first
                  .slice(0)
                  .reverse()
                  .map((transaction, index) => (
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
                                textAlign: "center",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "0.8rem",
                                  padding: "3px",
                                  color: "white",
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
