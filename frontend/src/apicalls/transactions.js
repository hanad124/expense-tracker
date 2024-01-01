const { axiosInstance } = require(".");

export const addTransaction = async(payload) => {
    try{
      const response = await axiosInstance.post('/api/transactions/addTransaction',payload);
      return response.data
    }
    catch(error){
      return error.response.data
    }
}


export const editTransaction = async(payload) => {
  try{
    const response = await axiosInstance.put('/api/transactions/editTransaction',payload);
    return response.data
  }
  catch(error){
    return error.response.data
  }
}


export const deleteTransaction = async(payload) => {
  try{
    const response = await axiosInstance.post('/api/transactions/deleteTransaction',payload);
    return response.data
  }
  catch(error){
    return error.response.data
  }
}

export const getAllTransactionsOfUser = async(payload) => {
    try{
      const response = await axiosInstance.post('/api/transactions/getAllTransactionsOfUser',payload);
      return response.data
    }
    catch(error){
      return error.response.data
    }
}