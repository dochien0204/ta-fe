import { Badge, Calendar, Flex, List, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { COLOR_BY_STATUS } from '../constants/status';

const CalendarBoard = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [listTask, setListTask] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentTask, setCurrentTask] = useState();

  const dateCellRender = (value) => {
    const data = listTask.find(
      (task) => task.date === value.format('YYYY-MM-DD')
    );

    if (!Array.isArray(data?.listTask) || !data?.listTask?.length) return null;

    return (
      <Badge
        status='processing'
        text={
          <span className='text-[16px]'>{data?.listTask?.length} tasks</span>
        }
      />
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const getListTask = async (payload) => {
    try {
      const response = await axiosInstance.get('/api/task/list-task-by-date', {
        params: {
          projectId,
          ...payload,
        },
      });

      setListTask(response.data.results);
    } catch (error) {}
  };

  const getDateRangeInMonth = (date) => {
    let from = date
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    let to = date
      .add(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    return { from, to };
  };

  useEffect(() => {
    const payload = getDateRangeInMonth(dayjs());
    getListTask(payload);
  }, []);

  const handlePanelChange = (value) => {
    const payload = getDateRangeInMonth(value);
    getListTask(payload);
  };

  const handleChangeDate = (value) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    const data = listTask.find(
      (task) => task.date === selectedDate.format('YYYY-MM-DD')
    );
    setCurrentTask(data);
  }, [selectedDate, listTask]);

  return (
    <Flex gap={20}>
      <Calendar
        value={selectedDate}
        mode='month'
        cellRender={cellRender}
        onPanelChange={handlePanelChange}
        onChange={handleChangeDate}
      />
      <div className='bg-white w-[33.3333%] flex-shrink-0 rounded-md flex flex-col'>
        <div className='text-[20px] font-bold p-[10px]'>
          {selectedDate.format('MMMM D, YYYY')}
        </div>
        <div className='p-[10px]'>
          <List
            bordered
            className='h-[600px] overflow-y-auto'
            dataSource={currentTask?.listTask || []}
            renderItem={(item) => (
              <List.Item
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 5,
                }}
              >
                <Typography.Text>[{item?.category?.name}]</Typography.Text>
                <Flex vertical flex={1}>
                  <span className='font-semibold'>{item?.name}</span>
                  <Tag
                    className='w-fit'
                    color={COLOR_BY_STATUS[item?.status?.code]}
                  >
                    {item?.status?.name}
                  </Tag>
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Flex>
  );
};

export default CalendarBoard;
