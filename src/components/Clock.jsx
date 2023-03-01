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

  console.log(tick);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Col style={{ fontSize: 50, fontWeight: 600 }} className="text-break">{`${tick}`}</Col>
      <div>{`${dayjs().format("dddd, DD MMMM YYYY")}`}</div>
    </Container>
  );
};

export default Clock;
