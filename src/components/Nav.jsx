import React from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Button } from "antd";
import { axiosInstance } from "../api";

export default function Nav() {
    const [form] = Form.useForm();
    const [activeLink, setActiveLink] = React.useState("1");
    const [projects, setProjects] = React.useState([]);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [isRefresh, setRefresh] = React.useState(false);

    const getListProject = async () => {
        try {
            const resp = await axiosInstance.get("/api/project/list-project");
            const projects = resp.data.results.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    path: `/projects?projectId=${item.id}`,
                    icon: "icon-paper",
                };
            });
            setProjects(projects);
        } catch (error) {
            throw error;
        }
    };
    React.useEffect(() => {
        getListProject();
    }, [isRefresh]);

    const activeNav = (id) => {
        setActiveLink(id);
    };

    React.useEffect(() => {
        const pathname = window.location.pathname;
        console.log(pathname)
        switch (pathname) {
            case "/projects":
                setActiveLink("2");
                break;
            case "/members":
                setActiveLink("3");
                break;
            case "/app-project-list":
                setActiveLink(10);
                break;
                case "/app-member-list":
                setActiveLink(11);
                break;
            default:
                break;
        }
    }, []);

    const handleCancel = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const onSubmit = async (values) => {
        try {
            // payload

            const payload = {
                name: values.name,
                description: values.description,
            };

            await axiosInstance.post("/api/project/create", payload);

            setRefresh((prev) => !prev);
            setModalOpen(false);
            form.resetFields();
        } catch (error) {
            throw error;
        }
    };

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li
                    className={`${activeLink === 0 ? "active" : ""} nav-item`}
                    key={Math.random()}
                    onClick={() => activeNav(0)}
                >
                    <Link className="nav-link" to={"/"}>
                        <i className={`icon-grid menu-icon`} style={{ marginTop: "-6px" }}></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li style={{ paddingLeft: 16, paddingTop: 10, fontWeight: "bold" }}>
                    <span className="menu-title">PROJECTS</span>
                </li>
                <div style={{ overflowX: "hidden", overflowY: "scroll", maxHeight: 300 }}>
                    {projects.map((item, _) => (
                        <li
                            className={`${activeLink === item.id ? "active" : ""} nav-item`}
                            key={Math.random()}
                            onClick={() => activeNav(item.id)}
                        >
                            <Link className="nav-link" to={item.path}>
                                <i className={`${item.icon} menu-icon`} style={{ marginTop: "-6px" }}></i>
                                <span className="menu-title">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </div>

                <li style={{ paddingLeft: 16, paddingTop: 10, fontSize: 14, cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }} onClick={openModal}>
                        <i className="icon-plus menu-icon" style={{ marginTop: "-6px" }}></i>
                        <span>Add a Project</span>
                    </div>
                </li>
                <li
                    className={`${activeLink === 1 ? "active" : ""} nav-item`}
                    key={Math.random()}
                    onClick={() => activeNav(1)}
                >
                    <Link className="nav-link" to={"/members"}>
                        <i className={`icon-paper menu-icon`} style={{ marginTop: "-6px" }}></i>
                        <span className="menu-title">Members</span>
                    </Link>
                </li>
                <li
                    className={`${activeLink === 10 ? "active" : ""} nav-item`}
                    key={Math.random()}
                    onClick={() => activeNav(10)}
                >
                    <Link className="nav-link" to={"/app-project-list"}>
                        <i className={`icon-paper menu-icon`} style={{ marginTop: "-6px" }}></i>
                        <span className="menu-title">Quản lý dự án</span>
                    </Link>
                </li>
                <li
                    className={`${activeLink === 11 ? "active" : ""} nav-item`}
                    key={Math.random()}
                    onClick={() => activeNav(11)}
                >
                    <Link className="nav-link" to={"/app-member-list"}>
                        <i className={`icon-paper menu-icon`} style={{ marginTop: "-6px" }}></i>
                        <span className="menu-title">Quản lý member</span>
                    </Link>
                </li>
            </ul>
            <Modal
                title="Create New Project"
                open={isModalOpen}
                closeIcon={<></>}
                footer={[
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }} key={Math.random()}>
                        <Button type="primary" danger onClick={handleCancel} key={"1"}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => form.submit()} key={"2"}>
                            OK
                        </Button>
                    </div>,
                ]}
            >
                <Form form={form} name="basic" onFinish={onSubmit} autoComplete="off" layout="vertical">
                    <div style={{ padding: "16px 0 0 0" }}>
                        <Form.Item
                            label="Project Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your project name!",
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <Input size="large" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </nav>
    );
}
