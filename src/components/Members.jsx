import {
  Button,
  Divider,
  Empty,
  Flex,
  Input,
  List,
  Select,
  Spin,
  Timeline,
  message,
} from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setLoading } from '../slices/common';
import AvatarImage from './AvatarImage';
import ListTaskOfUser from './ListTaskOfUser';

const { Search } = Input;

const Members = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [members, setMembers] = React.useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [allowLoadMore, setAllowLoadMore] = React.useState(true);
  const [pagination, setPagination] = React.useState({ page: 1, pageSize: 10 });
  const [keyboard, setKeyboard] = React.useState('');
  const [overView, setOverView] = React.useState({});
  const [listStatus, setListStatus] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState(0);
  const [listActivities, setListActivities] = React.useState([]);

  const dispatch = useDispatch();

  const getListMembers = async (payload, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadMore(true);
      else setIsLoading(true);
      const response = await axiosInstance.get(
        `/api/project/task/list-member`,
        {
          params: {
            projectId,
            keyword: keyboard,
            ...payload,
          },
        }
      );

      const newMembers = isLoadMore
        ? [...members, ...response.data?.results]
        : response.data?.results;
      setMembers(newMembers);
      setAllowLoadMore(
        response.data?.pagination.page < response.data?.pagination.numPages
      );
      setPagination((prev) => ({
        ...prev,
        page: response.data?.pagination.page,
      }));

      if (!selectedMember) {
        setSelectedMember(newMembers[0]);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Get member of project failed. Please try again later!',
      });
    } finally {
      setIsLoading(false);
      setLoadMore(false);
    }
  };

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
            getListMembers(
              {
                page: pagination.page + 1,
                size: pagination.pageSize,
              },
              true
            )
          }
        >
          loading more
        </Button>
      </div>
    ) : null;

  const onSearch = () => {
    getListMembers({ page: 1, size: pagination.pageSize });
  };

  const getOverView = async (userId) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get('/api/project/member/overview', {
        params: {
          projectId,
          userId,
        },
      });
      setOverView(response.data.results);
    } catch (error) {
      console.log('🚀  error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSelectMember = async (member) => {
    await getOverView(member.user.id);
    await getActivities(member.user.id);

    setSelectedMember(member);
  };

  const getActivities = async (userId) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get('/api/project/activity/user', {
        params: {
          projectId,
          userId,
        },
      });
      setListActivities(response.data.results);
    } catch (error) {
      console.log('🚀  error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getListStatus = async () => {
    try {
      const response = await axiosInstance.get(
        '/api/master-data/status?type=task'
      );
      setListStatus(response.data.results);
    } catch (error) {
      console.log('🚀  error:', error);
    }
  };

  const mappingTimeLine = (timeLines, label) => {
    return timeLines.map((timeLine, index) => {
      return {
        children: (
          <Flex gap='middle' vertical>
            <div style={{ fontSize: '16px' }}>{timeLine.description}</div>
          </Flex>
        ),
        color: index % 2 === 0 ? 'green' : 'blue',
        label,
      };
    });
  };

  const onChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    getListStatus();
    getListMembers({ page: pagination.page, size: pagination.pageSize });
  }, []);

  return (
    <>
      {contextHolder}
      <div className='task-wrapper'>
        <div className='task-wrapper__list'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className='task-wrapper__list-header'>
              <div className='title'>Members</div>
            </div>
            <div className='member-wrapper__list-items'>
              <List
                header={
                  <Search
                    placeholder='Search members...'
                    onSearch={onSearch}
                    enterButton
                    value={keyboard}
                    onChange={(e) => setKeyboard(e.target.value)}
                  />
                }
                loadMore={loadMore}
                loading={isLoading}
                dataSource={members}
                renderItem={(item) => (
                  <List.Item>
                    <div
                      className={clsx(
                        'member-wrapper__elements items-center gap-[10px] cursor-pointer w-full h-full',
                        {
                          'border !border-[#1677ff] border-solid':
                            selectedMember?.user.id === item.user.id,
                        }
                      )}
                      key={item.user.id}
                      onClick={() => onSelectMember(item)}
                    >
                      <div className='member__group flex-1 truncate'>
                        <div className='member__item-avatar flex-shrink-0 overflow-hidden'>
                          <AvatarImage
                            userId={item.user.id}
                            src={item.user.avatar}
                            className='w-full h-full'
                          />
                        </div>
                        <div className='description flex-1'>
                          <div className='member__item'>
                            <div style={{ fontWeight: 'bold' }}>
                              {item.user.name}
                            </div>
                            <div style={{ fontSize: 12 }}>
                              {item.user.email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='member__tasks flex-shrink-0 font-semibold'>
                        {item.taskCount} TASKS
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <Spin className='mt-3 h-[32px]' spinning={isLoadMore} />
            </div>
          </div>
        </div>
        <div className='task-wrapper__detail flex flex-row'>
          {selectedMember && (
            <>
              <div className='member__wrapper flex flex-col'>
                <div>
                  <div className='member__header'>
                    <div className='member__header-left items-center'>
                      <div className='member__header-avatar overflow-hidden'>
                        <AvatarImage
                          src={selectedMember.user.avatar}
                          className='w-full h-full'
                        />
                      </div>
                      <div className='member__header-info'>
                        <div className='member__header-name'>
                          {selectedMember.user.name}
                        </div>
                        <div className='member__header-address'>
                          {selectedMember.user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='member__task mt-[20px]'>
                    <div className='member__task-item'>
                      <div style={{ fontWeight: 'bold', fontSize: 24 }}>
                        {overView?.taskClosedCount}
                      </div>
                      <div style={{ fontWeight: 'bold' }}>CLOSED TASKS</div>
                    </div>
                    <div className='member__task-item'>
                      <div style={{ fontWeight: 'bold', fontSize: 24 }}>
                        {overView?.taskOpenCount}
                      </div>
                      <div style={{ fontWeight: 'bold' }}>OPEN TASKS</div>
                    </div>
                  </div>
                  <Divider />
                </div>
                <div className='member__assigned flex-1 flex flex-col overflow-y-auto overflow-x-hidden'>
                  <div>
                    <div className='member__assigned-title mb-2'>
                      Assigned Tasks
                    </div>
                    <Select
                      value={selectedStatus}
                      style={{ width: 120 }}
                      onChange={onChangeStatus}
                      options={[
                        { value: 0, label: 'Tất cả' },
                        ...listStatus.map((status) => ({
                          value: status.id,
                          label: status.name,
                        })),
                      ]}
                    />
                  </div>

                  <div className='member__assigned-task flex-1'>
                    <ListTaskOfUser
                      projectId={projectId}
                      statusId={selectedStatus}
                      userId={selectedMember?.user?.id}
                    />
                  </div>
                </div>
              </div>
              <div className='member__wrapper flex-1'>
                <div className='member__assigned flex flex-col overflow-y-auto'>
                  <div className='member__assigned-title'>Last Activity</div>
                  <div className='flex-1 overflow-y-auto overflow-x-hidden'>
                    {listActivities.length ? (
                      listActivities.map((activity) => (
                        <Timeline
                          mode='alternate'
                          items={mappingTimeLine(
                            activity.listActivity,
                            activity.date
                          )}
                        />
                      ))
                    ) : (
                      <Empty />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
