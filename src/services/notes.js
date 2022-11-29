import axios from "axios";
import jwt_decode from "jwt-decode";

const baseUrl =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:3001/api/notes"
    : "/api/notes";

let token = null;
let id = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const setUserId = (newToken) => {
  let decoded = jwt_decode(newToken);
  console.log(decoded.id)
  id = decoded.id;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, { ...newNote, userId:id }, config);
  return request.data;
};

const update = async (id, newNote) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${id}`, newNote, config);
  return request.data;
};

const loginService = { getAll, create, update, setToken, setUserId };
export default loginService;
