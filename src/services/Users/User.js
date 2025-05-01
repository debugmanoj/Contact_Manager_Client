import axiosInstance from "../../api/axiosInstance"


export const signUpUser=async(data)=>{
    const response=await axiosInstance.post("/user/signUp",data)
    return response.data
}


export const signInUser=async(data)=>{
    try {
        
        const response=await axiosInstance.post("/user/signIn",data);
        return response.data
    } catch (error) {
        return error
        
    }
}

export const forgotPassword=async(data)=>{
    try {
        
        const response=await axiosInstance.post("/user/forgotPassword",data);
        return response.data
    } catch (error) {
        return error
        
    }
}

export const resetPassword=async(data)=>{
    try {
        
        const response=await axiosInstance.post("/user/resetPassword",data);
        return response.data
    } catch (error) {
        return error
        
    }
}
