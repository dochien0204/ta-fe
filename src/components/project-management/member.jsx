import React from 'react';
import { App, Button, Form, Modal, Select } from 'antd';
import { ExclamationCircleFilled, UserAddOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../api';

const { Item } = Form;

const ItemAddMember = ({ users, roles, onDelete }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} name={Math.random()}>
      <div className='flex gap-4 items-start'>
        <Item className='flex-1' name='member'>
          <Select options={users} size='large' placeholder='Chọn member' />
        </Item>
        <Item className='flex-1' name='role'>
          <Select options={roles} size='large' placeholder='Chọn quyền' />
        </Item>
        <div className='flex gap-2 items-start'>
          <Button size='large' htmlType='submit' type='primary'>
            Lưu
          </Button>
          <Button size='large' htmlType='button'>
            Hủy
          </Button>
          <Button size='large' htmlType='button' danger onClick={onDelete}>
            Xóa
          </Button>
        </div>
      </div>
    </Form>
  );
};

const AddMemberProject = ({
  addMemberOpen = false,
  detail = null,
  setAddMember = () => {},
}) => {
  const { notification, modal } = App.useApp();
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [members, setMembers] = React.useState([]);

  const onCancel = () => {
    setAddMember(false);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('/api/user/list', {
          params: {
            page: 1,
            size: 1000,
          },
        });
        setUsers(
          response.data?.results?.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      } catch (error) {
        notification.error({
          description: error.message ?? 'Có lỗi xảy ra!',
        });
      }
    })();
    (async () => {
      try {
        const response = await axiosInstance.get('/api/role/get-by-type', {
          params: { type: 'project' },
        });
        setRoles(
          response.data?.results?.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      } catch (error) {
        notification.error({
          description: error.message ?? 'Có lỗi xảy ra!',
        });
      }
    })();
  }, []);

  const onAddMember = () => {
    setMembers((current) => [
      ...current,
      {
        key: Math.random(),
        member: undefined,
        role: undefined,
      },
    ]);
  };

  const onDelete = (item) => {
    return () => {
      modal.confirm({
        title: 'Xóa member',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn có chắc chắn muốn member?',
        okText: 'Xác nhận',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() {
          setMembers((current) =>
            current.filter((element) => item.key !== element.key)
          );
        },
      });
    };
  };

  return (
    <Modal
      centered
      open={addMemberOpen}
      title='Thêm người vào dự án'
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
      <div className='flex flex-col min-h-[40vh]'>
        {members.map((item) => (
          <ItemAddMember
            key={item.key}
            {...item}
            users={users}
            roles={roles}
            onDelete={onDelete(item)}
          />
        ))}
        <Button
          className='flex items-center w-fit mt-4'
          size='large'
          type='primary'
          htmlType='button'
          onClick={onAddMember}
        >
          <UserAddOutlined /> Add member
        </Button>
      </div>
    </Modal>
  );
};

export default AddMemberProject;
