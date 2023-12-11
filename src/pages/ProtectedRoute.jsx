import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("data"));
    if (!key.name && window.location.pathname !== "/") {
      return navigate("/sign");
    } else if (key.name) {
      return navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
