import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Activity from './Activity';
import CalendarBoard from './Calendar';
import KanbanBoard from './KanbanBoard';
import Members from './Members';
import Tasks from './Tasks';
import { useState } from 'react';

const Projects = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const taskId = searchParams.get('taskId');
  const [activeKey, setActiveKey] = useState();

  const onChange = (key) => {
    setActiveKey(key)
  };

  const itemsTab = [
    {
      label: 'Tasks',
      key: '1',
      children: <Tasks />,
    },
    {
      label: 'Kanban',
      key: '2',
      children: <KanbanBoard />,
    },
    {
      label: 'Calendar',
      key: '3',
      children: <CalendarBoard />,
    },
    {
      label: 'Activity',
      key: '4',
      children: <Activity />,
    },
    {
      label: 'Members',
      key: '5',
      children: <Members />,
    },
  ];

  return (
    <Tabs
      activeKey={activeKey}
      key={projectId + activeKey + taskId}
      onChange={onChange}
      type='card'
      items={itemsTab.map((item, i) => {
        const id = String(i + 1);
        return {
          label: item.label,
          key: id,
          children: item.children,
        };
      })}
    />
  );
};

export default Projects;
