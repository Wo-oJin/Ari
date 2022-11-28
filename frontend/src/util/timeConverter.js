const timeConverter = (visitTime) => {
  let time = visitTime.substr(11, 18);
  let hour = Number(time.substr(0, 2));
  let min = Number(time.substr(3, 2));
  if (Number(time.substr(0, 2)) > 12) {
    hour = hour - 12;
    return `오후 ${hour}시 ${min}분`;
  }
  return `오전 ${hour}시 ${min}분`;
};
export default timeConverter;
