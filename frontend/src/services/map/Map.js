import KakaoMapScript from "../services/map/KakaoMapScript";
import React, { useEffect } from "react";

export default function Map({ onClick, name }) {
  useEffect(() => {
    KakaoMapScript();
  }, []);

  return (
    <div
      className={name}
      onClick={onClick}
      id="myMap"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
}
