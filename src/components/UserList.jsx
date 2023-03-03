import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button, Modal } from "react-bootstrap";
import "bootstrap";
import "../app.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [usr, setUsr] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setUsr(id);
    setShow(true);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://sizin-server.herokuapp.com/users");
    setUsers(response.data);
    setLoading(false);
  };

  // method hapus izin
  const deleteUser = async (userId) => {
    setLoading(true);
    await axios.delete(`https://sizin-server.herokuapp.com/users/${userId}`);
    getUsers();
    setLoading(false);
    setShow(false);
  };

  return (
    <Container fluid>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Peringatan!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin menghapus data user?</Modal.Body>
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
            <Button variant="primary" onClick={() => deleteIzin(usr)}>
              Ya
            </Button>
            <Button variant="danger" onClick={handleClose}>
              TidaK
            </Button>
          </Modal.Footer>
        )}
      </Modal>
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Daftar User</h2>
      </div>
      <hr></hr>
      <div className="d-flex flex-column align-items-center mx-5 my-2">
        <Button size="sm">
          <Link to="/users/add" className="d-flex flex-row align-items-center" style={{ textDecoration: "none", color: "white" }}>
            <box-icon name="plus-circle" rotate="90" color="white"></box-icon>
            Tambahkan
          </Link>
        </Button>
      </div>
      <hr></hr>
      <div className="mx-2">
        {izin.length !== 0 ? (
          <Table responsive striped="columns" bordered>
            <thead>
              <tr className="">
                <th>No</th>
                <th>Nama</th>
                <th>Username</th>
                <th>NIP</th>
                <th>Jabatan</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.uuid} className="">
                  <td datalabel="No">{index + 1}</td>
                  <td datalabel="Nama" className="text-break">
                    {user.name}
                  </td>
                  <td datalabel="Username" className="text-break">
                    {user.username}
                  </td>
                  <td datalabel="NIP" className="text-break">
                    {user.nip}
                  </td>
                  <td datalabel="Jabatan">{user.jab}</td>
                  <td datalabel="Email" className="text-break">
                    {user.email}
                  </td>
                  <td datalabel="Role">{user.role}</td>
                  <td style={user.status === "Izin" ? { color: "red", fontWeight: "600" } : { color: "green", fontWeight: "600" }} datalabel="Status">
                    {user.status}
                  </td>
                  <td datalabel="Aksi" className="act d-flex justify-content-around flex-wrap">
                    <Button variant="primary" size="sm" className="m-1">
                      <Link to={`/users/edit/${user?.uuid}`} style={{ textDecoration: "none", color: "white" }}>
                        Ubah
                      </Link>
                    </Button>
                    {"   "}
                    <Button variant="danger" size="sm" onClick={() => handleShow(user.uuid)} className="m-1">
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : loading === true ? (
          <Alert variant="light" className="d-flex flex-row justify-content-center">
            <Spinner animation="border" variant="secondary" />
            Memuat Data...
          </Alert>
        ) : (
          <Alert variant="warning" className="d-flex flex-row justify-content-center">
            Belum Ada Ada Data User
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default UserList;
