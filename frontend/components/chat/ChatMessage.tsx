import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Layout } from 'antd';
import { Copy, Ellipsis, MessageCircleReply, Pencil, Reply, Trash } from 'lucide-react';

import ButtonDropDown, { ButtonDropDownItem } from '../ui/ButtonDropDown';
import { formatDateTime } from '@/lib/helper';
import { Message } from '@/types/Message';
import { useMessage } from '@/hooks/useMessage';
import { useAuth } from '@/hooks/useAuth';
import { useChatUI } from '@/hooks/useChatUI';

type ChatMessageProps = {
    messages: Message[];
    messagesMap?: Record<string, Message>;
};

function ChatMessage({ messages, messagesMap }: ChatMessageProps) {

    const { deleteMessage } = useMessage();
    const { setReplyMessage, setEditMessage, editMessage, typingUsers } = useChatUI();
    const { user } = useAuth();

    // Track which message has dropdown open
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // Dropdown menu items for messages
    const items = (message: Message): ButtonDropDownItem[] => {
        const baseItems: ButtonDropDownItem[] = [
            {
                label: "Reply",
                onClick: () => setReplyMessage(message),
                type: "normal",
                icon: <MessageCircleReply size={16} />
            },
            {
                label: "Copy Text",
                onClick: () => navigator.clipboard.writeText(message.content),
                type: "normal",
                icon: <Copy size={16} />
            },
        ];

        if (message.authorId === user?.id) {
            baseItems.push(
                {
                    label: "Edit",
                    onClick: () => setEditMessage(message),
                    type: "normal",
                    icon: <Pencil size={16} />
                },

                {
                    label: "Divide",
                    onClick: () => {},
                    type: "divider",
                },

                {
                    label: "Delete Message",
                    onClick: () => deleteMessage(message.id),
                    type: "danger",
                    icon: <Trash size={16} />
                }
            );
        }

        return baseItems;
    }

    return (
        <div className="w-full">
            {
                messages.map((message, index) => {
                    const isSameAuthorAsPrev = index > 0 && message.author?.id === messages[index - 1].author?.id;

                    const hasReply = !!(message.replyToMessageId || message.replyTo || message.replyToDeleted);

                    const containerPadding = isSameAuthorAsPrev && !hasReply
                        ? "pe-5 ps-21"
                        : "px-5";

                    const marginTop = hasReply || !isSameAuthorAsPrev
                        ? "mt-3"
                        : "";

                    return (
                        <div 
                        key={message.id} 
                        className={`w-full transition-colors cursor-pointer group ${marginTop} ${containerPadding} ${editMessage?.id === message.id ? "bg-accent/30 py-1" : " hover:bg-muted-background/50"} ${openDropdownId === message.id ? "bg-muted-background/50" : ""}`}>
                            {
                                (message.replyToMessageId || message.replyTo || message.replyToDeleted) && ( // Show reply preview if message is a reply
                                    <div className="flex items-center gap-2 ms-16 text-muted-text text-sm">
                                        <Avatar 
                                            shape="circle" size={21} 
                                            src={message.replyToDeleted ? undefined : "/profile-img.jpg"} 
                                            icon={message.replyToDeleted ? <Trash size={12} /> : undefined}
                                            style={message.replyToDeleted ? { backgroundColor: "var(--error-background)", color: "var(--error)" } : {}}
                                        />
                                        <div className='flex-1 flex gap-1'>
                                            {/* Show who the message is replying to */ }
                                            {!message.replyToDeleted && (
                                                <p className="font-semibold text-[11px] shrink-0 text-foreground">
                                                    <span className="text-accent shrink-0">Replied to </span>
                                                    {message.replyTo 
                                                        ? message.replyTo.author?.username
                                                        : messagesMap?.[message.replyToMessageId!]?.author?.username ?? "Unknown"
                                                    }
                                                </p>
                                            )}
                                            {/* Show deleted reply message */}
                                            <p className={`text-sm text-[11px] font-medium cursor-text line-clamp-1 ${message.replyToDeleted ? "text-error" : "text-muted-text"}`}>
                                                {message.replyToDeleted
                                                    ? "Original message was deleted"
                                                    : message.replyTo
                                                        ? message.replyTo.content
                                                        : messagesMap?.[message.replyToMessageId!]?.content ?? "Message deleted"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={`relative flex items-start justify-start items-start gap-4 w-full`}>
                                {
                                    (index > 0 && message.author?.id === messages[index - 1].author?.id && !(message.replyTo || message.replyToMessageId || message.replyToDeleted)) ? (
                                        <>
                                            <div className='flex-1 flex flex-col gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    {/* <div className={`flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium ${index % 2 === 0 ? "hidden" : "" }`}>
                                                        <span>👍</span>
                                                        <span>1</span>
                                                        </div> */}
                                                </div>
                                                <p className='text-sm text-[13px] font-medium cursor-text'>{message.content}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar shape="circle" size={48} src="/profile-img.jpg" className='border-background' />
                                            <div className='flex-1 flex flex-col gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-semibold'>{message.author?.username}</p>
                                                    {/* <div className={`flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium ${index % 2 === 0 ? "hidden" : "" }`}>
                                                        <span>👍</span>
                                                        <span>1</span>
                                                        </div> */}
                                                </div>
                                                <p className='text-sm text-[13px] font-medium cursor-text'>{message.content}</p>
                                            </div>
                                        </>
                                    )
                                }
                                
                                <div>
                                    <p className='text-[10px] text-muted-text'>
                                        {message.editedAt 
                                            ? `Edited At ${formatDateTime(message.createdAt)}` 
                                            : formatDateTime(message.createdAt)
                                        }

                                    </p>
                                </div>
                                <div className={`flex justify-between items-center gap-2 absolute right-25 ${hasReply ? "-top-11" : "-top-4"} px-2 py-1 bg-muted-background/80 rounded-md border border-muted-border transition-opacity ${openDropdownId === message.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                    <span>👍</span>
                                    <span>🙂</span>
                                    <span>😢</span>
                                    <Divider orientation="vertical" style={{ borderColor: "var(--foreground)" }} />
                                    {
                                        message.authorId === user?.id && (
                                            <Pencil size={16} onClick={() => setEditMessage(message)}/>
                                        )
                                    }
                                    <MessageCircleReply size={16} onClick={() => setReplyMessage(message)}/>
                                    <ButtonDropDown 
                                    items={items(message)} 
                                    removeStyles
                                    onOpenChange={(open) => setOpenDropdownId(open ? message.id : null)} 
                                    >
                                        <Ellipsis size={16}/>
                                    </ButtonDropDown>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
}

export default ChatMessage;