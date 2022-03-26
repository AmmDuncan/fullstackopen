import axios from "axios";

const baseUrl = "http://localhost:3002/anecdotes";

const anecdoteService = {
  getAll: () => {
    return axios.get(baseUrl).then((res) => {
      return res.data;
    });
  },
  addOne: (anecdote) => {
    return axios.post(baseUrl, anecdote).then((res) => res.data);
  },
  updateOne: (id, updatedAnecdote) => {
    return axios
      .put(`${baseUrl}/${id}`, updatedAnecdote)
      .then((res) => res.data);
  },
};

export default anecdoteService;
