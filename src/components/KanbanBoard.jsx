import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import { Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setLoading } from '../slices/common';
import { CloseOutlined } from '@ant-design/icons';
import { getColorCategory } from '../constants/status';
import AvatarImage from './AvatarImage';

export default function KanbanBoard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [board, setBoard] = useState({ columns: [] });
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const dispatch = useDispatch();

  const getListTask = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get('/api/task/list', {
        params: {
          projectId,
        },
      });
      const listTask = response.data.results;
      const newBoard = listTask.map((item) => {
        return {
          id: item.status.id,
          title: item.status.name,
          cards: (item.listTask || []).map((task) => ({
            id: task.id,
            title: task.name,
            description: task.description,
            task,
          })),
        };
      });
      setBoard({ columns: newBoard });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateListTask = async (payload) => {
    try {
      dispatch(setLoading(true));

      await axiosInstance.put('/api/task/update-status', payload);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Update Status failed. Please try again later!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCardDragEnd = (item, card, source) => {
    const newBoard = { columns: [...board.columns] };
    const currentColumn = newBoard.columns.find(
      (column) => column.id === card.fromColumnId
    );
    const targetColumn = newBoard.columns.find(
      (column) => column.id === source.toColumnId
    );

    currentColumn.cards.splice(card.fromPosition, 1);
    targetColumn.cards.splice(source.toPosition, 0, item);

    setBoard(newBoard);

    if (currentColumn.id !== targetColumn.id) {
      updateListTask({
        id: item.id,
        statusId: targetColumn.id,
      });
    }
  };

  const onRemoveTask = async (item) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.delete(`/api/task/delete`, {
        params: {
          taskId: item.id,
        },
      });

      const newBoard = { columns: [...board.columns] };
      newBoard.columns.forEach((column) => {
        const index = column.cards.findIndex((card) => card.id === item.id);
        if (index !== -1) {
          column.cards.splice(index, 1);
        }
      });

      setBoard(newBoard);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Delete task failed. Please try again later!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getListTask();
  }, []);

  return (
    <>
      {contextHolder}
      <Board
        disableColumnDrag
        allowRemoveCard
        onCardDragEnd={handleCardDragEnd}
        onCardRemove={onRemoveTask}
        renderCard={({ task }, { removeCard, dragging }) => {
          return (
            <div
              dragging={dragging}
              className='p-[10px] mb-[7px] w-[250px] border border-solid border-[#eee] rounded-[10px] bg-[#f7f6f3] flex flex-col gap-[10px]'
            >
              <div className='flex flex-col'>
                <Tag
                  color={getColorCategory(task.category.name)}
                  className='w-fit'
                >
                  {task.category.name}
                </Tag>
                <div className='flex gap-[10px] items-baseline justify-between'>
                  <span className='font-semibold'>{task.name}</span>
                  <span
                    className='cursor-pointer'
                    onClick={() => onRemoveTask(task)}
                  >
                    <CloseOutlined />
                  </span>
                </div>
              </div>
              <div className='flex flex-col'>
                <span>{task.description}</span>
              </div>
              <div className='flex items-center gap-[10px] justify-end'>
                <span className='italic'>{task.assignee.username}</span>
                <AvatarImage
                  width={30}
                  height={30}
                  userId={task?.assignee?.id}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                  src={task?.assignee?.avatar}
                />
              </div>
            </div>
          );
        }}
      >
        {board}
      </Board>
    </>
  );
}
