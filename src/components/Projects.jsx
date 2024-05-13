import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import Activity from "./Activity";
import CalendarBoard from "./Calendar";
import KanbanBoard from "./KanbanBoard";
import Members from "./Members";
import Tasks from "./Tasks";

const Projects = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");

    const onChange = (key) => {
        console.log(key);
    };

    const itemsTab = [
        {
            label: "Tasks",
            key: "1",
            children: <Tasks />,
        },
        {
            label: "Kanban",
            key: "2",
            children: <KanbanBoard />,
        },
        {
            label: "Calendar",
            key: "3",
            children: <CalendarBoard />,
        },
        {
            label: "Activity",
            key: "4",
            children: <Activity />,
        },
        {
            label: "Members",
            key: "5",
            children: <Members />,
        },
    ];

    return (
        <Tabs
            key={projectId}
            onChange={onChange}
            type="card"
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
