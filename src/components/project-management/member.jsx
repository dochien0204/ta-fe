import React from 'react';
import { App, Button, Form, Modal, Select } from 'antd';
import { ExclamationCircleFilled, UserAddOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/common';

const { Item } = Form;

const AddMemberProject = ({
  addMemberOpen = false,
  detail = null,
  setAddMember = () => {},
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    if ((addMemberOpen, detail)) {
      (async () => {
        try {
          dispatch(setLoading(true));
          const response = await axiosInstance.get(
            '/api/project/task/list-member',
            {
              params: { projectId: detail.id },
            }
          );
          const results = [];

          response?.data?.results?.forEach((item) => {
            results.push({
              key: item.user?.id,
              member: item.user?.id,
              role: item.user?.category?.id,
            });
            form.setFieldValue(item?.user?.id, {
              member: item.user?.id,
              role: item.user?.category?.id,
            });
          });

          setMembers(results);
        } catch (error) {
          notification.error({
            description: error.message ?? 'Có lỗi xảy ra!',
          });
        } finally {
          dispatch(setLoading(false));
        }
      })();
    }
  }, [detail, addMemberOpen]);

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

  const onSave = async (values) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post('/api/project/add-member', {
        listUserRole: handlePayload(values),
        projectId: detail?.id,
      });
      notification.success({
        description: 'Thêm người vào dự án thành công!',
      });
      setAddMember(false);
    } catch (error) {
      notification.error({
        description: error.message || 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePayload = (data) => {
    if (!data) return [];
    const dataObject = Object.values(data);
    return dataObject.map((item) => ({
      userId: item.member,
      roleId: item.role,
    }));
  };

  const optionsMember = React.useMemo(() => {
    return users.filter(
      (item) => !members.find((element) => element.member === item.value)
    );
  }, [members, users]);

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
      <Form name='form-add-member' form={form} onFinish={onSave}>
        <div className='min-h-[50vh] max-h-[75vh] overflow-auto p-2'>
          {members.map((item) => (
            <div className='flex gap-4 items-start' key={item.key}>
              <Item
                className='flex-1'
                name={[item.key, 'member']}
                rules={[
                  {
                    required: true,
                    message: 'Cần chọn member',
                  },
                ]}
              >
                <Select
                  options={optionsMember}
                  size='large'
                  placeholder='Chọn member'
                />
              </Item>
              <Item
                className='flex-1'
                name={[item.key, 'role']}
                rules={[
                  {
                    required: true,
                    message: 'Cần chọn quyền',
                  },
                ]}
              >
                <Select options={roles} size='large' placeholder='Chọn quyền' />
              </Item>
              <Button
                size='large'
                htmlType='button'
                danger
                onClick={onDelete(item)}
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
        <div className='flex gap-2 items-center justify-between'>
          <Button
            className='flex items-center mt-4 w-[120px] justify-center'
            size='large'
            type='primary'
            htmlType='submit'
          >
            Lưu
          </Button>
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
      </Form>
    </Modal>
  );
};

export default AddMemberProject;
