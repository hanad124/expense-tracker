import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apicalls/users";
import Login from "./Login";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { state: { from: "/" } });
  }, [navigate]);

  return <div></div>;
}
export default LandingPage;
