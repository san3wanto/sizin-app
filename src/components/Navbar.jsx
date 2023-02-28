import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../bps.png";

const NavB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="white" className="sticky-top">
      <Container>
        <Navbar.Brand>
          <img alt="logo bps palu" src={logo} style={{ width: "200px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white size-sm" />
        <Navbar.Collapse id="responsive-navbar-nav" className="">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link to={"/dashboard"} className="nav-link text-white" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
            {user && user.role === "admin" && (
              <Nav>
                <Link to={"/users"} className="nav-link text-white" style={{ textDecoration: "none" }}>
                  Pegawai
                </Link>
              </Nav>
            )}
            <Link to={"/izin"} className="nav-link text-white" style={{ textDecoration: "none" }}>
              Izin
            </Link>
            <NavDropdown title={`${user && user.name} (${user && user.role})`} id="collasible-nav-dropdown" className="d-flex flex-column align-items-center rounded mx-2 p-1 bg-white">
              <NavDropdown.Item className="d-flex justify-content-center rounded p-1 text-danger font-weight-bold" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavB;
