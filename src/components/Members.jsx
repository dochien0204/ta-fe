import React from "react";
import { UpCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Tag, Timeline } from "antd";

const Members = () => {

    const [members, setMembers] = React.useState([])

    const getListMembers = () => {}

    const items = [
        {
            id: Math.random(),
            name: "Members",
            elements: [
                {
                    key: Math.random(),
                    name: "Davea Butler",
                    position: "Team Lead",
                    task: "10",
                },
                {
                    key: Math.random(),
                    name: "Ronaldo",
                    position: "Team Lead",
                    task: "10",
                },
                {
                    key: Math.random(),
                    name: "Messi",
                    position: "Team Lead",
                    task: "10",
                },
                {
                    key: Math.random(),
                    name: "Bui Ngoc Thang",
                    position: "Team Lead",
                    task: "10",
                },
                {
                    key: Math.random(),
                    name: "Hoang Quoc Viet",
                    position: "Team Lead",
                    task: "10",
                },
                {
                    key: Math.random(),
                    name: "Nguyen Cong Hoan",
                    position: "Team Lead",
                    task: "3",
                },
            ],
        },
    ];

    return (
        <div className="task-wrapper">
            <div className="task-wrapper__list">
                {items.map((item) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} key={item.id}>
                        <div className="task-wrapper__list-header">
                            <div className="title">{item.name}</div>
                        </div>
                        <div className="member-wrapper__list-items">
                            {item.elements.map((ele) => (
                                <div className="member-wrapper__elements" key={ele.key}>
                                    <div className="member__group">
                                        <div className="member__item-avatar"></div>
                                        <div className="description">
                                            <div className="member__item">
                                                <div style={{ fontWeight: "bold" }}>{ele.name}</div>
                                                <div style={{ fontSize: 12 }}>{ele.position}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member__tasks">
                                        <div style={{ fontWeight: "bold" }}>{ele.task}</div>
                                        <div style={{ fontWeight: "bold" }}>TASKS</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="task-wrapper__detail">
                <div className="member__wrapper">
                    <div className="member__header">
                        <div className="member__header-left">
                            <div className="member__header-avatar"></div>
                            <div className="member__header-info">
                                <div className="member__header-name">Davea Butler</div>
                                <div className="member__header-address">
                                    <div>UX Researcher</div>
                                    <div>London, United Kingdom</div>
                                </div>
                            </div>
                        </div>
                        <Button type="primary" icon={<UpCircleOutlined />} />
                    </div>
                    <div className="member__task">
                        <div className="member__task-item">
                            <div style={{ fontWeight: "bold", fontSize: 24 }}>723</div>
                            <div style={{ fontWeight: "bold" }}>CLOSED TASKS</div>
                        </div>
                        <div className="member__task-item">
                            <div style={{ fontWeight: "bold", fontSize: 24 }}>723</div>
                            <div style={{ fontWeight: "bold" }}>OPEN TASKS</div>
                        </div>
                    </div>
                    <Divider />
                    <div className="member__assigned">
                        <div className="member__assigned-title">Assigned Tasks</div>
                        <div className="member__assigned-task">
                            <div className="member__assigned-item">
                                <div style={{ fontWeight: "bold" }}>
                                    An option to search in current projects or in all projects
                                </div>
                                <Tag style={{ width: 50 }} color="green">
                                    Design
                                </Tag>
                            </div>
                            <div className="member__assigned-item">
                                <div style={{ fontWeight: "bold" }}>
                                    An option to search in current projects or in all projects
                                </div>
                                <Tag style={{ width: 50 }} color="green">
                                    Design
                                </Tag>
                            </div>
                            <div className="member__assigned-item">
                                <div style={{ fontWeight: "bold" }}>
                                    An option to search in current projects or in all projects
                                </div>
                                <Tag style={{ width: 50 }} color="green">
                                    Design
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="member__assigned">
                        <div className="member__assigned-title">Last Activity</div>
                        <Timeline
                            mode="alternate"
                            items={[
                                {
                                    children: "Create a services site 2015-09-01",
                                },
                                {
                                    children: "Solve initial network problems 2015-09-01",
                                    color: "green",
                                },
                                {
                                    dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                                    children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                                },
                                {
                                    color: "red",
                                    children: "Network problems being solved 2015-09-01",
                                },
                                {
                                    children: "Create a services site 2015-09-01",
                                },
                                {
                                    dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                                    children: "Technical testing 2015-09-01",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
