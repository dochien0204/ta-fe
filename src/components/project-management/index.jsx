import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { App, Button, DatePicker, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../api';
import CreateProject from './create';
import { setLoading } from '../../slices/common';
import dayjs from 'dayjs';
import AddMemberProject from './member';
import { ConfigProvider } from 'antd'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
dayjs.locale('vi')


const ProjectManagementList = () => {
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

  const [addMemberOpen, setAddMemberOpen] = useState(false);

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
        title: 'Xóa dự án',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn có chắc chắn muốn xóa dự án?',
        okText: 'Xác nhận',
        okType: 'danger',
        cancelText: 'Hủy',
        async onOk() {
          try {
            dispatch(setLoading(true));
            await axiosInstance.delete('/api/project/delete', {
              data: {
                listProjectId: [item.id],
              },
            });
            notification.success({
              description: 'Bạn xóa dự án thành công!',
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
      key: item.id,
      id: item.id,
      stt: index + 1 + (pagination.current - 1) * pagination.pageSize,
      name: item.name,
      description: item.description,
      user: item.user?.username,
      createdAt: dayjs(item.createdAt).format('DD/MM/YYYY'),
      status: item.status,
    }));
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

  const onAddMember = (row) => {
    return () => {
      setAddMemberOpen(true);
      setDetail(row);
    };
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
      render(row) {
        return (
          <div className='flex gap-3'>
            <Button className='flex items-center' onClick={onAddMember(row)}>
              <UsergroupAddOutlined />
            </Button>
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
        Danh sách dự án
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <div className='w-2/3'>
          <Form form={form}>
            <Form.Item name='keyword' className='!mb-0'>
              <Input
                size='large'
                prefix={<SearchOutlined />}
                placeholder='Tìm kiếm dự án'
                onChange={onSearch}
              />
            </Form.Item>
          </Form>
          <ConfigProvider locale={locale}><DatePicker  /></ConfigProvider>
          
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
      <CreateProject
        createOpen={createOpen}
        detail={detail}
        triggerCreate={triggerCreate}
        setCreateOpen={setCreateOpen}
      />
      <AddMemberProject
        addMemberOpen={addMemberOpen}
        detail={detail}
        setAddMember={setAddMemberOpen}
      />
    </div>
  );
};

export default ProjectManagementList;
