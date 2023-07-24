import axios from "axios";
import { Header } from "../helper/requestHeader";

const apiUrl = process.env.REACT_APP_API_URL;

// createCategory function
export const createCategory = async data => {
  const { cName, cDescription, cImage, cStatus } = data;

  const formData = new FormData();
  formData.append("cImage", cImage);
  formData.append("cName", cName);
  formData.append("cDescription", cDescription);
  formData.append("cStatus", cStatus);

  return await axios.post(
    `${apiUrl}/api/category/add-category`,
    formData,
    Header()
  );
};

export const getAllCategory = async () => {
  return await axios.get(`${apiUrl}/api/category/all-category`, Header());
};

export const deleteCategory = async cId => {
  return await axios.post(
    `${apiUrl}/api/category/delete-category`,
    { cId },
    Header()
  );
};

export const editCategoryReq = async (cId, des, status) => {
  let data = { cId: cId, cDescription: des, cStatus: status };
  return await axios.post(
    `${apiUrl}/api/category/edit-category`,
    data,
    Header()
  );
};
