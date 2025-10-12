import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://3.26.65.54:4000";

export const getIdeas = async () => {
  const res = await axios.get(`${API}/api/ideas`);
  return res.data;
};

export const addIdea = async (text) => {
  const res = await axios.post(`${API}/api/ideas`, { text });
  return res.data;
};

export const upvoteIdea = async (id) => {
  const res = await axios.post(`${API}/api/ideas/${id}/upvote`);
  return res.data;
};
