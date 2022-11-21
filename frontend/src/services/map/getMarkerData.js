import axios from "axios";

const getMarkerData = async () => {
  axios
    .get("/map/store")
    .then((response) => {})
    .catch((e) => console.log("something went wrong :(", e));
};

export default getMarkerData;
