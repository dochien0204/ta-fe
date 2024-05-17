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
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        name: detail.name,
        description: detail.description,
      });
    } else form.resetFields();
  }, [detail]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('/api/master-data/status', {
          params: { type: 'project' },
        });

        const results = response.data?.results?.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setStatus(results);
      } catch (error) {
        notification.error({
          description: error.message || 'Có lỗi xảy ra!',
        });
      }
    })();
  }, []);

  const onCreate = async (values) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post('/api/project/create', {
        name: values.name,
        description: values.description,
        image: '',
      });
      notification.success({
        description: 'Tạo dự án thành công!',
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
      await axiosInstance.put('/api/project/update', {
        id: detail.id,
        name: values.name,
        description: values.description,
        statusId: values.status,
      });
      notification.success({
        description: 'Cập nhật dự án thành công!',
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

  console.log(status);

  return (
    <Modal
      centered
      open={createOpen}
      title='Tạo dự án'
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
            <Input size='large' placeholder='Nhập tên dự án' />
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
          {detail && (
            <Item label='Trạng thái' name='status'>
              <Select options={status} size='large' className='w-full' />
            </Item>
          )}
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

export default CreateMember;
