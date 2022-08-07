import KakaoMapScript from "./KakaoMapScript";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Map = ({ onClick, name }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getMarkerData = async () => {
      axios
        .get("/map/store")
        .then((response) => {
          console.log(response.status);
          console.log(response.data.storeList);
          // setData(response.data.storeList);
          // console.log(data)
          KakaoMapScript(response.data.storeList);
        })
        .catch((e) => console.log("something went wrong :(", e));
    };
    getMarkerData().then(()=> {
      console.log("hi",data)
    });
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

export default Map;
