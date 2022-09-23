const ConvertDate = (date) => {
  console.log(date);
  let convertDate;
  if (date[1] < 10 && date[2] < 10) {
    convertDate = date[0] + "/" + "0" + date[1] + "/" + "0" + date[2];
  } else if (date[1] < 10 && date[2] >= 10) {
    convertDate = date[0] + "/" + "0" + date[1] + "/" + date[2];
  } else if (date[1] >= 10 && date[2] < 10) {
    convertDate = date[0] + "/" + date[1] + "/" + "0" + date[2];
  } else {
    convertDate = date[0] + "/" + date[1] + "/" + date[2];
  }
  console.log("let", convertDate);
  return convertDate;
};

export default ConvertDate;
