import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavRight() {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.clear();
        navigate("/login");
    };

    return (
        <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown">
                <a
                    className="nav-link count-indicator dropdown-toggle"
                    id="notificationDropdown"
                    href="#"
                    data-toggle="dropdown"
                >
                    <i className="icon-bell mx-0"></i>
                    <span className="count"></span>
                </a>
                <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                    aria-labelledby="notificationDropdown"
                >
                    <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                            <div className="preview-icon bg-success">
                                <i className="ti-info-alt mx-0"></i>
                            </div>
                        </div>
                        <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-normal">Application Error</h6>
                            <p className="font-weight-light small-text mb-0 text-muted">Just now</p>
                        </div>
                    </a>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                            <div className="preview-icon bg-warning">
                                <i className="ti-settings mx-0"></i>
                            </div>
                        </div>
                        <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-normal">Settings</h6>
                            <p className="font-weight-light small-text mb-0 text-muted">Private message</p>
                        </div>
                    </a>
                    <a className="dropdown-item preview-item">
                        <div className="preview-thumbnail">
                            <div className="preview-icon bg-info">
                                <i className="ti-user mx-0"></i>
                            </div>
                        </div>
                        <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-normal">New user registration</h6>
                            <p className="font-weight-light small-text mb-0 text-muted">2 days ago</p>
                        </div>
                    </a>
                </div>
            </li>
            <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                    <img src="images/faces/face28.jpg" alt="profile" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item">
                        <i className="ti-settings text-primary"></i>
                        Settings
                    </a>
                    <div className="dropdown-item" onClick={logout}>
                        <i className="ti-power-off text-primary"></i>
                        Logout
                    </div>
                </div>
            </li>
            <li className="nav-item nav-settings d-none d-lg-flex">
                <a className="nav-link" href="#">
                    <i className="icon-ellipsis"></i>
                </a>
            </li>
        </ul>
    );
}
