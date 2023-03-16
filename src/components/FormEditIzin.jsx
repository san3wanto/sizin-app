import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Card, Form, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import "bootstrap";

const FormEditIzin = () => {
  const [ket, setKet] = useState("");
  const [msg, setMsg] = useState("");
  const [psn, setPsn] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getIzinById = async () => {
      try {
        const response = await axios.get(`https://sizin-server.herokuapp.com/izin/${id}`);
        setKet(response.data.ket);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getIzinById();
  }, [id]);

  const updateIzin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`https://sizin-server.herokuapp.com/izin/${id}`, {
        ket: ket,
      });
      navigate("/izin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setPsn(error.response.data.msg);
        setLoading(false);
      }
    }
  };

  console.log(id);
  return (
    <Container fluid>
      <div className="d-flex flex-column mt-3 align-items-center mb-2">
        <h2>Form Edit Izin</h2>
      </div>
      <Card className="d-flex flex-column p-3 align-items-center" style={{ borderRadius: "1.2rem" }}>
        <Form onSubmit={updateIzin} className="d-flex flex-column align-items-center w-100 p-3">
          <FloatingLabel controlId="floatingTextarea" label="Keterangan Izin" className="mb-3 w-100">
            <Form.Control as="textarea" className="input" value={ket} onChange={(e) => setKet(e.target.value)} placeholder="keterangan izin" />
          </FloatingLabel>
          {loading === false ? (
            <Button type="submit" onClick={() => setMsg("")} className="Button is-success w-100">
              Simpan
            </Button>
          ) : (
            <Button variant="primary" className="d-flex w-100 justify-content-center mt-4" disabled>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              {console.log(loading)}
              Memproses...
            </Button>
          )}
          {/* <Button type="submit" className="Button is-success w-100">
            Simpan
          </Button> */}
          <Alert className="d-flex flex-column align-items-center justify-content-center mt-2 w-100" variant={psn === "Cek kembali data anda!" ? "danger" : "Light"}>
            {psn ? `${psn}` : "Masukkan keterangan izin"}
          </Alert>
        </Form>
      </Card>
    </Container>
  );
};

export default FormEditIzin;
