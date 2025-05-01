import { List, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedContact } from '../../Redux/contact/contactSlice';

const ContactList = ({ contacts, onSelectContact, selectedContactId }) => {
  const dispatch = useDispatch();
  const handleSelectContact = (contact) => {
    dispatch(setSelectedContact(contact));  // Dispatch the selected contact to Redux
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={contacts}
      renderItem={(contact) => (
        <List.Item
        onClick={() => handleSelectContact(contact)}  // Use the dispatch action here
          className={`mt-1 cursor-pointer p-3   hover:bg-[#e6f7ff] rounded-lg`}
        >
          <List.Item.Meta
          className='ml-3'
            avatar={<Avatar>{contact?.name?.charAt(0)?.toUpperCase()}</Avatar>}
            title={contact?.name}
            description={contact?.email}
          />
        </List.Item>
      )}
    />
  );
};

export default ContactList;
