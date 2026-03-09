import React, { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import {Paperclip} from "lucide-react";

const ChatFileUpload: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        },
    ]);

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    };

    const props = {
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange: handleChange,
        multiple: true,
    };
    return (
        <Upload {...props} fileList={fileList}>
            <Paperclip className="cursor-pointer" />
        </Upload>
    );
};

export default ChatFileUpload;