import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { axiosInstance } from "../api";

export default function Login() {
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        try {
            // payload

            const payload = {
                username: values.username,
                password: values.password,
            };

            const resp = await axiosInstance.post("/api/auth/login", payload);
            window.localStorage.setItem("accessToken", resp.data.results.accessToken);
            window.localStorage.setItem("username", resp.data.results.username);
            window.localStorage.setItem("userId", resp.data.results.userId);

            navigate("/");
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src="../../images/logo.svg" alt="logo" />
                                </div>
                                <h4>Hello! let's get started</h4>
                                <h6 className="font-weight-light">Sign in to continue.</h6>
                                <div className="pt-3">
                                    <Form name="sigin-form" onFinish={onSubmit} form={form}>
                                        <div className="form-group">
                                            <Form.Item name="username">
                                                <input
                                                    type="username"
                                                    className="form-control form-control-lg"
                                                    placeholder="Username"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <Form.Item name="password">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="mt-3">
                                            <div
                                                onClick={() => form.submit()}
                                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                            >
                                                SIGN IN
                                            </div>
                                        </div>
                                    </Form>
                                    {/* <div class="my-2 d-flex justify-content-between align-items-center">
                                        <div class="form-check">
                                            <label class="form-check-label text-muted">
                                                <input type="checkbox" class="form-check-input" />
                                                Keep me signed in
                                            </label>
                                        </div>
                                        <a href="#" class="auth-link text-black">
                                            Forgot password?
                                        </a>
                                    </div> */}
                                    {/* <div class="mb-2">
                                        <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                                            <i class="ti-facebook mr-2"></i>Connect using facebook
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
