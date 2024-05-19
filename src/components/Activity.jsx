import { Flex, Timeline } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import AvatarImage from './AvatarImage';

const Activity = () => {
  const [searchParams] = useSearchParams();
  const [listActivities, setListActivities] = useState([]);
  const projectId = searchParams.get('projectId');

  const getActivities = async () => {
    try {
      const activity = await axiosInstance.get('/api/project/activity/list', {
        params: {
          projectId,
        },
      });
      setListActivities(activity.data.results);
    } catch (error) {}
  };

  const convertDateToRelative = (inputDate) => {
    var today = new Date();
    var input = new Date(inputDate);
    var timeDiff = today.getTime() - input.getTime();
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays > 1 && diffDays <= 7) {
      return diffDays + ' days ago';
    } else {
      return inputDate;
    }
  };

  const mappingTimeLine = (timeLines) => {
    return timeLines.map((timeLine) => {
      return {
        children: (
          <Flex gap='middle' vertical>
            <Flex gap='middle' align='center'>
              <AvatarImage
                width={40}
                height={40}
                userId={timeLine?.user?.id}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                src={timeLine?.user?.avatar}
              />
              <span>{timeLine?.user?.name}</span>
            </Flex>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>
              {timeLine.description}
            </div>
          </Flex>
        ),
      };
    });
  };

  useEffect(() => {
    getActivities();
  }, []);
  return (
    <div className='activity-wrapper'>
      {listActivities.map((activity) => (
        <div className='activity-item' key={activity.date}>
          <div className='activity-title mb-[20px]'>
            {convertDateToRelative(activity.date)}
          </div>
          <Timeline items={mappingTimeLine(activity.listActivity)} />
        </div>
      ))}
    </div>
  );
};

export default Activity;
