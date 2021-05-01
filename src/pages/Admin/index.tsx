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
import { getLogs, getTotalVolume, getAvgPrice } from "../../services/admin";

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

  const getAndSetLogs = () => {
    getLogs(user.token, logType)
      .then((response) => {
        console.log(response);
        setLogs(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
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
                onClick={() => setLogs(null)}
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
            </Col>
          </Row>
        </Container>
      </Container>
    </StyledContentLoader>
  );
};
export default Admin;
