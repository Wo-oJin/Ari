import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }, []);
  return <>404 Not Found</>;
};

export default NotFound;
