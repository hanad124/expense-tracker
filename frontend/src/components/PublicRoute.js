import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  if (localStorage.getItem("token")) {
    return null;
  }

  return (
    <div fluid={true} className="register m-0 p-0">
      {children}
    </div>
  );
}

export default PublicRoute;
