import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { Button, Container, Form, InputGroup, Navbar, Nav, Modal, Spinner, Table, Badge, Alert, Accordion } from "react-bootstrap";
import logo from "../bps.png";
import Layout from "../Pages/Layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersAd, setUsersAd] = useState([]);
  const [usersTd, setUsersTd] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const togglePassword = () => setPasswordShown(!passwordShown);

  useEffect(() => {
    getUsersAda();
  }, []);

  useEffect(() => {
    getUserIzin();
  }, []);

  const getUsersAda = async () => {
    setLoading(true);
    const response = await axios.get("https://sizin-server.herokuapp.com/users/ad");
    setUsersAd(response.data);
    setLoading(false);
  };

  const getUserIzin = async () => {
    setLoading(true);
    const response = await axios.get("https://sizin-server.herokuapp.com/users/td");
    setUsersTd(response.data);
    setLoading(false);
  };

  // console.log(users);

  // function filterByStatus(user, status, role) {
  //   return user.filter(function (user) {
  //     return user.status?.includes(status) && user.role.includes(role);
  //   });
  // }
  // const Tersedia = filterByStatus(users, "Tersedia", "user");
  // const Izin = filterByStatus(users, "Izin", "user");

  // console.log(Tersedia);
  // console.log(Izin);
  // console.log(loading);
  // console.log(users[1].izin[1].ket);
  // console.log(users[1].izin[1].status);
  // console.log(usersAd);
  // console.log(usersTd);

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

  return (
    <Container fluid style={{ padding: "0" }}>
      <Navbar className="w-100" bg="primary" variant="white" sticky="top">
        <Container>
          <Navbar.Brand>
            <img alt="logo bps palu" src={logo} style={{ width: "200px" }} />
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Button variant="light" onClick={handleShow}>
              Login
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div className="columns mt-6">
        <div className="column has-background-secondary">
          <Container>
            <Modal show={show} onHide={handleClose} backdrop="static" centered>
              <Modal.Header className="d-flex flex-row justify-content-center">
                <img className="fluid" src={logo} alt="bps logo" width="200px" />
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={Auth} className="mt-lg-5 mb-lg-5">
                  {isError}
                  <Form.Group className="mb-3 mt-3" controlId="formBasicUsername">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <InputGroup>
                      <Form.Control type={passwordShown ? "text" : "password"} className="input mr-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                      <InputGroup.Text>
                        <box-icon type="solid" name={passwordShown ? "show" : "hide"} size="md color" onClick={togglePassword}></box-icon>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Alert className="d-flex flex-row justify-content-center" variant={isError ? "danger" : "light"}>
                    {isError ? message : "Masukkan Username dan Password Anda"}
                  </Alert>
                  {isLoading ? (
                    <div>
                      <Button variant="primary" className="d-flex w-100 justify-content-center mb-2" disabled>
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        Memproses...
                      </Button>
                      <Button variant="secondary" className="d-flex w-100 justify-content-center" disabled>
                        Kembali
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center mb-2">
                        Masuk
                      </Button>
                      <Button variant="secondary" className="d-flex w-100 justify-content-center" onClick={handleClose}>
                        Kembali
                      </Button>
                    </div>
                  )}
                </Form>
              </Modal.Body>
            </Modal>
            {/* <Card style={{ borderRadius: "1.5rem" }} className="d-flex align-items-center justify-content-center p-5">
          <div className="d-flex flex-column align-items-center w-50"></div>
        </Card> */}
            <div className="d-flex flex-row justify-content-around flex-wrap">
              <div className="card m-3 p-3" style={{ width: "30rem" }}>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <h2>Sedang Di Kantor</h2>
                  <h5>
                    <Badge bg="dark">
                      Jumlah <Badge bg="success">{`( ${usersAd.length} )`}</Badge>
                    </Badge>
                  </h5>
                </div>
                <hr></hr>
                {usersAd.length !== 0 ? (
                  <Table responsive striped="column">
                    <tbody>
                      {usersAd.map((user) => (
                        <tr key={user.uuid}>
                          <td>{user.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : loading === true ? (
                  <Alert variant="light" className="d-flex flex-row justify-content-center align-items-center">
                    <Spinner animation="border" variant="secondary" />
                    Memuat Data...
                  </Alert>
                ) : (
                  <Alert variant="warning" className="d-flex flex-row justify-content-center">
                    Kemana semua pegawai?
                  </Alert>
                )}
              </div>

              <div className="m-3 p-3 card" style={{ width: "30rem" }}>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <h2>Sedang Izin</h2>
                  <h5>
                    <Badge bg="dark">
                      Jumlah <Badge bg="danger">{`( ${usersTd.length} )`}</Badge>
                    </Badge>
                  </h5>
                </div>
                <hr></hr>
                {usersTd.length !== 0 ? (
                  <Table responsive striped="column">
                    <tbody>
                      {usersTd.map((user) => (
                        <tr key={user.uuid}>
                          <td>
                            <Accordion flush>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>{user.name}</Accordion.Header>
                                <Accordion.Body>
                                  <p>
                                    <strong>Keterangan Izin</strong>
                                  </p>
                                  <p>{user.izinData[0].ket}</p>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : loading === true ? (
                  <Alert variant="light" className="d-flex flex-row justify-content-center align-items-center">
                    <Spinner animation="border" variant="secondary" />
                    Memuat Data...
                  </Alert>
                ) : (
                  <Alert variant="info" className="d-flex flex-row justify-content-center">
                    Tidak Ada Izin Tercatat
                  </Alert>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default Login;
