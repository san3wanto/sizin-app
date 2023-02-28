import React from "react";
import Clock from "./Clock";
import Container from "react-bootstrap/Container";

const Welcome = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Clock />
    </Container>
  );
};

export default Welcome;
