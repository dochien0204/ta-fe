import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { App, Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../api';
import CreateProject from './create';
import { setLoading } from '../../slices/common';

const ProjectManagementList = () => {
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get('/api/project/list/admin', {
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
        message.error({
          content: error.message ?? 'Có lỗi xảy ra!',
        });
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [pagination.current, pagination.pageSize, keyword]);

  const handleMapDataTable = (data, pagination) => {
    if (!data) return [];
    return data.map((item, index) => ({
      key: item.id,
      stt: index + 1 + (pagination.current - 1) * pagination.pageSize,
      name: item.name,
      description: item.description,
      user: item.user?.username,
      createdAt: item.createdAt,
      status: item.status,
    }));
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
      title: 'Tên dự án',
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô tả dự án',
    },
    {
      key: 'user',
      title: 'Người tạo',
      dataIndex: 'user',
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'Ngày tạo',
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render(row) {
        if (row.status.code === 'active') {
          return <div className='text-green-500 font-medium'>Hoạt động</div>;
        }
        return <div className='text-red-500 font-medium'>Không hoạt động</div>;
      },
    },
    {
      key: 'action',
      render() {
        return (
          <div className='flex gap-3'>
            <Button className='flex items-center'>
              <EditOutlined />
            </Button>
            <Button
              className='flex items-center'
              danger
            >
              <DeleteOutlined />
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

  return (
    <div>
      <div className='uppercase font-semibold text-xl mb-2'>
        Danh Sách dự án
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <div className='w-2/3'>
          <Form form={form}>
            <Form.Item
              name='keyword'
              className='!mb-0'
            >
              <Input
                size='large'
                prefix={<SearchOutlined />}
                placeholder='Tìm kiếm dự án'
                onChange={onSearch}
              />
            </Form.Item>
          </Form>
        </div>
        <Button
          size='large'
          className='flex items-center gap-1'
          type='primary'
          onClick={() => setCreateOpen(true)}
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
      <CreateProject
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
      />
    </div>
  );
};

export default ProjectManagementList;
