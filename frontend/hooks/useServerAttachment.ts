import { useContext } from 'react'

import { ServerAttachmentContext } from "@/context/ServerAttachmentContext";

export const useServerAttachment = () => {
    const context = useContext(ServerAttachmentContext);
    if (!context) {
        throw new Error("useServerAttachment must be used within a ServerAttachmentProvider");
    }
    return context;
}