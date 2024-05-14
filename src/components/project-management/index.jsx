import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ProjectManagementList = ()=>{
  const {message} = App.useApp()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({current: 1, pageSize: 10})

  useEffect(()=>{
    (async()=>{
      try {
        const response  = await 
      } catch (error) {
        message.error({
          content: error.message ?? "Có lỗi xảy ra!"
        })
      }
    })()
  } ,[])


  const column = [
    {
      key: "stt",
      dataIndex: "stt",
      title: "Stt"
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên dự án"
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Mô tả dự án"
    },
    {
      key: "user",
      title: "Người tạo"
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Ngày tạo"
    },
    {
      key: "status",
      title: "Trạng thái"
    },
    {
      key: "action",
      render(){
        return <div className="flex gap-1">
          <Button><EditOutlined /></Button>
          <Button><DeleteOutlined /></Button>
        </div>
      }
    }
  ]
  return <div>
    <Table columns={column} dataSource={data} pagination={
      {
        ...pagination
      }
    } />
  </div>
}

export default ProjectManagementList