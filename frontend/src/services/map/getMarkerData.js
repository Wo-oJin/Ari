import axios from "axios";

const getMarkerData =  async() => {
  return await axios.get("/map/store")
}

export default getMarkerData