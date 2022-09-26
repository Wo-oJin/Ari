import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ link }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (link) {
      navigate(link);
    }
  }, []);

  return <>404 Not Found</>;
};

export default NotFound;
