import axios from "axios";

const baseURL = "http://localhost:3001";
const instance = axios.create({ baseURL });

const getAll = () => {
  return instance.get("/persons").then((res) => res.data);
};

const create = (person) => {
  return instance.post("/persons", person).then((res) => res.data);
};

const update = ({ id, ...person }) => {
  return instance.put("/persons/" + id, person).then((res) => res.data);
};

const remove = (id) => {
  return instance.delete("/persons/" + id).then((res) => res.data);
};

const notesServices = { getAll, create, remove, update };

export default notesServices;
