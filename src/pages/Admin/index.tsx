import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useUser, useEthPrice } from "components/hooks";
import NavBar from "components/NavBar";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import StyledContentLoader from "styled-content-loader";
import { loggedInState, userState } from "store";
import { useRecoilValue } from "recoil";
import { getLogs, getTotalVolume, getAvgPrice, getPendingTransactions } from "../../services/admin";
import TransactionModal from "../../components/modalTransactionInfo";
import { TransactionSchema } from "../../components/interfaces";



const Web3 = require("web3");

const Admin = (props: any) => {
  const user = useRecoilValue(userState);
  const { userData, isLoading, isError } = useUser(user?.token);
  const isLoggedIn = useRecoilValue(loggedInState);
  const [logs, setLogs] = useState("");
  const [logType, setLogType] = useState("out");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(null);
  const [avgprice, setAvgprice] = useState(null);
  const [pendingTransactions, setPendingTransactions] = useState(null);
  const [txnView, setTxnView] = useState<TransactionSchema>();
  const [transactionModal, setTransactionModal] = useState(false);
  const [showLogs, setShowLogs] = useState(false)



  const { etherPrice, ethIsLoading, ethIsError } = useEthPrice();

  useEffect(() => {
    getTotalVolume()
      .then((response) => {
        setVolume(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
    getAvgPrice()
      .then((response) => {
        setAvgprice(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
    getPendingTransaction()
  }, [userData]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (isLoggedIn && !isLoading) {
    if (!userData.admin) {
      console.log("not admin", userData);
      return <Redirect to="/" />;
    }
    if (isError) {
      console.log("error");
      return <Redirect to="/" />;
    }
  }

  const closeModal = () => {
    setTransactionModal(false);
  };

  const getAndSetLogs = () => {
    setShowLogs(true);
    getLogs(user.token, logType)
      .then((response) => {
        console.log(response);
        setLogs(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const getPendingTransaction = () => {
    getPendingTransactions(user.token)
    .then((resp) => {
      console.log("SUS ")
      console.log(resp)
      setPendingTransactions(resp.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <>
    <TransactionModal
          transaction={txnView}
          open={transactionModal}
          close={closeModal}
        />
    </>
    <StyledContentLoader isLoading={loading}>
      <Container
        style={
          window.visualViewport.width <= 768
            ? {
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 0,
                paddingRight: 0,
                display: "flex",
                flexDirection: "column",
              }
            : {
                display: "flex",
                flexDirection: "row",
                marginLeft: "1.3rem",
                marginRight: 0,
                paddingRight: 0,
                flex: 1,
              }
        }
      >
        <NavBar />
        <Container>
          <Row style={{ marginTop: "40px", marginBottom: "20px" }}>
            <Col>
              <h3>
                <b>Admin Panel</b>
              </h3>
            </Col>
          </Row>
          {volume && avgprice && !ethIsLoading && !ethIsError && (
            <>
              <Row>
                <Col>
                  <p>
                    Total Swaps: <b>{volume.count}</b>
                  </p>
                  <p>
                    Total Bitclout Volume:{" "}
                    <b>{volume.totalbitcloutnanos / 1e9}</b>
                  </p>
                  <p>
                    Total Ether Volume:{" "}
                    <b>{volume.totaletheramount.toFixed(6)}</b>
                  </p>
                </Col>
                <Col>
                  <p>
                    Average Bitclout Price:{" "}
                    <b>${avgprice.avgprice.toFixed(2)}</b>
                  </p>
                  <p>
                    Est. Total Bitclout Fees: <br></br>
                    <b>
                      {(volume.totalbitcloutnanos / 1e9) * 0.02} * $150 = $
                      {(volume.totalbitcloutnanos / 1e9) * 0.02 * 150}
                    </b>
                  </p>
                  <p>
                    Est. Total Ether Fees: <br></br>
                    <b>
                      {(volume.totaletheramount * 0.02).toFixed(6)} * $
                      {etherPrice.USD} = $
                      {(
                        volume.totaletheramount *
                        0.02 *
                        parseFloat(etherPrice.USD)
                      ).toFixed(2)}
                    </b>
                  </p>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col>
              <Button onClick={getAndSetLogs} size="sm">
                View Logs
              </Button>
              <Button
                onClick={() => {setLogs(null); setShowLogs(false)}}
                size="sm"
                variant="danger"
                style={{ marginLeft: "1rem" }}
              >
                Hide Logs
              </Button>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Log Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setLogType("out")}
                    active={logType === "out"}
                  >
                    out
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setLogType("pending")}
                    active={logType === "pending"}
                  >
                    pending
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setLogType("error")}
                    active={logType === "error"}
                  >
                    error
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {logType}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {logs && (
                <TextField value={logs} multiline fullWidth rowsMax={20} />
              )}
              
              {showLogs && logType == "pending" ? (     
                <div className="scrollNoBar" style={{maxHeight: "53vh", marginTop: "3%"}}>
                <b>Amount of Pending Transactions: {pendingTransactions.length}</b>
                {pendingTransactions
                  .slice(0)
                  .reverse()
                  .map((transaction, index) => (
                  <React.Fragment key={index}>
                  <Row style={{float: "left"}}>
                    <hr
                      style={{
                        borderTop: "1px solid #DDE2E5",
                        width: "40rem",
                        marginTop: "2%"

                      }}
                    />
                  </Row>
                  <Row style={{ marginTop: "6%", marginLeft: "1%" }}>
                    <Col sm={2}>
                      <p style={{ color: "#495057" }}>
                        {transaction.transactiontype}
                      </p>
                    </Col>
                    <Col sm={2}>
                        <div
                          style={{
                            borderRadius: "3px",
                            backgroundColor: "#DDE2E5",
                            textAlign: "center",
                            marginRight: "10%"
                          }}
                        >
                          <p style={{ fontSize: "0.8em", padding: "1px" }}>
                            Pending
                          </p>
                        </div>
                      
                     
                    </Col>
                    <Col sm={3}>
                        <div
                          style={{
                            borderRadius: "3px",
                            backgroundColor: "#DDE2E5",
                            textAlign: "center",
                            marginRight: "10%"
                          }}
                        >
                          <p style={{ fontSize: "0.8em", padding: "1px" }}>
                            Amount: {transaction.bitcloutnanos / 1e9} $BCLT
                          </p>
                        </div>
                      
                     
                    </Col>
                    <Col>
                    <div
                        onClick={() => {
                          setTxnView(transaction);
                          setTransactionModal(true);
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
                </React.Fragment>))}

              
            
                </div>
                
              ):(<></>)}
            
            
            </Col>
          </Row>
        </Container>
      </Container>
    </StyledContentLoader>
    </>
  );
};
export default Admin;
