import { Card, Descriptions, Button, Tooltip, Form } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { deleteContactApi, editContactApi } from "../../Redux/contact/contactService"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ModalBox from '../ModalBox/ModalBox';
import CreateContactForm from './CreateContactForm';
import { clearSelectedContact } from '../../Redux/contact/contactSlice';

const ContactDetails = ({ contact }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null); // State to store the contact being edited
  const selectedContact = useSelector((state) => state.contact.selectedContact);  // Access selectedContact from Redux
  
  const dispatch = useDispatch()
  if (!selectedContact) {
    return <div className="font-poppins text-xs">Select a contact to view details</div>;
  }

  const onDelete = async () => {
    try {

      dispatch(deleteContactApi({ contactId: selectedContact?._id, userId: selectedContact?.userId, }));
      dispatch(clearSelectedContact());
    } catch (error) {

    }
  }

  const onEdit = async () => {
    form.resetFields(); // Reset the form fields when modal is closed
    setContactToEdit(selectedContact); // Set the contact to be edited
    setIsModalOpen(true)

  }

  const onCancel = async () => {
    setIsModalOpen(false)
    setContactToEdit(null); // Clear the contact data when modal is closed

  }
  // Watch for when the modal is open to update the form values
  if (isModalOpen && contactToEdit) {
    form.setFieldsValue({
      name: contactToEdit?.name,
      phone: contactToEdit?.phone,
      email: contactToEdit?.email,
    });
  }

  const onhandleEditContactOk=async()=>{
    try {
      
      const values = await form.validateFields()
      const { name, phone, email } = values;
      dispatch(editContactApi({ contactId: contactToEdit?._id, data: { name, phone, email }, userId: contactToEdit?.userId }));
      setIsModalOpen(false); // Close the modal after dispatching the update
      setContactToEdit(null)
    } catch (error) {
      
    }
  }

  return (
    <Card
    key={selectedContact?._id}
      size="medium"
      title={<span className="font-poppins">Contact Details</span>}
      bordered={false}
      className="rounded-xl"
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Name">
          <span className="font-poppins text-sm text-gray-600">{selectedContact?.name}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          <span className="font-poppins text-sm text-gray-600">{selectedContact?.phone}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <span className="font-poppins text-sm text-gray-600">{selectedContact?.email || 'N/A'}</span>
        </Descriptions.Item>
      </Descriptions>

      {/* Buttons Section */}
      <div className="flex justify-end gap-3 mt-6 text-xs">
        <Tooltip placement="top" title="Edit Contact">
          <Button size='small' type="primary" className="bg-blue-500 hover:bg-slate-50 font-poppins text-xs" onClick={onEdit}>
            <FaRegEdit />
          </Button>
        </Tooltip>
        <Tooltip placement="top" title="Delete Contact">
          <Button
            size='small' danger className="font-poppins text-xs"

            onClick={onDelete}
          >
            <MdOutlineDelete />
          </Button>
        </Tooltip>

        <ModalBox
          key={contactToEdit?._id} // Use the contact being edited as the key
          open={isModalOpen}
          onClose={onCancel}
          onOk={onhandleEditContactOk}
          title={<span className='text-base font-poppins'>Edit Contact</span>}
          okText="Edit"
        >
          <CreateContactForm
            key={contactToEdit?._id}
            form={form} isEdit={true} contactEditData={contactToEdit} />
        </ModalBox>

      </div>
    </Card>
  );
};

export default ContactDetails;
