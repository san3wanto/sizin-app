import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Form, FloatingLabel, Spinner, Alert } from "react-bootstrap";
import "bootstrap";

const FormAddIzin = () => {
  const [ket, setKet] = useState("");
  const [msg, setMsg] = useState("");
  const [psn, setPsn] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const saveIzin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://sizin-server.herokuapp.com/izin", {
        ket: ket,
      });
      if (user && user.role === "admin") {
        navigate("/izin");
      } else {
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setPsn(error.response.data.msg);
      }
    }
    setLoading(false);
    setMsg("");
  };

  const updateUserStatus = async (userId) => {
    await axios.patch(`https://sizin-server.herokuapp.com/users/${userId}/status`);
  };
  return (
    <Container fluid>
      <div className="d-flex flex-column mt-3 align-items-center mb-2">
        <h2>Form Izin</h2>
      </div>
      <Card className="d-flex flex-column p-3 align-items-center" style={{ borderRadius: "1.2rem" }}>
        <Form onSubmit={saveIzin} className="d-flex flex-column align-items-center w-100 p-3">
          <FloatingLabel controlId="floatingTextarea" label="Keterangan Izin" className="mb-3 w-100">
            <Form.Control as="textarea" className="input" value={ket} onChange={(e) => setKet(e.target.value)} placeholder="keterangan izin" />
          </FloatingLabel>
          {loading === false && !msg ? (
            <Button type="submit" onClick={() => updateUserStatus(user && user.uuid)} className="Button is-success w-100">
              Simpan
            </Button>
          ) : (
            <Button variant="primary" className="d-flex w-100 justify-content-center mt-4" disabled>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              {console.log(loading)}
              Memproses...
            </Button>
          )}
          {/* <p className="has-text-centered">{msg}</p> */}
          <Alert className="d-flex flex-column align-items-center justify-content-center mt-2 w-100" variant={psn === "Cek kembali data anda!" ? "danger" : "Light"}>
            {psn ? `${psn}` : "Masukkan keterangan izin"}
          </Alert>
        </Form>
      </Card>
    </Container>
  );
};

export default FormAddIzin;
