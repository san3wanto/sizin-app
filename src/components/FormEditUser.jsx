import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LogOut, reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Container, Button, Card, Form, InputGroup } from "react-bootstrap";
import "bootstrap";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [jab, setJab] = useState("");
  const [password, setPassword] = useState([]);
  const [confPassword, setConfPassword] = useState([]);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setNip(response.data.nip);
        setUsername(response.data.username);
        setJab(response.data.jab);
        setRole(response.data.role);
        // setPassword(response.data.password);
        // setConfPassword(response.data.confPassword);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async () => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        username: username,
        email: email,
        nip: nip,
        jab: jab,
        password: password,
        confPassword: confPassword,
        role: role,
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column mt-2">
        <h2>Form User</h2>
      </div>
      <Card className="d-flex flex-column p-5" style={{ borderRadius: "1.2rem" }}>
        <Form onSubmit={updateUser}>
          <p>{msg}</p>
          <Form.Group className="mb-3" controlId="formBasicNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan Nama" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control size="md" type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNip">
            <Form.Label>NIP</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan NIP" value={nip} onChange={(e) => setNip(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicJab">
            <Form.Label>Unit Kerja</Form.Label>
            <Form.Select value={jab} onChange={(e) => setJab(e.target.value)}>
              <option>Pilih Unit Kerja Anda</option>
              <option>Pilih Unit Kerja Anda</option>
              <option value="Kepala">Kepala</option>
              <option value="Sub Bagian Tata Usaha">Sub Bagian Tata Usaha</option>
              <option value="Seksi Statistik Sosial">Seksi Statistik Sosial</option>
              <option value="Seksi Statistik Produksi">Seksi Statistik Produksi</option>
              <option value="Seksi Statistik Distribusi">Seksi Statistik Produksi</option>
              <option value="Seksi Neraca Wilayah dan Analisis Statistik">Seksi Neraca Wilayah dan Alalisis Statistik</option>
              <option value="Seksi Integrasi Pengolahan dan Diseminasi Statistik ">Seksi Integrasi Pengolahan dan Diseminasi Statistik</option>
            </Form.Select>
          </Form.Group>
          <hr></hr>
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control size="md" type={passwordShown ? "text" : "password"} placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Konfirmasi Password</Form.Label>
            <InputGroup>
              <Form.Control size="md" type={passwordShown ? "text" : "password"} placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <InputGroup.Text className="d-flex flex-row justify-content-between align-items center">
            Lihat Password
            <box-icon type="solid" name={passwordShown ? "show" : "hide"} size="md color" onClick={togglePassword}></box-icon>
          </InputGroup.Text>
          <hr></hr>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Pilih Peran Anda</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>

          {password === confPassword && password && confPassword !== "" ? (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center mt-4">
                Simpan
              </Button>
              <p className="has-text-centered">Password Cocok</p>
              {/* {console.log(`Passwordnya adalah ${password} dan confPasswordnya adalah ${confPassword}`)} */}
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center mt-4" disabled>
                Simpan
              </Button>
              <p className="has-text-centered">Password tidak cocok</p>
              {/* {console.log(`Passwordnya adalah ${password} dan confPasswordnya adalah ${confPassword}`)} */}
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
};
export default FormEditUser;
