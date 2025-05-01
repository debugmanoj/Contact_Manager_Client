
import { addContact,getCreatedContact,deleteContact,editContact} from "../../services/Contacts/contact.js";
const contactRepository={
    async addContactDataApi(contactData,userId){
        try {
            const response=await addContact(contactData,userId)
            return response
        } catch (error) {
            throw error;
        }
    },
    async getContactCreatedApi(userId){
        try {
            const response=await getCreatedContact(userId)
            return response 
        } catch (error) {
            
        }
    },
    async deleteContactDataApi(contactId,data,userId){
        try {
            const response=await deleteContact(contactId,data,userId)
            return response 
        } catch (error) {
            
        }
    },
    async editContactDataApi(contactId,data,userId){
        try {
            const response=await editContact(contactId,data,userId)
            return response 
        } catch (error) {
            
        }
    },
};
export default contactRepository;