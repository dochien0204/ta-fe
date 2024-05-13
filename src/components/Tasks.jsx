import React from "react";
import { Button, Divider, Tag, Input, Modal, Form, Flex, Select, DatePicker, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { setLoading } from "../slices/common";
import { convertDateString } from "../utils";
import UploadElement from "./UploadElement";

const Tasks = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tasks, setTasks] = React.useState([]);
    const [itemDetail, setItemDetail] = React.useState({});
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [isRefresh, setRefresh] = React.useState(false);
    const [statusId, setStatusId] = React.useState(0);

    const getListTasks = async () => {
        try {
            dispatch(setLoading(true));
            const resp = await axiosInstance.get("/api/task/list", {
                params: {
                    projectId: searchParams.get("projectId") ?? 0,
                },
            });

            const items = [];

            if (resp.data.results && resp.data.results.length > 0) {
                resp.data.results.forEach((item) => {
                    let unit = {
                        id: item.status.id,
                        name: item.status.name,
                    };

                    let elements = [];

                    if (item.listTask && item.listTask.length > 0) {
                        item.listTask.forEach((ele, idx) => {
                            if (idx === 0 && searchParams.get("taskId") !== undefined) {
                                getDetailTask(ele.id);
                            } else {
                                getDetailTask(Number(searchParams.get("taskId")));
                            }

                            elements.push({
                                id: ele.id,
                                name: ele.name,
                                type: ele.category?.name ?? "",
                            });
                        });
                    } else {
                        setItemDetail({});
                    }

                    unit.elements = elements;

                    items.push(unit);
                });
                setTasks(items);
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getDetailTask = async (taskId) => {
        try {
            dispatch(setLoading(true));
            const resp = await axiosInstance.get("/api/task/detail", {
                params: {
                    taskId: taskId,
                },
            });

            if (resp.data.results) {
                setItemDetail(resp.data.results);
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const openModal = (statusId) => {
        setModalOpen(true);
        setStatusId(statusId);
    };

    const onSubmit = async (values) => {
        try {
            // payload
            const payload = {
                name: values.name,
                description: values.description,
                statusId: statusId,
                projectId: Number(searchParams.get("projectId") ?? 0),
            };

            await axiosInstance.post("/api/task/create", payload);

            setRefresh((prev) => !prev);
            setModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    const chooseDetailTask = async (taskId) => {
        searchParams.set("taskId", taskId);
        setSearchParams(searchParams);
        getDetailTask(taskId);
    };

    React.useEffect(() => {
        getListTasks();
    }, [searchParams.get("projectId"), isRefresh]);

    return (
        <>
            <div className="task-wrapper">
                <div className="task-wrapper__list">
                    {tasks.map((item) => (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }} key={item.id}>
                            <div className="task-wrapper__list-header">
                                <div className="title">{item.name}</div>
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{ background: "green" }}
                                    icon={<PlusOutlined />}
                                    onClick={() => openModal(item.id)}
                                >
                                    Add Tasks
                                </Button>
                            </div>
                            <div className="task-wrapper__list-items">
                                {item.elements.map((ele) => (
                                    <div
                                        className="task-wrapper__list-item"
                                        key={ele.id}
                                        onClick={() => chooseDetailTask(ele.id)}
                                    >
                                        <div className="description">
                                            <div>{ele.name}</div>
                                            {ele.type && (
                                                <div>
                                                    <Tag color="green">{ele.type}</Tag>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="task-wrapper__detail">
                    <div className="task-wrapper__detail-top">
                        <div className="title">
                            <div style={{ fontSize: 32, fontWeight: "bold" }}>{itemDetail?.name ?? ""}</div>
                            <div>
                                Added by {itemDetail?.createdBy?.name ?? ""}. {convertDateString(itemDetail.createdAt)}
                            </div>
                        </div>
                        <div className="description">
                            <div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>ASIGN TO</div>
                                <div style={{ fontSize: 14 }}>Linzell Bowman</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>DUE ON</div>
                                <div style={{ fontSize: 14 }}>{convertDateString(itemDetail?.dueDate ?? "")}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>TAG</div>
                                <Tag color="purple">DEVELOPMENT</Tag>
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>ASIGN TO</div>
                                <div style={{ fontSize: 14 }}>Linzell Bowman</div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                    <div className="task-wrapper__detail-middle">
                        <div className="title">DESCRIPTION</div>
                        <div className="content">{itemDetail?.string ?? ""}</div>
                        <div className="file">
                            <div className="file-wrapper">
                                <div className="icon"></div>
                                <div>
                                    <div>Header.png</div>
                                    <div>155 KB</div>
                                </div>
                            </div>
                            <div className="file-wrapper">
                                <div className="icon"></div>
                                <div>
                                    <div>Header.png</div>
                                    <div>155 KB</div>
                                </div>
                            </div>
                            <div className="file-wrapper">
                                <div className="icon"></div>
                                <div>
                                    <div>Header.png</div>
                                    <div>155 KB</div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                    <div className="task-wrapper__detail-bottom">
                        <div className="title">DESCRIPTION</div>
                        <div className="comment">
                            <div className="comment__input">
                                <div className="avatar"></div>
                                <Input style={{ width: 350 }} placeholder="Add a comment ..." />
                            </div>
                            <div className="comment__list">
                                {[...Array(6)].map((_) => (
                                    <div key={Math.random()} className="comment__item"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    width={800}
                    title="Tạo nhiệm vụ mới"
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
                            <Flex vertical>
                                <Form.Item label="Tên nhiệm vụ" name="name">
                                    <Input size="large" />
                                </Form.Item>
                                <Flex gap="medium" justify="space-between">
                                    <Form.Item label="Người đánh giá" name="reviewer">
                                        <Select style={{ width: 230 }} placeholder="Chọn reviewer">
                                            <Select.Option value="sample">Sample</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Người nhận bàn giao" name="assigner">
                                        <Select style={{ width: 230 }} placeholder="Chọn assigner">
                                            <Select.Option value="sample">Sample</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Thể loại" name="category">
                                        <Select style={{ width: 230 }} placeholder="Chọn category">
                                            <Select.Option value="sample">Sample</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Flex>
                                <Flex justify="space-between">
                                    <Form.Item label="Ngày bắt đầu" name="reviewer">
                                        <DatePicker style={{ width: 360 }} />
                                    </Form.Item>
                                    <Form.Item label="Ngày hạn nộp" name="reviewer">
                                        <DatePicker style={{ width: 360 }} />
                                    </Form.Item>
                                </Flex>
                                <Flex>
                                    <Form.Item label="Tài liệu" name="description">
                                        <UploadElement />
                                    </Form.Item>
                                </Flex>
                                <Form.Item label="Mô tả" name="description">
                                    <Input.TextArea size="large" rows={5} />
                                </Form.Item>
                            </Flex>
                        </div>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default Tasks;
