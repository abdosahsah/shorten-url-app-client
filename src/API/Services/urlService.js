import http from "../baseUrl";
import { setBearerToken } from "../../utils/utils";

const getAll = () => {
  setBearerToken(http);
  return http.get("/urls");
};

const getOne = (id) => {
  setBearerToken(http);
  return http.get(`/urls/${id}`);
};

const create = (data) => {
  setBearerToken(http);
  return http.post("/urls/add", data);
};

const update = (id, data) => {
  setBearerToken(http);
  return http.put(`/urls/${id}/update`, data);
};

const remove = (id) => {
  setBearerToken(http);
  return http.delete(`/urls/${id}/delete`);
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
