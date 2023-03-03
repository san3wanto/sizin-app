import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import IzinListDashboard from "../components/IzinListDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import "../components/Login";

const Dashboard = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default Dashboard;
