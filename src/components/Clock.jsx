import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const Clock = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(() => dayjs().format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Col style={{ fontSize: 80, fontWeight: 600 }} className="text-break">{`${dayjs().format("HH:mm:ss")}`}</Col>
      <div>{`${dayjs().format("dddd, DD MMM YYYY")}`}</div>
    </Container>
  );
};

export default Clock;
