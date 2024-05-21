import React from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOpenPreviewPDF } from "../slices/common";

const PreviewPDF = ({ file }) => {
    // Create new plugin instance
    const dispatch = useDispatch();
    const [fileUrl, setFileContent] = React.useState(null);
    const isOpenPreview = useSelector((state) => state.common.isOpenPreviewPDF);

    const downloadFile = async () => {
        try {
            const response = await axios.get(file, {
                responseType: "blob",
            });
            const fileData = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(fileData);
            setFileContent(fileURL);
        } catch (error) {
            console.error("Failed to download file:", error);
        }
    };

    React.useEffect(() => {
        if (file) {
            downloadFile();
        }
    }, []);

    const onCancel = () => {
        dispatch(setOpenPreviewPDF(false));
    };

    return (
        <Modal
            open={isOpenPreview}
            onCancel={() => onCancel()}
            width={1000}
            title={"Preview content"}
            key={isOpenPreview}
            footer={[
                <Button onClick={() => onCancel()} key={Math.random()}>
                    Đóng
                </Button>,
            ]}
        >
            <iframe
                title={"PDF-Viewer"}
                src={fileUrl}
                frameBorder={0}
                style={{ height: 700, width: "100%", paddingTop: 30 }}
            ></iframe>
        </Modal>
    );
};

export default PreviewPDF;
