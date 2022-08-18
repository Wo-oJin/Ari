import axios from "axios";

const getMarkerData = async () => {
  axios
    .get("/map/store")
    .then((response) => {
      console.log(response.status);
      console.log(response.data);
    })
    .catch((e) => console.log("something went wrong :(", e));
};

export default getMarkerData;
