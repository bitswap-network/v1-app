import { removeData } from "helpers/local";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { userState } from "store";

const Logout = () => {
  const setUser = useSetRecoilState(userState);
  removeData("user");
  setUser(null);
  window.location.assign("/");

  return (
    <div className="App">
      <Container className="p-3">Logging out...</Container>
    </div>
  );
};
export default Logout;
