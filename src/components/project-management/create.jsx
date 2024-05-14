import React from 'react';
import { Button, Form, Image, Input, Modal, Upload } from 'antd';
import {
  EditOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Item } = Form;

const CreateProject = ({ createOpen = false, setCreateOpen = () => {} }) => {
  const [form] = Form.useForm();
  const [fileImage, setFileImage] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log();
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
          layout='vertical'
          onValuesChange={onValuesChange}
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

          <Item
            label='Hình ảnh'
            name='image'
          >
            <label className='w-[100px] h-[100px] rounded-md border flex justify-center items-center overflow-hidden'>
              <input
                accept='image/*'
                name='image'
                type='file'
                hidden
                onChange={onChangeFile}
              />
              {image ? (
                <div className='relative group'>
                  <Image
                    width={100}
                    height={100}
                    preview={false}
                    src={image}
                  />
                  <div className='absolute inset-0 bg-black/10 hidden group-hover:flex justify-center items-center cursor-pointer'>
                    <EditOutlined className='text-xl text-red-700' />
                  </div>
                </div>
              ) : (
                <FileImageOutlined className='text-3xl text-gray-500' />
              )}
            </label>
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
