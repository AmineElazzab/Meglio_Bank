import axios from "axios";

const API_URL = "http://localhost:8080/api/transactions/";

// Create transaction
const createTransaction = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `create-transaction`,
    data,
    config
  );

  return response.data;
};

const transactionService = {
  createTransaction,
};

export default transactionService;
