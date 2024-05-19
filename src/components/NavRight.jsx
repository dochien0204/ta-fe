import { Button, Flex, Form, Image, Input, Modal, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setLoading } from '../slices/common';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function NavRight() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    navigate('/login');
  };

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdatePassword, setIsModalUpdatePassword] = useState(false);

  const [imageUrl, setImageUrl] = useState();

  const handlePreview = async (file) => {
    debugger;
    if (!file.url && !file.preview) {
      file.preview = getBase64(file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  const [userProfile, setUserProfile] = useState();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAvatarUser = (avatar) => {
    const userId = localStorage.getItem('userId');

    return axiosInstance.get('/api/user/get-avatar', {
      params: {
        userId,
        avatar,
      },
    });
  };

  const getUserProfile = async () => {
    const userId = localStorage.getItem('userId');
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.get('/api/user/profile', {
        params: {
          userId,
        },
      });

      const responseGetAvatar = await getAvatarUser(
        response.data.result.avatar
      );

      setUserProfile({
        ...response.data.result,
        avatarUrl: responseGetAvatar.data.results.url,
      });
      setImageUrl(responseGetAvatar.data.results.url);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Get user profile failed. Please try again later!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [isModalOpen]);

  return (
    <>
      {contextHolder}
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
          <Flex gap={40} align='flex-start'>
            {/* <div className='relative'>
              <Image
                width={120}
                height={120}
                preview={false}
                src={userProfile?.avatarUrl}
                className='rounded-full'
                alt='avatar'
              />
              <label className='absolute left-1/2 -translate-x-[50%] bottom-4 w-[25px] h-[25px] rounded-full bg-blue-500/90 flex items-center justify-center cursor-pointer'>
                <EditOutlined size={20} style={{ color: 'white' }} />
              </label>
            </div> */}
            <Upload
              name='avatar'
              listType='picture-circle'
              className='avatar-uploader'
              showUploadList={false}
              onPreview={handlePreview}
              action={(file) => {
                debugger;
              }}
            >
              <Image
                preview={false}
                src={imageUrl}
                className='rounded-full'
                alt='avatar'
              />
            </Upload>
            <Form
              name='trigger'
              layout='vertical'
              autoComplete='off'
              className='flex-1'
            >
              <Form.Item
                label='Username'
                name='username'
                initialValue={userProfile?.username}
              >
                <Input placeholder='Username' disabled />
              </Form.Item>

              <Form.Item
                label='Name'
                name='name'
                initialValue={userProfile?.name}
              >
                <Input placeholder='Name' />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                initialValue={userProfile?.email}
              >
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item
                label='Address'
                name='address'
                initialValue={userProfile?.address}
              >
                <Input placeholder='Address' />
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
    </>
  );
}
