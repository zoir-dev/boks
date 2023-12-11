import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("data"));
    if (key !== null && window.location.pathname === "/") {
      return navigate("/sign");
    } else if (key !== null) {
      return navigate("/");
    }
  }, [window.location.pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;
