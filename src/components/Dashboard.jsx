import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">Welcome Aamir</h3>
              <h6 className="font-weight-normal mb-0">
                All systems are running smoothly! You have{" "}
                <span className="text-primary">3 unread alerts!</span>
              </h6>
            </div>
            <div className="col-12 col-xl-4">
              <div className="justify-content-end d-flex">
                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                  <button
                    className="btn btn-sm btn-light bg-white dropdown-toggle"
                    type="button"
                    id="dropdownMenuDate2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <i className="mdi mdi-calendar"></i> Today (10 Jan 2021)
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuDate2"
                  >
                    <a className="dropdown-item" href="#">
                      January - March
                    </a>
                    <a className="dropdown-item" href="#">
                      March - June
                    </a>
                    <a className="dropdown-item" href="#">
                      June - August
                    </a>
                    <a className="dropdown-item" href="#">
                      August - November
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card tale-bg">
            <div className="card-people mt-auto">
              <img src="images/dashboard/people.svg" alt="people" />
              <div className="weather-info">
                <div className="d-flex">
                  <div>
                    <h2 className="mb-0 font-weight-normal">
                      <i className="icon-sun mr-2"></i>31<sup>C</sup>
                    </h2>
                  </div>
                  <div className="ml-2">
                    <h4 className="location font-weight-normal">Bangalore</h4>
                    <h6 className="font-weight-normal">India</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin transparent">
          <div className="row">
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-tale">
                <div className="card-body">
                  <p className="mb-4">Today’s Bookings</p>
                  <p className="fs-30 mb-2">4006</p>
                  <p>10.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-dark-blue">
                <div className="card-body">
                  <p className="mb-4">Total Bookings</p>
                  <p className="fs-30 mb-2">61344</p>
                  <p>22.00% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
              <div className="card card-light-blue">
                <div className="card-body">
                  <p className="mb-4">Number of Meetings</p>
                  <p className="fs-30 mb-2">34040</p>
                  <p>2.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 stretch-card transparent">
              <div className="card card-light-danger">
                <div className="card-body">
                  <p className="mb-4">Number of Clients</p>
                  <p className="fs-30 mb-2">47033</p>
                  <p>0.22% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Order Details</p>
              <p className="font-weight-500">
                The total number of sessions within the date range. It is the
                period time a user is actively engaged with your website, page
                or app, etc
              </p>
              <div className="d-flex flex-wrap mb-5">
                <div className="mr-5 mt-3">
                  <p className="text-muted">Order value</p>
                  <h3 className="text-primary fs-30 font-weight-medium">
                    12.3k
                  </h3>
                </div>
                <div className="mr-5 mt-3">
                  <p className="text-muted">Orders</p>
                  <h3 className="text-primary fs-30 font-weight-medium">14k</h3>
                </div>
                <div className="mr-5 mt-3">
                  <p className="text-muted">Users</p>
                  <h3 className="text-primary fs-30 font-weight-medium">
                    71.56%
                  </h3>
                </div>
                <div className="mt-3">
                  <p className="text-muted">Downloads</p>
                  <h3 className="text-primary fs-30 font-weight-medium">
                    34040
                  </h3>
                </div>
              </div>
              <canvas id="order-chart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="card-title">Sales Report</p>
                <a href="#" className="text-info">
                  View all
                </a>
              </div>
              <p className="font-weight-500">
                The total number of sessions within the date range. It is the
                period time a user is actively engaged with your website, page
                or app, etc
              </p>
              <div id="sales-legend" className="chartjs-legend mt-4 mb-2"></div>
              <canvas id="sales-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card">
            <div className="card-body">
              <p className="card-title mb-0">Projects</p>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th className="pl-0  pb-2 border-bottom">Places</th>
                      <th className="border-bottom pb-2">Orders</th>
                      <th className="border-bottom pb-2">Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pl-0">Kentucky</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">65</span>
                          (2.15%)
                        </p>
                      </td>
                      <td className="text-muted">65</td>
                    </tr>
                    <tr>
                      <td className="pl-0">Ohio</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">54</span>
                          (3.25%)
                        </p>
                      </td>
                      <td className="text-muted">51</td>
                    </tr>
                    <tr>
                      <td className="pl-0">Nevada</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">22</span>
                          (2.22%)
                        </p>
                      </td>
                      <td className="text-muted">32</td>
                    </tr>
                    <tr>
                      <td className="pl-0">North Carolina</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">46</span>
                          (3.27%)
                        </p>
                      </td>
                      <td className="text-muted">15</td>
                    </tr>
                    <tr>
                      <td className="pl-0">Montana</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">17</span>
                          (1.25%)
                        </p>
                      </td>
                      <td className="text-muted">25</td>
                    </tr>
                    <tr>
                      <td className="pl-0">Nevada</td>
                      <td>
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">52</span>
                          (3.11%)
                        </p>
                      </td>
                      <td className="text-muted">71</td>
                    </tr>
                    <tr>
                      <td className="pl-0 pb-0">Louisiana</td>
                      <td className="pb-0">
                        <p className="mb-0">
                          <span className="font-weight-bold mr-2">25</span>
                          (1.32%)
                        </p>
                      </td>
                      <td className="pb-0">14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="card-title">Charts</p>
                  <div className="charts-data">
                    <div className="mt-3">
                      <p className="mb-0">Data 1</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="progress progress-md flex-grow-1 mr-4">
                          {/* <div className="progress-bar bg-inf0" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div> */}
                        </div>
                        <p className="mb-0">5k</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0">Data 2</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="progress progress-md flex-grow-1 mr-4">
                          {/* <div className="progress-bar bg-info" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div> */}
                        </div>
                        <p className="mb-0">1k</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0">Data 3</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="progress progress-md flex-grow-1 mr-4">
                          {/* <div className="progress-bar bg-info" role="progressbar" style={{width: "48%"}} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div> */}
                        </div>
                        <p className="mb-0">992</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0">Data 4</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="progress progress-md flex-grow-1 mr-4">
                          {/* <div className="progress-bar bg-info" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> */}
                        </div>
                        <p className="mb-0">687</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 stretch-card grid-margin grid-margin-md-0">
              <div className="card data-icon-card-primary">
                <div className="card-body">
                  <p className="card-title text-white">Number of Meetings</p>
                  <div className="row">
                    <div className="col-8 text-white">
                      <h3>34040</h3>
                      <p className="text-white font-weight-500 mb-0">
                        The total number of sessions within the date range.It is
                        calculated as the sum .{" "}
                      </p>
                    </div>
                    <div className="col-4 background-icon"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Notifications</p>
              <ul className="icon-data-list">
                <li>
                  <div className="d-flex">
                    <img src="images/faces/face1.jpg" alt="user" />
                    <div>
                      <p className="text-info mb-1">Isabella Becker</p>
                      <p className="mb-0">Sales dashboard have been created</p>
                      <small>9:30 am</small>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <img src="images/faces/face2.jpg" alt="user" />
                    <div>
                      <p className="text-info mb-1">Adam Warren</p>
                      <p className="mb-0">You have done a great job #TW111</p>
                      <small>10:30 am</small>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <img src="images/faces/face3.jpg" alt="user" />
                    <div>
                      <p className="text-info mb-1">Leonard Thornton</p>
                      <p className="mb-0">Sales dashboard have been created</p>
                      <small>11:30 am</small>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <img src="images/faces/face4.jpg" alt="user" />
                    <div>
                      <p className="text-info mb-1">George Morrison</p>
                      <p className="mb-0">Sales dashboard have been created</p>
                      <small>8:50 am</small>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <img src="images/faces/face5.jpg" alt="user" />
                    <div>
                      <p className="text-info mb-1">Ryan Cortez</p>
                      <p className="mb-0">Herbs are fun and easy to grow.</p>
                      <small>9:00 am</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
