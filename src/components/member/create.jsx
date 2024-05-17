import React from 'react';
import { App, Button, Form, Image, Input, Modal, Select, Upload } from 'antd';
import { EditOutlined, FileImageOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/common';

const { Item } = Form;

const CreateMember = ({
  createOpen = false,
  detail = null,
  setCreateOpen = () => {},
  triggerCreate = () => {},
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { notification } = App.useApp();

  React.useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        name: detail.name,
        phoneNumber: detail.phoneNumber,
        email: detail.email,
        username: detail.username,
      });
    } else form.resetFields();
  }, [detail]);

  const onCreate = async (values) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post('/api/auth/register', {
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        username: values.username,
      });
      notification.success({
        description: 'Tạo người dùng thành công!',
      });
      setCreateOpen(false);
      triggerCreate();
    } catch (error) {
      notification.error({
        description: error.message || 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onUpdate = async (values) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.put('/api/user/update', {
        id: detail.id,
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        username: values.username,
      });
      notification.success({
        description: 'Cập nhật người dùng thành công!',
      });
      setCreateOpen(false);
      triggerCreate();
    } catch (error) {
      notification.error({
        description: error.message || 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onFinish = (values) => {
    if (detail) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  const onCancel = () => {
    setCreateOpen(false);
  };

  return (
    <Modal
      centered
      open={createOpen}
      title={detail ? 'Cập nhật người dùng' : 'Tạo người dùng'}
      footer={null}
      width={'40%'}
      onCancel={onCancel}
      styles={{
        header: {
          textTransform: 'uppercase',
        },
        body: {
          paddingTop: 12,
        },
      }}
    >
      <div>
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Item
            label='Tên người dùng'
            name='name'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên người dùng',
              },
            ]}
          >
            <Input size='large' placeholder='Nhập tên người dùng' />
          </Item>
          <Item
            label='Username'
            name='username'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập username',
              },
            ]}
          >
            <Input
              size='large'
              placeholder='Nhập mô username'
              disabled={detail}
            />
          </Item>

          <Item
            label='Số điện thoại'
            name='phoneNumber'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
              {
                pattern: new RegExp(/^(0\d{9}|(\+84)\d{9})$/),
                message: 'Số điện thoại chưa đúng',
              },
            ]}
          >
            <Input size='large' placeholder='Nhập số điện thoại' />
          </Item>

          <Item
            label='Email'
            name='email'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
              {
                pattern: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
                message: 'Email không đúng định dạng',
              },
            ]}
          >
            <Input size='large' placeholder='Nhập email' />
          </Item>

          <div className='flex justify-center gap-2 mt-14'>
            <Button
              size='large'
              className='w-[120px]'
              htmlType='button'
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Item>
              <Button
                size='large'
                type='primary'
                className='w-[120px]'
                htmlType='submit'
              >
                Lưu
              </Button>
            </Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateMember;
