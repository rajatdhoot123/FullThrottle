import axios from "axios";

const LoanUrl = "https://ftl-frontend-test.herokuapp.com/interest";

export const calculateLoan = ({ month = 10, amount = 500 }) => {
  return axios.get(`${LoanUrl}?amount=${amount}&numMonths=${month}`);
};
