import axios from "axios";

const POST_BASE_URL = "/board/list";

export const getBoardData = async (setData) => {
  axios.get(`/board/list`).then((response) => {
    setData(response.data);
  });
};
