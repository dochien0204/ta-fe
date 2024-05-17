import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { App, Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../api';
import CreateMember from './create';
import { setLoading } from '../../slices/common';
import dayjs from 'dayjs';

const MemberList = () => {
  const { notification, modal } = App.useApp();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get('/api/user/list', {
          params: {
            page: pagination.current,
            size: pagination.pageSize,
            keyword: keyword || undefined,
          },
        });
        setData(handleMapDataTable(response.data.results, pagination));
        setPagination({
          ...pagination,
          total: response.data.pagination?.count ?? 0,
        });
      } catch (error) {
        notification.error({
          description: error.message ?? 'Có lỗi xảy ra!',
        });
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [pagination.current, pagination.pageSize, keyword, refresh]);

  const onDelete = (item) => {
    return () => {
      modal.confirm({
        title: 'Xóa người dùng',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn có chắc chắn muốn xóa người dùng?',
        okText: 'Xác nhận',
        okType: 'danger',
        cancelText: 'Hủy',
        async onOk() {
          try {
            dispatch(setLoading(true));
            await axiosInstance.delete('/api/user/delete', {
              data: {
                listUserId: [item.id],
              },
            });
            notification.success({
              description: 'Bạn xóa người dùng thành công!',
            });
            setRefresh((current) => !current);
          } catch (error) {
            notification.error({
              description: error.message ?? 'Có lỗi xảy ra!',
            });
          } finally {
            dispatch(setLoading(false));
          }
        },
      });
    };
  };

  const handleMapDataTable = (data, pagination) => {
    if (!data) return [];
    return data.map((item, index) => ({
      ...item,
      key: item.id,
      stt: index + 1 + (pagination.current - 1) * pagination.pageSize,
    }));
  };

  const handleResetPassword = (item) => {
    return () => {
      modal.confirm({
        title: 'Reset password',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn có chắc chắn muốn reset password?',
        okText: 'Xác nhận',
        okType: 'danger',
        cancelText: 'Hủy',
        async onOk() {
          try {
            dispatch(setLoading(true));
            await axiosInstance.post('/api/user/reset-password', {
              userId: item.id,
            });
            notification.success({
              description: 'Bạn reset thành công!',
            });
          } catch (error) {
            notification.error({
              description: error.message ?? 'Có lỗi xảy ra!',
            });
          } finally {
            dispatch(setLoading(false));
          }
        },
      });
    };
  };

  const onUpdate = (row) => {
    return () => {
      setCreateOpen(true);
      setDetail(row);
    };
  };

  const onAdd = () => {
    setCreateOpen(true);
    setDetail(null);
  };

  const column = [
    {
      key: 'stt',
      dataIndex: 'stt',
      title: 'Stt',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên Member',
    },
    {
      key: 'username',
      dataIndex: 'username',
      title: 'Username',
    },
    {
      key: 'phoneNumber',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'action',
      width: 300,
      render(row) {
        return (
          <div className='flex gap-3'>
            <Button className='flex items-center' onClick={onUpdate(row)}>
              <EditOutlined />
            </Button>
            <Button
              className='flex items-center'
              danger
              onClick={onDelete(row)}
            >
              <DeleteOutlined />
            </Button>
            <Button
              className='flex items-center'
              onClick={handleResetPassword(row)}
            >
              Reset password
            </Button>
          </div>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  let search;
  const onSearch = () => {
    if (search) clearTimeout(search);
    search = setTimeout(() => {
      setKeyword(form.getFieldValue('keyword'));
    }, 500);
  };

  const triggerCreate = () => {
    setRefresh((current) => !current);
  };
  return (
    <div>
      <div className='uppercase font-semibold text-xl mb-2'>
        Danh sách người dùng
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <div className='w-2/3'>
          <Form form={form}>
            <Form.Item name='keyword' className='!mb-0'>
              <Input
                size='large'
                prefix={<SearchOutlined />}
                placeholder='Tìm kiếm người dùng'
                onChange={onSearch}
              />
            </Form.Item>
          </Form>
        </div>
        <Button
          size='large'
          className='flex items-center gap-1'
          type='primary'
          onClick={onAdd}
        >
          <PlusOutlined />
          Thêm mới
        </Button>
      </div>

      <Table
        columns={column}
        dataSource={data}
        pagination={{
          ...pagination,
          onChange: (current, pageSize) => {
            setPagination({ ...pagination, current, pageSize });
          },
        }}
      />
      <CreateMember
        createOpen={createOpen}
        detail={detail}
        triggerCreate={triggerCreate}
        setCreateOpen={setCreateOpen}
      />
    </div>
  );
};

export default MemberList;
