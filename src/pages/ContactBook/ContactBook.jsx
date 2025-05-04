import { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import ContactList from '../../components/ContactBook/ContactList';
import ContactDetails from '../../components/ContactBook/ContactDetails';
import ModalBox from '../../components/ModalBox/ModalBox';
import CreateContactForm from '../../components/ContactBook/CreateContactForm';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createContactApi, getUserContactsApi } from '../../Redux/contact/contactService';
import { logout } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { hideLoader, showLoader } from '../../Redux/Loader/loaderSlice';

const { Sider, Content, Header } = Layout;

const ContactBook = () => {
  // UseState
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // useSelector
  const { userId, userName, email } = useSelector((state) => state.auth)
  const { userCreatedContacts } = useSelector((state) => state.contact)


  // Extract first letter of userName and capitalize it
  const userInitial = userName?.charAt(0)?.toUpperCase();



  useEffect(() => {
    // Fetch contacts from backend API
    try {
      dispatch(showLoader())
      const fetchContacts = async () => {
        const res = await dispatch(getUserContactsApi(userId));
  
      };
  
      fetchContacts();  
    } catch (error) {
      notification.error({
        message: "System Error.",
        placement: 'topRight',
      })
    }
    finally{
      dispatch(hideLoader())
    }
    
  }, [dispatch, userId]);

  const handleCreateContact = async () => {
    try {
      
      const values = await form.validateFields()
      dispatch(showLoader())
      dispatch(createContactApi({ data: values, userId }));
      setIsModalOpen(false)


    } catch (error) {
      notification.error({
        message: "System Error.",
        placement: 'topRight',
      })
    }
    finally{
      dispatch(hideLoader())
    }


  };
  const handleLogOut = async () => {
    try {
      dispatch(showLoader())
      dispatch(logout())
    } catch (error) {
      notification.error({
        message: "System Error.",
        placement: 'topRight',
      })
    }
    finally{
      dispatch(hideLoader())
    }
    navigate("/signIn")

  }

  // Profile Dropdown Menu
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogOut} key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>

      <Layout size="small" className='font-poppins h-screen'>

        <Sider width={280} theme="light" style={{ padding: 16, overflowY: 'auto' }}>
          <div className='text-center font-bold font-poppins text-2xl'>Manage Contacts</div>
          <Button type="primary" onClick={() => setIsModalOpen(true)} className="w-full mb-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md  font-poppins text-xs mt-4">
            + Create Contact
          </Button>
          <ContactList
            contacts={userCreatedContacts}
            selectedContactId={selectedContact?._id}
            onSelectContact={setSelectedContact}
          />
        </Sider>
        <Layout>
          <Header className="bg-white p-0 flex justify-end items-center pr-4">
            {/* Profile Icon as Dropdown */}
            <Dropdown overlay={menu} trigger={['click', 'hover']}>
              <Avatar size="small" icon={userInitial} className="cursor-pointer" />
            </Dropdown>
          </Header>
          <Content style={{ padding: 24 }} className="bg-slate-50 border rounded-md">

            <ContactDetails key={selectedContact?._id} contact={selectedContact} />
          </Content>
          <ModalBox
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onOk={handleCreateContact}
            title={<span className='text-base font-poppins'>Create New Contact</span>}
            okText="Create"
          >
            <CreateContactForm form={form} isEdit={false} />
          </ModalBox>
        </Layout>
      </Layout>
    </>
  );
};

export default ContactBook;
