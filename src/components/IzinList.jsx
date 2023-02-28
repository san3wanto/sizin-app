import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap";
import "../app.css";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const [izin, setIzin] = useState([]);

  useEffect(() => {
    getIzin();
  }, []);

  const getIzin = async () => {
    const response = await axios.get("http://localhost:5000/izin");
    setIzin(response.data);
  };

  // method hapus izin
  const deleteIzin = async (izinId) => {
    await axios.delete(`http://localhost:5000/izin/${izinId}`);
    getIzin();
  };

  return (
    <Container fluid>
      <div className="d-flex flex-column align-items-center mt-3">
        <h2>Daftar Izin</h2>
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
        <Table responsive striped="columns" bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Keterangan</th>
              <th>Dibuat</th>
              <th>Diubah</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((izin, index) => (
              <tr key={izin.uuid}>
                <td datalabel="No">{index + 1}</td>
                <td datalabel="Nama">{izin.user.name}</td>
                <td datalabel="NIP" className="text-break">
                  {izin.user.nip}
                </td>
                <td datalabel="Jabatan">{izin.user.jab}</td>
                <td datalabel="Keterangan" className="text-break">
                  {izin.ket}
                </td>
                <td datalabel="Tanggal Dibuat">{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                <td datalabel="Waktu Dibuat">{`${dayjs(izin.updatedAt).format("dddd, DD MMM YYYY - HH:mm")} WITA`}</td>
                <td datalabel="Status">{izin.status}</td>
                <td datalabel="Aksi" className="act d-flex justify-content-around flex-wrap">
                  <Button variant="primary" size="sm" className="m-1">
                    <Link to={`/izin/edit/${izin.uuid}`} style={{ textDecoration: "none", color: "white" }}>
                      Ubah
                    </Link>
                  </Button>
                  {"   "}
                  <Button variant="danger" size="sm" onClick={() => deleteIzin(izin.uuid)} className="m-1">
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

export default IzinList;
