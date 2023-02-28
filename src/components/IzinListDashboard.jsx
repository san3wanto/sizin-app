import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Table, Button, Badge } from "react-bootstrap";
import "bootstrap";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [izin, setIzin] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  const getIzin = async () => {
    const response = await axios.get("http://localhost:5000/izin");
    setIzin(response.data);
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  //filter kehadiran
  function filterByStatus(user, status, role) {
    return user.filter(function (user) {
      return user.status.includes(status) && user.role.includes(role);
    });
  }
  const Tersedia = filterByStatus(users, "Tersedia", "user");
  const Izin = filterByStatus(users, "Izin", "user");
  console.log(Izin.length);
  //

  const doubleUp = async (userId, izinId) => {
    await axios.patch(`http://localhost:5000/users/${userId}/status`);
    await axios.patch(`http://localhost:5000/izin/${izinId}/finish`);
    getUsers();
    getIzin();
    refreshPage();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getIzin();
  }, []);

  console.log(user?.uuid);
  console.log(user?.status);
  console.log(izin[izin.length - 1]?.uuid);
  console.log(izin[izin.length - 1]?.status);

  return (
    <Container>
      <div>
        <hr></hr>
        {user && user.role === "user" && (
          <div className="d-flex justify-content-center">
            {user && user.status === "Izin" ? (
              <Button onClick={() => doubleUp(user?.uuid, izin[izin?.length - 1]?.uuid)} className="btn btn-primary" style={{ fontWeight: "700" }}>
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
