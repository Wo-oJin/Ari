import axios from "axios";

export default async function getMarkerData() {
  try {
    const data = await axios.get("/map/store");
    return data;
  } catch (e) {
    console.error(e);
  }
}
