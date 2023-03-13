import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Table, Button, Badge, Modal, Spinner, Alert, Accordion, Col, Row } from "react-bootstrap";
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
  const [usersAd, setUsersAd] = useState([]);
  const [usersTd, setUsersTd] = useState([]);

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
  // function filterByStatus(user, status, role) {
  //   return user.filter(function (user) {
  //     return user.status.includes(status) && user.role.includes(role);
  //   });
  // }
  // const Tersedia = filterByStatus(users, "Tersedia", "user");
  // const Izin = filterByStatus(users, "Izin", "user");
  // console.log(Izin.length);
  //

  const doubleUp = async (userId, izinId) => {
    setLoading(true);
    await axios.patch(`https://sizin-server.herokuapp.com/users/${userId}/status`);
    await axios.patch(`https://sizin-server.herokuapp.com/izin/${izinId}/finish`);
    getUsers();
    getIzin();
    getUsersAda();
    getUserIzin();
    setShow(false);
    setLoading(false);
  };

  // console.log(usersAd);
  // console.log(usersAd[0].izinData[usersAd[0].izinData.length]);
  // console.log(usersTd);
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
              {/* {console.log(loading)} */}
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

      <div>
        <div className="d-flex flex-row justify-content-around flex-wrap">
          {/* <div className="card m-3 p-3" style={{ width: "30rem" }}>
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
          </div> */}

          {/* <div className="m-3 p-3 card" style={{ width: "30rem" }}>
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
          </div> */}

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
              <Table responsive striped="row">
                <tbody>
                  {usersTd.map((user) => (
                    <tr key={user.uuid}>
                      <td>
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>{user.name}</Accordion.Header>
                            <Accordion.Body>
                              <Row classname="bg-secondary">
                                <Col classname="bg-secondary">
                                  <strong>Keterangan</strong>
                                </Col>
                                <Col classname="bg-secondary">{user.izinData[0].ket}</Col>
                              </Row>
                              <hr></hr>
                              <Row>
                                <Col>
                                  <strong>Dibuat</strong>
                                </Col>
                                <Col>{`${dayjs(user.izinData[0].createdAt).format("dddd, DD MM YYYY - HH:mm")}`}</Col>
                              </Row>
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
              <Table responsive striped="row">
                <tbody>
                  {usersAd.map((user) => (
                    <tr key={user.uuid}>
                      <td>
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>{user.name}</Accordion.Header>
                            <Accordion.Body>
                              <Row classname="bg-secondary">
                                <Col classname="bg-secondary">
                                  <strong>Riwayat</strong>
                                </Col>
                                <Col classname="bg-secondary">{user.izinData[0].ket}</Col>
                              </Row>
                              <hr></hr>
                              <Row>
                                <Col>
                                  <strong>Selesai</strong>
                                </Col>
                                <Col>{`${dayjs(user.izinData[0].updatedAt).format("dddd, DD MM YYYY - HH:mm")}`}</Col>
                                {console.log(user.izinData[user.izinData.length])}
                              </Row>
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
              <Alert variant="warning" className="d-flex flex-row justify-content-center">
                Kemana semua pegawai?
              </Alert>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IzinList;
