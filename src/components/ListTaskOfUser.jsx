import { Button, List, Spin, Tag } from 'antd';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { COLOR_BY_STATUS } from '../constants/status';

const ListTaskOfUser = ({ projectId, userId, statusId }) => {
  const [listTask, setListTask] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [allowLoadMore, setAllowLoadMore] = React.useState(true);
  const [pagination, setPagination] = React.useState({ page: 1, size: 10 });

  const loadMore =
    allowLoadMore && !isLoadMore && !isLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          onClick={() =>
            getTaskOfMember(
              {
                ...pagination,
                page: pagination.page + 1,
              },
              true
            )
          }
        >
          loading more
        </Button>
      </div>
    ) : null;

  const getTaskOfMember = async (payload, isLoadMore) => {
    try {
      if (isLoadMore) setLoadMore(true);
      else setIsLoading(true);
      const response = await axiosInstance.get('/api/task/list/user-status', {
        params: {
          projectId,
          userId,
          statusId,
          ...payload,
        },
      });

      const newListTasks = isLoadMore
        ? [...listTask, ...response.data?.results]
        : response.data?.results;
      setListTask(newListTasks);
      setAllowLoadMore(
        response.data?.pagination.page < response.data?.pagination.numPages
      );
      setPagination((prev) => ({
        ...prev,
        page: response.data?.pagination.page,
      }));
    } catch (error) {
      console.log('🚀  error:', error);
    } finally {
      setIsLoading(false);
      setLoadMore(false);
    }
  };

  useEffect(() => {
    getTaskOfMember(pagination);
  }, [userId, projectId, statusId]);

  return (
    <>
      <List
        loadMore={loadMore}
        loading={isLoading}
        dataSource={listTask}
        renderItem={(item) => (
          <List.Item>
            <div className='member__assigned-item' key={item.id}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <Tag
                className='w-fit'
                color={COLOR_BY_STATUS[item?.status?.code]}
              >
                {item?.status?.name}
              </Tag>
            </div>
          </List.Item>
        )}
      />
      <Spin className='mt-3 h-[32px]' spinning={isLoadMore} />
    </>
  );
};

export default ListTaskOfUser;
