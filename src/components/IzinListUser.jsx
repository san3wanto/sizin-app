import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap";
import "../app.css";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const [izin, setIzin] = useState([]);
  // const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getIzin();
  }, []);

  const getIzin = async () => {
    const response = await axios.get("http://localhost:5000/izin");
    setIzin(response.data);
  };

  return (
    <Container fluid>
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Riwayat Izin</h2>
      </div>
      <hr></hr>
      <div className="d-flex flex-column align-items-center mx-5 my-2">
        <Button size="sm">
          <Link to="/izin/add" className="d-flex flex-row align-items-center" style={{ textDecoration: "none", color: "white" }}>
            <box-icon name="plus-circle" rotate="90" color="white"></box-icon>
            Tambahkan
          </Link>
        </Button>
      </div>
      <hr></hr>
      <div className="mx-2">
        <Table responsive striped="column" bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Keterangan Izin</th>
              <th>Dibuat</th>
              <th>Diubah</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((izin, index) => (
              <tr key={izin.uuid}>
                <td datalabel="No">{index + 1}</td>
                <td datalabel="Ket" className="text-break">
                  {izin.ket}
                </td>
                <td datalabel="Tanggal Dibuat">{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                <td datalabel="Waktu Dibuat">{`${dayjs(izin.updatedAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                <td datalabel="Status">{izin.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default IzinList;
