import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Table, Button, Badge, Modal, Spinner, Alert } from "react-bootstrap";
import "bootstrap";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [izin, setIzin] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getIzin();
  }, []);

  const getIzin = async () => {
    const response = await axios.get("https://sizin-server.herokuapp.com/izin");
    setIzin(response.data);
  };

  const getUsers = async () => {
    const response = await axios.get("https://sizin-server.herokuapp.com/users");
    setUsers(response.data);
    setLoading(false);
  };

  //filter kehadiran
  function filterByStatus(user, status, role) {
    return user.filter(function (user) {
      return user.status.includes(status) && user.role.includes(role);
    });
  }
  const Tersedia = filterByStatus(users, "Tersedia", "user");
  const Izin = filterByStatus(users, "Izin", "user");
  // console.log(Izin.length);
  //

  const doubleUp = async (userId, izinId) => {
    setLoading(true);
    await axios.patch(`https://sizin-server.herokuapp.com/users/${userId}/status`);
    await axios.patch(`https://sizin-server.herokuapp.com/izin/${izinId}/finish`);
    getUsers();
    getIzin();
    setShow(false);
    setLoading(false);
  };

  // console.log(`Ini adalah ${user}`);
  // console.log(`Ini adalah ${izin}`);
  // console.log(`Sedang loading adalah ${loading}`);
  // console.log(user && user.status);
  // console.log(izin[izin.length - 1]?.uuid);
  // console.log(izin[izin.length - 1]?.status);
  return (
    <Container>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Selesaikan Izin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${izin[izin?.length - 1]?.ket}`}</Modal.Body>
        {loading === true ? (
          <Modal.Footer>
            <Button variant="primary" disabled>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              {console.log(loading)}
              Memproses...
            </Button>
            <Button variant="danger" disabled>
              Batal
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button variant="primary" onClick={() => doubleUp(user && user.uuid, izin[izin?.length - 1]?.uuid)}>
              Selesaikan
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Batal
            </Button>
          </Modal.Footer>
        )}
      </Modal>
      <div>
        <hr></hr>
        {user && user.role === "user" && (
          <div className="d-flex justify-content-center">
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
      {/* <div className="d-flex flex-row justify-content-around flex-wrap">
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
      </div> */}
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Riwayat Izin</h2>
      </div>
      <div className="mx-2">
        {izin.length !== 0 ? (
          <Table responsive striped="columns" bordered>
            <thead>
              <tr>
                <th>No</th>
                {user && user.role === "admin" && <th>Nama</th>}
                <th>Keterangan Izin</th>
                <th>Dibuat</th>
                <th>Waktu </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {izin.map((izin, index) => (
                <tr key={izin.uuid}>
                  <td datalabel=" ">{index + 1}</td>
                  {user && user.role === "admin" && <td>{izin.name}</td>}
                  <td datalabel="Keterangan Izin" className="text-break">
                    {izin.ket}
                  </td>
                  <td datalabel="Tanggal Dibuat">{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                  <td datalabel="Waktu Dibuat">{`${dayjs(izin.updatedAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                  <td datalabel="Status">{izin.status}</td>
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
