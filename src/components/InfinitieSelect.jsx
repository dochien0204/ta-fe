import React from "react";
import { Select, Form } from "antd";
import { axiosInstance } from "../api";

const { Option } = Select;

const InfiniteSelect = ({ placeholder, label, name }) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [page, setPage] = React.useState(1);

    // Simulated fetch function
    const fetchData = async () => {
        try {
            setLoading(true);
            const resp = await axiosInstance.get("/api/user/list", {
                params: {
                    page: page,
                    size: 100
                },
            });
            const items = [];
            if (resp.data.results.length > 0) {
                resp.data.results.forEach((item, index) => {
                    items.push({
                        id: item.id,
                        value: item.name + ` (${item.username})`,
                    });
                });
            }
            setData(items);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Load initial data
    React.useEffect(() => {
        fetchData();
    }, []);

    // Function to handle the scroll event
    const handleScroll = (event) => {
        const target = event.target;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && hasMore && !loading) {
            const nextPage = page + 1;
            const newData = fetchData(nextPage);
            setData(data.concat(newData));
            setHasMore(newData.length > 0);
            setPage(nextPage);
        }
    };

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: true,
                    message: "Hãy chọn giá trị",
                },
            ]}
        >
            <Select
                style={{ width: 230 }}
                onPopupScroll={handleScroll}
                loading={loading}
                placeholder={placeholder}
                notFoundContent={loading ? "Loading..." : "No more data"}
            >
                {data.map((item) => (
                    <Option key={item.id} value={item.id}>
                        {item.value}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default InfiniteSelect;
