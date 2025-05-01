
import { signInUser,signUpUser,forgotPassword,resetPassword } from "../../services/Users/User";
const UserRepository={
    async signIn(userData){
        try {
            const response=await signInUser(userData)
            return response
        } catch (error) {
            return error
        }
    },
    async signUp(userData){
        try {
            const response=await signUpUser(userData)
            return response
        } catch (error) {
            return error
        }
    },
    async forgotPassword(userData){
        try {
            const response=await forgotPassword(userData)
            return response
        } catch (error) {
            return error
        }
    },
    async resetPassword(userData){
        try {
            const response=await resetPassword(userData)
            return response
        } catch (error) {
            return error
        }
    }
};
export default UserRepository;
