"use client";
import React, { createContext, useCallback, useRef, useState } from "react";

import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/ApiResponse";
import type { Attachment, GetAttachmentsResponse } from "@/types/Attachment";

type ServerAttachmentContext = {
    attachments: Attachment[];
    fetchAttachments: (channelId: number, reset?: boolean) => Promise<void>;
    totalImages: number;
    totalRaws: number;
    hasMoreImages: boolean;
    hasMoreRaws: boolean;
    loading: boolean;
};

export const ServerAttachmentContext = createContext<ServerAttachmentContext | undefined>(undefined);

export const ServerAttachmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const pageRef = useRef(1);
    const [totalImages, setTotalImages] = useState(0);
    const [totalRaws, setTotalRaws] = useState(0);
    const [hasMoreImages, setHasMoreImages] = useState(false);
    const [hasMoreRaws, setHasMoreRaws] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAttachments = useCallback(async (channelId: number, reset = false) => {
        setLoading(true);

        const page = reset ? 1 : pageRef.current;

        const res: GetAttachmentsResponse = await api.get(`/channels/${channelId}/attachments?page=${page}&limit=20`).then(r => r.data);
        console.log(res);
        setAttachments(prev => {
            const updated = reset ? res.data.items : [...prev, ...res.data.items];
            const updatedImages = updated.filter((a: Attachment) => a.type === "IMAGE");
            const updatedRaws = updated.filter((a: Attachment) => a.type === "RAW");
            setHasMoreImages(res.data.pagination.totalImages > updatedImages.length);
            setHasMoreRaws(res.data.pagination.totalRaws > updatedRaws.length);
            return updated;
        });

        pageRef.current = reset ? 2 : pageRef.current + 1;
        setTotalImages(res.data.pagination.totalImages);
        setTotalRaws(res.data.pagination.totalRaws);
        setLoading(false);
    }, []);

    return (
        <ServerAttachmentContext.Provider value={{
            attachments,
            fetchAttachments,
            totalImages,
            totalRaws,
            hasMoreImages,
            hasMoreRaws,
            loading
        }}>
            {children}
        </ServerAttachmentContext.Provider>
    );
};