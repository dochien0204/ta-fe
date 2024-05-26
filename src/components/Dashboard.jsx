import { App } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../api';
import { setLoading } from '../slices/common';
import BarChartUI from './home/barchart';
import TableTask from './home/table-task';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { notification } = App.useApp();
  const [tasksTable, setTasksTable] = React.useState([]);
  const [tasksChart, setTaskChart] = React.useState([]);
  const [overViewCard, setOverViewCard] = React.useState({});

  const getOverviewCard = async () => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.get('/api/task/overview-card');

    setOverViewCard(response.data.results);
    } catch (error) {
      notification.error({
        description: error.message ?? 'Có lỗi xảy ra!',
      });
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  React.useEffect(() => {
    getOverviewCard()
  }, [])

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get('/api/project/chart/overview');
        const resultsTable = [];
        const resultsChart = [];

        response.data?.results?.forEach((item) => {
          resultsTable.push({
            ...item,
            key: item.project.id,
            name: item.project.name,
            member: item.memberCount,
          });
          resultsChart.push({
            name: item.project.name,
            'Số task hoàn thành': item.doneTask,
            'Tổng số task': item.totalTask,
          });
        });
        setTasksTable(resultsTable);
        setTaskChart(resultsChart);
      } catch (error) {
        notification.error({
          description: error.message ?? 'Có lỗi xảy ra!',
        });
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-md-12 grid-margin'>
          <div className='row'>
            <div className='col-12 col-xl-8 mb-4 mb-xl-0'>
              <h3 className='font-weight-bold'>Welcome Aamir</h3>
              <h6 className='font-weight-normal mb-0'>
                All systems are running smoothly! You have{' '}
                <span className='text-primary'>3 unread alerts!</span>
              </h6>
            </div>
            <div className='col-12 col-xl-4'>
              <div className='justify-content-end d-flex'>
                <div className='dropdown flex-md-grow-1 flex-xl-grow-0'>
                  <button
                    className='btn btn-sm btn-light bg-white dropdown-toggle'
                    type='button'
                    id='dropdownMenuDate2'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='true'
                  >
                    <i className='mdi mdi-calendar'></i> Today (10 Jan 2021)
                  </button>
                  <div
                    className='dropdown-menu dropdown-menu-right'
                    aria-labelledby='dropdownMenuDate2'
                  >
                    <a className='dropdown-item' href='#'>
                      January - March
                    </a>
                    <a className='dropdown-item' href='#'>
                      March - June
                    </a>
                    <a className='dropdown-item' href='#'>
                      June - August
                    </a>
                    <a className='dropdown-item' href='#'>
                      August - November
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 grid-margin stretch-card'>
          <div className='card tale-bg'>
            <div className='card-people mt-auto'>
              <img src='images/dashboard/people.svg' alt='people' />
              <div className='weather-info'>
                <div className='d-flex'>
                  <div>
                    <h2 className='mb-0 font-weight-normal'>
                      <i className='icon-sun mr-2'></i>31<sup>C</sup>
                    </h2>
                  </div>
                  <div className='ml-2'>
                    <h4 className='location font-weight-normal'>Bangalore</h4>
                    <h6 className='font-weight-normal'>India</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6 grid-margin transparent'>
          <div className='row'>
            <div className='col-md-6 mb-4 stretch-card transparent'>
              <div className='card card-tale'>
                <div className='card-body'>
                  <p className='mb-4'>Tổng số dự án tham gia</p>
                  <p className='fs-30 mb-2'>{overViewCard?.totalProject}</p>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-4 stretch-card transparent'>
              <div className='card card-dark-blue'>
                <div className='card-body'>
                  <p className='mb-4'>Task chưa xong</p>
                  <p className='fs-30 mb-2'>{overViewCard?.taskClosedToday}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mb-4 mb-lg-0 stretch-card transparent'>
              <div className='card card-light-blue'>
                <div className='card-body'>
                  <p className='mb-4'>Số task cần làm hôm nay</p>
                  <p className='fs-30 mb-2'>{overViewCard?.taskClosedToday}</p>
                </div>
              </div>
            </div>
            <div className='col-md-6 stretch-card transparent'>
              <div className='card card-light-danger'>
                <div className='card-body'>
                  <p className='mb-4'>Số task còn lại cần làm</p>
                  <p className='fs-30 mb-2'>{overViewCard?.countTaskRest}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-12'>
        <div className='w-1/2'>
          <div className='font-bold text-xl mb-6'>Projects</div>
          <TableTask data={tasksTable} />
        </div>
        <div className='w-1/2 h-[500px]'>
          <div className='font-bold text-xl mb-6 pl-8'>Projects Report</div>
          <BarChartUI data={tasksChart} />
        </div>
      </div>
    </>
  );
}
