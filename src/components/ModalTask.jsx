import React from "react";
import axios from "axios";
import { Button, Input, Modal, Form, Flex, Select, DatePicker, Spin } from "antd";
import UploadElement from "./UploadElement";
import InfiniteSelect from "./InfinitieSelect";
import viVN from "antd/es/locale/vi_VN";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setEditTask, setOpenModalTask, setRefresh } from "../slices/common";
import { axiosInstance } from "../api";
import moment from "moment";

const ModalTask = ({ projectId, statusId, data }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.common.isOpenModalTask);
    const isEdit = useSelector((state) => state.common.isEditTask);
    const [form] = Form.useForm();
    const [loadingCategory, setLoadingCategory] = React.useState(false);
    const [isModalLoading, setModalLoading] = React.useState(false);
    const [category, setCategory] = React.useState([]);
    const [files, setFiles] = React.useState([]);

    const onSubmit = async (values) => {
        try {
            setModalLoading(true);

            const documents = [];

            files.forEach((item) => {
                documents.push({
                    file: item.name,
                    name: item.name,
                });
            });

            const payload = {
                name: values.name,
                description: values.description,
                statusId: statusId,
                projectId: projectId,
                reviewerId: values.reviewer,
                categoryId: values.category,
                assigneeId: values.assigner,
                startDate: values.startDate.toISOString(),
                dueDate: values.endDate.toISOString(),
                documents: documents
            };

            if (isEdit) {
                const url = "/api/task/update";
                payload.id = Number(data.id);
                payload.statusId = Number(data.status.id);
                const fetchPromises = files.map((file) => uploadToS3(file, data.id, file.name));
                await Promise.all(fetchPromises);
                await axiosInstance.put(url, payload);
            } else {
                const url = "/api/task/create";
                const resp = await axiosInstance.post(url, payload);
                const fetchPromises = files.map((file) => uploadToS3(file, resp.data.results.id, file.name));
                await Promise.all(fetchPromises);
            }
            form.resetFields();
            dispatch(setRefresh());
            dispatch(setOpenModalTask(false));
        } catch (error) {
            console.error(error);
        } finally {
            setModalLoading(false);
        }
    };

    const getFiles = (listFile) => {
        setFiles(listFile);
    };

    const uploadToS3 = async (file, taskId, taskName) => {
        try {
            const resp = await axiosInstance.get("/api/user/avatar/presign-link", {
                params: {
                    keyName: `task/${taskId}/${taskName}`,
                },
            });

            // Then upload the file using the presigned URL
            const options = {
                headers: {
                    headers: {
                        "Content-Type": file.type,
                        "Content-Disposition": `attachment; filename=${file.name}`,
                    },
                },
            };

            return axios.put(resp.data.results, file.originFileObj, options);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategory = async () => {
        try {
            setLoadingCategory(true);
            const resp = await axiosInstance.get("/api/master-data/category", {
                params: {
                    type: "team",
                },
            });

            if (resp.data.results && resp.data.results.length > 0) {
                setCategory(
                    resp.data.results.map((item) => {
                        return {
                            id: item.id,
                            value: item.name,
                        };
                    })
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCategory(false);
        }
    };

    const handleCancel = () => {
        dispatch(setOpenModalTask(false));
        dispatch(setRefresh())
    };

    React.useEffect(() => {
        getCategory();
    }, []);

    React.useEffect(() => {
        if (Object.keys(data).length > 0) {
            dispatch(setEditTask(true))
            form.setFieldValue("name", data.name);
            form.setFieldValue("reviewer", data.reviewer.id);
            form.setFieldValue("assigner", data.assignee.id);
            form.setFieldValue("category", data.category.id);
            form.setFieldValue("startDate", moment(data.startDate));
            form.setFieldValue("endDate", moment(data.dueDate));
            form.setFieldValue("description", data.string);
        } else {
            dispatch(setEditTask(false))
        }
    }, []);

    return (
        <Modal
            width={800}
            title={!isEdit ? "Tạo nhiệm vụ mới" : "Cập nhật nhiệm vụ"}
            open={isOpen}
            closeIcon={<></>}
            footer={[
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }} key={Math.random()}>
                    <Button type="primary" danger onClick={handleCancel} key={"1"}>
                        Hủy
                    </Button>
                    <Button type="primary" onClick={() => form.submit()} key={"2"}>
                        Đồng ý
                    </Button>
                </div>,
            ]}
        >
            <Spin spinning={isModalLoading}>
                <Form form={form} name="basic" onFinish={onSubmit} autoComplete="off" layout="vertical">
                    <div style={{ padding: "16px 0 0 0" }}>
                        <Flex vertical>
                            <Form.Item label="Tên nhiệm vụ" name="name">
                                <Input size="large" placeholder="Nhập tên nhiệm vụ" />
                            </Form.Item>
                            <Flex gap="medium" justify="space-between">
                                <InfiniteSelect
                                    placeholder="Chọn người đánh giá"
                                    label={"Người đánh giá"}
                                    name={"reviewer"}
                                />
                                <InfiniteSelect
                                    placeholder="Chọn người nhận nhiệm vụ"
                                    label={"Người nhận nhiệm vụ"}
                                    name={"assigner"}
                                />

                                <Form.Item
                                    label="Thể loại"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Hãy chọn giá trị!",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: 230 }}
                                        placeholder="Chọn thể loại"
                                        loading={loadingCategory}
                                    >
                                        {category.map((item) => (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.value}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Flex>
                            <Flex justify="space-between">
                                <Form.Item
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Hãy chọn ngày bắt đầu",
                                        },
                                    ]}
                                >
                                    <DatePicker locale={viVN} style={{ width: 360 }} placeholder="Ngày bắt đầu" />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày hạn nộp"
                                    name="endDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Hãy chọn ngày kết thúc",
                                        },
                                    ]}
                                >
                                    <DatePicker locale={viVN} style={{ width: 360 }} placeholder="Ngày kết thúc" />
                                </Form.Item>
                            </Flex>
                            <Flex>
                                <Form.Item label="Tài liệu" name="document">
                                    <UploadElement getFiles={getFiles} data={data} />
                                </Form.Item>
                            </Flex>
                            <Form.Item label="Mô tả" name="description">
                                <Input.TextArea size="large" rows={5} />
                            </Form.Item>
                        </Flex>
                    </div>
                </Form>
            </Spin>
        </Modal>
    );
};

export default ModalTask;
