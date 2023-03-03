import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Table, Button, Badge, Modal, Spinner } from "react-bootstrap";
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

  console.log(`Ini adalah ${user}`);
  console.log(`Ini adalah ${izin}`);
  console.log(`Sedang loading adalah ${loading}`);
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
        <Modal.Footer>
          {loading === true ? (
            <Button variant="primary" disabled>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Memproses...
            </Button>
          ) : (
            <Button variant="primary" onClick={() => doubleUp(user && user.uuid, izin[izin?.length - 1]?.uuid)}>
              Selesaikan
            </Button>
          )}
          <Button variant="danger" onClick={handleClose}>
            Batal
          </Button>
        </Modal.Footer>
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
          <Table responsive striped="columns">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
              </tr>
            </thead>
            <tbody>
              {Tersedia.map((user, index) => (
                <tr key={user.uuid}>
                  <td datalabel="No">{index + 1}</td>
                  <td datalabel="Nama">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
          <Table responsive striped="columns">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
              </tr>
            </thead>
            <tbody>
              {Izin.map((user, index) => (
                <tr key={user.uuid}>
                  <td datalabel="No">{index + 1}</td>
                  <td datalabel="Nama">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default IzinList;
