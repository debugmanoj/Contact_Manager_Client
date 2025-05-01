import axiosInstance from "../../api/axiosInstance"


export const addContact=async(data,userId)=>{
    const response=await axiosInstance.post(`/contacts/${userId}`,data)
    return response.data
}


export const getCreatedContact=async(userId)=>{
    const response=await axiosInstance.get(`/contacts/${userId}`)
    return response.data
}

export const deleteContact=async(contactId,userId)=>{
    const response=await axiosInstance.delete(`/contacts/${userId}/${contactId}`)
    return response.data
}

export const editContact = async (contactId, data, userId) => {
    const response = await axiosInstance.put(`/contacts/${userId}/${contactId}`, data);
    return response.data;
  };
  
