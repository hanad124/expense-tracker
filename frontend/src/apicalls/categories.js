const { axiosInstance } = require(".");

export const addCategory = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/categories/addCategory",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editCategory = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/categories/editCategory",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCategory = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/categories/deleteCategory",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategories = async (payload) => {
  try {
    // const response = await axiosInstance.get(
    //   "/api/categories/getCategories",
    //   payload
    // );
    const response = await axiosInstance.post(
      "/api/categories/getAllcategoriesOfUser"
      // payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
