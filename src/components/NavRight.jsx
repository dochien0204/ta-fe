import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavRight() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    navigate('/login');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdatePassword, setIsModalUpdatePassword] = useState(false);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ul className='navbar-nav navbar-nav-right'>
      <li className='nav-item dropdown'>
        <a
          className='nav-link count-indicator dropdown-toggle'
          id='notificationDropdown'
          href='#'
          data-toggle='dropdown'
        >
          <i className='icon-bell mx-0'></i>
          <span className='count'></span>
        </a>
        <div
          className='dropdown-menu dropdown-menu-right navbar-dropdown preview-list'
          aria-labelledby='notificationDropdown'
        >
          <p className='mb-0 font-weight-normal float-left dropdown-header'>
            Notifications
          </p>
          <a className='dropdown-item preview-item'>
            <div className='preview-thumbnail'>
              <div className='preview-icon bg-success'>
                <i className='ti-info-alt mx-0'></i>
              </div>
            </div>
            <div className='preview-item-content'>
              <h6 className='preview-subject font-weight-normal'>
                Application Error
              </h6>
              <p className='font-weight-light small-text mb-0 text-muted'>
                Just now
              </p>
            </div>
          </a>
          <a className='dropdown-item preview-item'>
            <div className='preview-thumbnail'>
              <div className='preview-icon bg-warning'>
                <i className='ti-settings mx-0'></i>
              </div>
            </div>
            <div className='preview-item-content'>
              <h6 className='preview-subject font-weight-normal'>Settings</h6>
              <p className='font-weight-light small-text mb-0 text-muted'>
                Private message
              </p>
            </div>
          </a>
          <a className='dropdown-item preview-item'>
            <div className='preview-thumbnail'>
              <div className='preview-icon bg-info'>
                <i className='ti-user mx-0'></i>
              </div>
            </div>
            <div className='preview-item-content'>
              <h6 className='preview-subject font-weight-normal'>
                New user registration
              </h6>
              <p className='font-weight-light small-text mb-0 text-muted'>
                2 days ago
              </p>
            </div>
          </a>
        </div>
      </li>
      <li className='nav-item nav-profile dropdown'>
        <a
          className='nav-link dropdown-toggle'
          href='#'
          data-toggle='dropdown'
          id='profileDropdown'
        >
          <img src='images/faces/face28.jpg' alt='profile' />
        </a>
        <div
          className='dropdown-menu dropdown-menu-right navbar-dropdown'
          aria-labelledby='profileDropdown'
        >
          <div className='dropdown-item' onClick={showModal}>
            <i className='ti-settings text-primary'></i>
            Settings
          </div>
          <div className='dropdown-item' onClick={logout}>
            <i className='ti-power-off text-primary'></i>
            Logout
          </div>
        </div>
      </li>
      <li className='nav-item nav-settings d-none d-lg-flex'>
        <a className='nav-link' href='#'>
          <i className='icon-ellipsis'></i>
        </a>
      </li>

      <Modal
        title='User information'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type='link' onClick={() => setIsModalUpdatePassword(true)}>
            Update Password?
          </Button>,
          <Button type='primary' onClick={handleOk}>
            Update user information
          </Button>,
        ]}
      >
        <Flex gap={40}>
          <Upload
            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
            listType='picture-circle'
            fileList={fileList}
          ></Upload>
          <Form
            name='trigger'
            layout='vertical'
            autoComplete='off'
            className='flex-1'
          >
            <Form.Item label='Name' name='name'>
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input placeholder='Email' />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
      <Modal
        title='Update Password'
        open={isModalUpdatePassword}
        onOk={() => setIsModalUpdatePassword(false)}
        onCancel={() => setIsModalUpdatePassword(false)}
        footer={[
          <Button
            type='primary'
            onClick={() => setIsModalUpdatePassword(false)}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          name='trigger'
          layout='vertical'
          autoComplete='off'
          className='flex-1'
        >
          <Form.Item label='Old Password' name='name'>
            <Input placeholder='Old Password' />
          </Form.Item>

          <Form.Item label='Password' name='email'>
            <Input placeholder='Password' />
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
}
