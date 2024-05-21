import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadPreview = ({ getFiles, data }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);

    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    getFiles(newFileList);
  };

  const handleBeforeUpload = (file, fileList) => {
    return false; // Prevents automatic upload
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  const downloadFile = async (file, idx) => {
    try {
      const response = await axios.get(file, {
        responseType: "blob",
      });
      const fileData = new Blob([response.data]);
      const fileURL = URL.createObjectURL(fileData);
      const fileName = data.documents[idx].name;
      const myFile = blobToFile(fileData, fileName);

      return {
        uid: `${Math.random()}`,
        name: fileName,
        originFileObj: myFile,
        url: fileURL,
      };
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const getFileExist = async () => {
    const fetchPromises = data.files.map((file, idx) =>
      downloadFile(file, idx)
    );
    const dataFile = await Promise.all(fetchPromises);
    setFileList(dataFile);
    getFiles(dataFile);
  };

  React.useEffect(() => {
    if (data.files && data.files.length > 0) getFileExist();
  }, []);

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default UploadPreview;
