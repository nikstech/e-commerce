import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// creating function
export const signupReq = async data => {
  return await axios.post(`${apiUrl}/api/signup`, data);
};

export const loginReq = async data => {
  return await axios.post(`${apiUrl}/api/signin`, data);
};
