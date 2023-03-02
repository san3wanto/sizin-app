import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Card, Form, FloatingLabel } from "react-bootstrap";
import "bootstrap";

const FormEditIzin = () => {
  const [ket, setKet] = useState("");
  const [msg, setMsg] = useState("");
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
    try {
      await axios.patch(`https://sizin-server.herokuapp.com/zin/${id}`, {
        ket: ket,
      });
      console.log(`ini dalam fungsi ${id}`);
      navigate("/izin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
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
          <Button type="button" className="Button is-success w-100">
            Simpan
          </Button>
          <p className="has-text-centered">{msg}</p>
        </Form>
      </Card>
    </Container>
  );
};

export default FormEditIzin;
