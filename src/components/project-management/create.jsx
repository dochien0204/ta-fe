import React from 'react';
import { App, Button, Form, Image, Input, Modal, Select, Upload } from 'antd';
import { EditOutlined, FileImageOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/common';

const { Item } = Form;

const CreateProject = ({ createOpen = false, setCreateOpen = () => {} }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { notification } = App.useApp();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('/api/user/list', {
          params: {
            page: 1,
            limit: 1000,
          },
        });
        setUsers(
          response.data.results?.map((user) => ({
            label: user.name,
            value: user.id,
          }))
        );
      } catch (error) {
        notification.error(error.message || 'Có lỗi xảy ra!');
      }
    })();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post('/api/project/create', {
        name: values.name,
        description: values.description,
        image: '',
      });
      notification.success('Tạo dự án thành công!');
    } catch (error) {
      notification.error(error.message || 'Có lỗi xảy ra!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onCancel = () => {
    setCreateOpen(false);
  };

  return (
    <Modal
      centered
      open={createOpen}
      title='Tạo dự án'
      footer={null}
      width={'60%'}
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
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
        >
          <Item
            label='Tên dự án'
            name='name'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên dự án',
              },
            ]}
          >
            <Input
              size='large'
              placeholder='Nhập tên dự án'
            />
          </Item>
          <Item
            label='Mô tả dự án'
            name='description'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả dự án',
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 4 }}
              placeholder='Nhập mô tả dự án'
            />
          </Item>
          <div className='flex justify-center gap-2'>
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

export default CreateProject;
