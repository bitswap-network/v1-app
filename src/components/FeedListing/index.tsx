import React from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { RiUser3Line } from "react-icons/ri";
import { ListingSchema } from "../interfaces";
import { useAppSelector } from "../../components/hooks";
import styled from "styled-components";
import { RootState } from "../../reduxStore";
import { connect } from "react-redux";
import StyledContentLoader from "styled-content-loader";
import MD5 from "crypto-js/md5";
import MediaQuery from "react-responsive";

const mapStateToProps = (state: RootState) => ({ auth: state.auth });
const Wrapper = styled.section`
  background-color: #f8f9fa;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
`;

interface FeedListing {
  listing: ListingSchema;
  index: number;
  price: number;
  loading: boolean;
  history: any;
}

function ModaltoBuy(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Listing: React.FC<FeedListing> = (
  { listing, index, price, loading, history },
  props: any
) => {
  const state = { modalOpen: false };

  const { user: currentUser } = useAppSelector(state => state.auth);
  console.log(listing);
  const viewCheck = () => {
    if (listing.processing) {
      if (currentUser.username === listing.buyer.username) {
        return false;
      } else {
        return true;
      }
    }
    if (false) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <StyledContentLoader isLoading={false}>
        <hr></hr>
        <MediaQuery query="(max-device-width: 768px)">
          <Row key={index} className="align-items-center">
            <Col
              style={{ marginRight: "0.3rem", marginLeft: "-0.3rem" }}
              xs={2}
            >
              <img
                src={`https://pbs.twimg.com/profile_images/1368690205784498177/5PkA1F5-_400x400.jpg`}
                style={{
                  borderRadius: "60px",
                  height: "auto",
                  width: "5vh",
                  marginLeft: "1.2em",
                  marginRight: "1.3rem"
                }}
              />
            </Col>
            <Col xs={4}>
              <p style={{ fontSize: "0.8rem" }} className="userNameSellFeed">
                {"@"}
                {"Sigil Wen"}
              </p>
            </Col>

            <Col xs={6}>
              <p style={{ fontSize: "0.8rem" }} className="detailsSellFeed">
                {listing.bitcloutamount} @{" "}
                {((listing.ethAmount * price) / listing.bitcloutamount).toFixed(
                  2
                )}{" "}
                $USD
              </p>
            </Col>

            <Col style={{ marginLeft: "5rem", marginTop: "3%" }}>
              <Button
                style={{
                  width: "10em",
                  height: "2.5rem",
                  backgroundColor: "#4263EB"
                }}
                onClick={() => {
                  // history.push(`/buy/${listing._id}`);
                  state.modalOpen = true;
                }}
                disabled={viewCheck()}
              >
                Buy
              </Button>
            </Col>
          </Row>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 768px)">
          <Wrapper
            key={index}
            style={{ backgroundColor: "transparent", width: "100em" }}
          >
            <Row key={index} className="align-items-center">
              <Col sm={0.2}>
                <img
                  src={`https://pbs.twimg.com/profile_images/1368690205784498177/5PkA1F5-_400x400.jpg`}
                  style={{
                    borderRadius: "60px",
                    height: "auto",
                    width: "5vh",
                    marginLeft: "1.2em",
                    marginRight: "1.3rem"
                  }}
                />
              </Col>
              <Col style={{ textAlign: "left" }} sm={2}>
                <p className="userNameSellFeed">
                  {"@"}
                  {"Sigil Wen"}
                </p>
              </Col>

              <Col style={{ textAlign: "left" }} sm={2}>
                <p className="detailsSellFeed">
                  {listing.bitcloutamount} @{" "}
                  {(
                    (listing.ethAmount * price) /
                    listing.bitcloutamount
                  ).toFixed(2)}{" "}
                  $USD
                </p>
              </Col>
              <Col style={{ textAlign: "center", marginRight: "5em" }} sm={2}>
                <p className="detailsSellFeed">{"<1 minute ago"}</p>
              </Col>
              <Col sm={0} style={{ marginLeft: "-4em" }}>
                <Button
                  style={{ width: "7em", backgroundColor: "#4263EB" }}
                  onClick={() => {
                    // history.push(`/buy/${listing._id}`);
                    state.modalOpen = true;
                  }}
                  disabled={viewCheck()}
                >
                  Buy
                </Button>
              </Col>
            </Row>
            {listing.processing && (
              <h5>Swap Ongoing w/ {listing.buyer.username}</h5>
            )}
          </Wrapper>
          <ModaltoBuy
            show={state.modalOpen}
            onHide={() => console.log("hehy")}
          />
        </MediaQuery>
      </StyledContentLoader>
    </>
  );
};
export default connect(mapStateToProps)(Listing);
