const isPastDate = (lwd) =>{

    const today = new Date();
    const resignationDate = new Date(lwd);

    const num1 = getDateNumber(today);
    const num2 = getDateNumber(resignationDate);

    if(num1 > num2)
      return false;
    else
      return true;
};

export default isPastDate;


const getDateNumber = (date) => {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}
