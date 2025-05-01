import React from 'react';
import { Form, Input } from 'antd';

const CreateContactForm = ({ form, isEdit,contactEditData }) => {
  return (
    <Form layout="vertical" form={form} size='small'  initialValues={isEdit ? {
      name: contactEditData?.name || '',
      phone: contactEditData?.phone || '',
      email: contactEditData?.email || '',
    } : {}} >
      <Form.Item
        name="name"
        label="Name"

        rules={[{ required: true, message: 'Please enter the name' }]}
        className="flex flex-col"
      >
        <Input className="px-2 py-1 border rounded-md" placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: 'Please phone number' }]}
        className="flex flex-col"
      >
        <Input className="px-2 py-1 border rounded-md" placeholder="Enter phone number" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        className="flex flex-col"
      >
        <Input className="px-2 py-1 border rounded-md" placeholder="Enter email" />
      </Form.Item>

    </Form>
  );
};

export default CreateContactForm;
