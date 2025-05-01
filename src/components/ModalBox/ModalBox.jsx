import React from 'react';
import { Modal } from 'antd';

const ModalBox = ({ open, onClose, onOk, title, children, okText = "Submit" }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onOk}
      footer={null} // we will handle footer manually
      centered
      closeIcon={false}
      width={350}
      className="rounded-lg overflow-hidden font-poppins" // Tailwind only
    >
      <div className="flex flex-col p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="flex flex-col space-y-4">{children}</div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs"
            onClick={onOk}
          >
            {okText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBox;
