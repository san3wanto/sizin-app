import React, { useEffect } from "react";
import Layout from "./Layout";
import IzinList from "../components/IzinList";
import IzinListuser from "../components/IzinListUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Izin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  // const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  //   if (user && user.role !== "admin") {
  //     navigate("/dashboard");
  //   }
  // }, [isError, user, navigate]);

  let list;

  if (user && user.role === "admin") {
    list = <IzinList />;
  } else {
    list = <IzinListuser />;
  }

  return <Layout>{list}</Layout>;
};

export default Izin;
