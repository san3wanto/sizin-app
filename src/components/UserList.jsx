import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap";
import "../app.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  // method hapus izin
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <Container fluid>
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
        <Table responsive striped="columns" bordered>
          <thead className="">
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
                  <Button variant="danger" size="sm" onClick={() => deleteUser(user.uuid)} className="m-1">
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UserList;
