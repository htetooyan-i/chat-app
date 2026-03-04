"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Message } from "@/types/Message";
type ChatContextType = {
  replyMessage: Message | null;
  setReplyMessage: (message: Message | null) => void;
  editMessage: Message | null;
  setEditMessage: (message: Message | null) => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ replyMessage, setReplyMessage ] = useState<Message | null>(null);
    const [ editMessage, setEditMessage ] = useState<Message | null>(null);

    return (
        <ChatContext.Provider value={{ replyMessage, setReplyMessage, editMessage, setEditMessage }}>
            {children}
        </ChatContext.Provider>
    );
};