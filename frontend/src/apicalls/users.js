import { axiosInstance } from ".";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const sendPasswordResetLink = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/send-password-reset-link",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/reset-password",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyemail = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/verifyemail",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyemaillink = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/verifyEmailLink",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserName = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-name",
      payload
    );
    console.log(response);
    // return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserInfo = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-info",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserEmail = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-email",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserPassword = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-password",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
