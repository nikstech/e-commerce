import axios from "axios";
import { Header } from "../helper/requestHeader";

const apiUrl = process.env.REACT_APP_API_URL;

export const createProduct = async data => {
  let {
    pName,
    pDescription,
    pImage,
    pStatus,
    pCategory,
    pQuantity,
    pPrice,
    pOffer,
  } = data;

  let formData = new FormData();

  for (const file of pImage) {
    formData.append("pImage", file);
  }

  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  return await axios.post(`${apiUrl}/api/product/add-product/`, formData);
};

export const getAllProduct = async () => {
  return await axios.get(
    `${apiUrl}/api/product/all-product/`
    //  Header()
  );
};

export const deleteProduct = async pId => {
  return await axios.post(
    `${apiUrl}/api/product/delete-product`,
    { pId },
    Header()
  );
};

export const editProductReq = async product => {
  let formData = new FormData();

if(product.pEditImages){  
  for (const file of product.pEditImages) {
    formData.append("pEditImages", file);
  }
}

  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);

  return await axios.post(`${apiUrl}/api/product/edit-product`, formData);
};
