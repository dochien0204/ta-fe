import { Table } from 'antd';

const TableTask = ({ data }) => {
  const column = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên dự án',
      width: 200,
    },
    {
      key: 'task',
      title: 'Số task hoàn thành / Tổng số tasks',
      width: 200,
      render(row) {
        return (
          <div className='flex items-center gap-1'>
            <div className='font-semibold'>
              {row.doneTask} / {row.totalTask}
            </div>{' '}
            ({(row.doneTask / row.totalTask || 0) * 100}%)
          </div>
        );
      },
    },
    {
      key: 'member',
      dataIndex: 'member',
      title: 'Số lượng thành viên',
      width: 200,
      align: 'center',
    },
  ];

  return (
    <Table
      columns={column}
      dataSource={data}
      scroll={{
        x: 'max-content',
        y: 400,
      }}
      pagination={false}
    />
  );
};

export default TableTask;
