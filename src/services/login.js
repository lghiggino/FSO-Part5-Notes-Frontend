import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:3001/api/login"
    : "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
