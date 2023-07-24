import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const uploadSlideImage = async formData => {
    return await axios.post(
        `${apiURL}/api/customize/upload-slide-image`,
        formData
    );
};

export const getSlideImage = async() => {
    return await axios.get(`${apiURL}/api/customize/get-slide-image`);
};

export const deleteSlideImage = async id => {
    return await axios.post(`${apiURL}/api/customize/delete-slide-image`, { id });
};