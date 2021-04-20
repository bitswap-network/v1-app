import { removeData } from "helpers/local";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { userState } from "store";

const Logout = (props: any) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser(null);
    removeData("user");
    props.history.push("/");
    window.location.reload();
  }, []);

  return (
    <div className="App">
      <Container className="p-3">Logging out...</Container>
    </div>
  );
};
export default Logout;
