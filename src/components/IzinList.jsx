import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button, Modal, Spinner, Alert } from "react-bootstrap";
import "bootstrap";
import "../app.css";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const [izin, setIzin] = useState([]);
  const [show, setShow] = useState(false);
  const [idzin, setIdzin] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setIdzin(id);
    setShow(true);
    setLoading(false);
  };

  useEffect(() => {
    getIzin();
  }, []);

  const getIzin = async () => {
    const response = await axios.get("https://sizin-server.herokuapp.com/izin");
    setIzin(response.data);
    setLoading(false);
  };

  // method hapus izin
  const deleteIzin = async (izinId) => {
    setLoading(true);
    await axios.delete(`https://sizin-server.herokuapp.com/izin/${izinId}`);
    getIzin();
    setLoading(false);
    setShow(false);
  };

  return (
    <Container fluid>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Peringatan!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin menghapus data izin?</Modal.Body>
        {loading === true ? (
          <Modal.Footer>
            <Button variant="primary" disabled>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              {console.log(loading)}
              Memproses...
            </Button>
            <Button variant="danger" disabled>
              Tidak
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button variant="primary" onClick={() => deleteIzin(idzin)}>
              Ya
            </Button>
            <Button variant="danger" onClick={handleClose}>
              TidaK
            </Button>
          </Modal.Footer>
        )}
      </Modal>
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Daftar Riwayat Izin Pegawai</h2>
      </div>
      <hr></hr>
      {/* <div className="d-flex flex-column align-items-center mx-5 my-2">
        <Button size="sm">
          <Link to="/izin/add" className="d-flex flex-row align-items-center" style={{ textDecoration: "none", color: "white" }}>
            <box-icon name="plus-circle" rotate="90" color="white"></box-icon>
            Tambahkan
          </Link>
        </Button>
      </div>
      <hr></hr> */}
      <div className="mx-2">
        {izin.length !== 0 ? (
          <Table responsive striped="columns" bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Keterangan</th>
                <th>Dibuat</th>
                <th>Diselesaikan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {izin.map((izin, index) => (
                <tr key={izin.uuid}>
                  <td datalabel=" ">{index + 1}</td>
                  <td datalabel=" ">{izin.user.name}</td>
                  <td datalabel="Jabatan">{izin.user.jab}</td>
                  <td datalabel="Keterangan Izin" className="text-break">
                    {izin.ket}
                  </td>
                  <td datalabel="Dicatat">{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                  <td datalabel="Diselesaikan">{`${dayjs(izin.updatedAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                  <td datalabel="Status">{izin.status}</td>
                  <td datalabel="Aksi" className="act d-flex justify-content-around flex-wrap">
                    <Button variant="primary" size="sm" className="m-1">
                      <Link to={`/izin/edit/${izin.uuid}`} style={{ textDecoration: "none", color: "white" }}>
                        Ubah
                      </Link>
                    </Button>
                    {"   "}
                    <Button variant="danger" size="sm" onClick={() => handleShow(izin.uuid)} className="m-1">
                      Hapus
                    </Button>
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
          <Alert variant="warning" className="d-flex flex-row justify-content-center align-items-center">
            Belum Ada Ada Data Izin
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default IzinList;
