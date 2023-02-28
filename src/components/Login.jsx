import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { Button, Container, Form, InputGroup, Card } from "react-bootstrap";
import logo from "../bps.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  let pesan = (pesan) => {
    if (isError) {
      pesan = message;
    } else {
      pesan = "Masukkan username dan password";
    }
    return pesan;
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  if (isError) {
    pesan = message;
  } else {
    pesan = "Masukkan Username dan Password";
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "grey" }}>
      <Card style={{ borderRadius: "1.5rem" }} className="d-flex align-items-center justify-content-center p-5">
        <div className="d-flex flex-column align-items-center w-50">
          <Form onSubmit={Auth} className="mt-lg-5 mb-lg-5">
            <img className="fluid" src={logo} alt="bps logo" width="250px" />
            {isError}
            <Form.Group className="mb-3 mt-3" controlId="formBasicUsername">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <InputGroup>
                <Form.Control type={passwordShown ? "text" : "password"} className="input mr-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                <InputGroup.Text>
                  <box-icon type="solid" name={passwordShown ? "show" : "hide"} size="md color" onClick={togglePassword}></box-icon>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center">
              {isLoading ? "Loading... " : "Login"}
            </Button>
            <h6 className="mt-4 text-center">{`${pesan}`}</h6>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
