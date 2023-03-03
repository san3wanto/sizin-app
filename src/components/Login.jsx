import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { Button, Container, Form, InputGroup, Card, Spinner, Table, Button, Badge, Alert } from "react-bootstrap";
import logo from "../bps.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    getUsersPub();
  }, []);

  const getUsersPub = async () => {
    const response = await axios.get("https://sizin-server.herokuapp.com/users/pub");
    setUsers(response.data);
    setLoading(false);
  };

  function filterByStatus(user, status, role) {
    return user.filter(function (user) {
      return user.status.includes(status) && user.role.includes(role);
    });
  }
  const Tersedia = filterByStatus(users, "Tersedia", "user");
  const Izin = filterByStatus(users, "Izin", "user");

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
      console.log(user);
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
            {isLoading ? (
              <Button variant="primary" className="d-flex w-100 justify-content-center" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Memproses...
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center">
                Masuk
              </Button>
            )}
            <h6 className="mt-4 text-center">{`${pesan}`}</h6>
          </Form>
          <div>
            <div>
              {user && user.role === "user" && (
                <div className="d-flex justify-content-center">
                  <hr></hr>
                  {user && user.status === "Izin" && izin && izin[izin?.length - 1]?.status === "Belum" ? (
                    <Button onClick={handleShow} className="btn btn-primary" style={{ fontWeight: "700" }}>
                      Selesaikan Izin
                    </Button>
                  ) : (
                    <Link to="/izin/add" className="btn btn-primary" style={{ fontWeight: "700" }}>
                      Izin Sekarang
                    </Link>
                  )}
                </div>
              )}
              <hr></hr>
            </div>
            <div className="d-flex flex-row justify-content-around flex-wrap">
              <div className="card m-3 p-3" style={{ width: "30rem" }}>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <h2>Sedang Di Kantor</h2>
                  <h5>
                    <Badge bg="dark">
                      Jumlah <Badge bg="success">{`( ${Tersedia.length} )`}</Badge>
                    </Badge>
                  </h5>
                </div>
                <hr></hr>
                {Tersedia.length !== 0 ? (
                  <Table responsive striped="column">
                    <tbody>
                      {Tersedia.map((user) => (
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
                  <Alert variant="warning">Kemana semua pegawai?</Alert>
                )}
              </div>

              <div className="m-3 p-3 card" style={{ width: "30rem" }}>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <h2>Sedang Izin</h2>
                  <h5>
                    <Badge bg="dark">
                      Jumlah <Badge bg="danger">{`( ${Izin.length} )`}</Badge>
                    </Badge>
                  </h5>
                </div>
                <hr></hr>
                {Izin.length !== 0 ? (
                  <Table responsive striped="column">
                    <tbody>
                      {Izin.map((user) => (
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
                  <Alert variant="info">Tidak Ada Izin Tercatat</Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
