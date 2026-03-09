import React, { useState } from 'react';
import Linkify from "linkify-react";
import { Avatar, Divider } from 'antd';
import { Copy, Ellipsis, MessageCircleReply, Pencil, Trash } from 'lucide-react';
import {CldImage, CldVideoPlayer} from "next-cloudinary";
import 'next-cloudinary/dist/cld-video-player.css';

import ButtonDropDown, { ButtonDropDownItem } from '../ui/ButtonDropDown';
import { formatDateTime } from '@/lib/helper';
import { Message } from '@/types/Message';
import { useMessage } from '@/hooks/useMessage';
import { useAuth } from '@/hooks/useAuth';
import { useChatUI } from '@/hooks/useChatUI';
import CloudVideo from "@/components/ui/CloudVideo";

type ChatMessageProps = {
    messages: Message[];
    messagesMap?: Record<string, Message>;
};

function ChatMessage({ messages, messagesMap }: ChatMessageProps) {

    const { deleteMessage, toggleReaction } = useMessage();
    const { setReplyMessage, setEditMessage, editMessage } = useChatUI();
    const { user } = useAuth();

    // Track which message has dropdown open
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

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
                        className={`w-full transition-colors group ${marginTop} ${containerPadding} ${editMessage?.id === message.id ? "bg-accent/30 py-1" : " hover:bg-muted-background/50"} ${openDropdownId === message.id ? "bg-muted-background/50" : ""}`}>
                            {
                                (message.replyToMessageId || message.replyTo || message.replyToDeleted) && ( // Show reply preview if message is a reply
                                    <div className="flex items-center gap-2 ms-16 text-muted-text text-sm">
                                        <Avatar 
                                            shape="circle" size={21} 
                                            src={message.replyToDeleted ? undefined : "/logo.png"}
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
                                                <Linkify options={{ target: "_blank" }}>
                                                    {message.replyToDeleted
                                                        ? "Original message was deleted"
                                                        : message.replyTo
                                                            ? message.replyTo.content
                                                            : messagesMap?.[message.replyToMessageId!]?.content ?? "Message deleted"
                                                    }
                                                </Linkify>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={`relative flex items-start justify-start gap-4 w-full`}>
                                {/* FIXME: Message with avatar and without avatar have lots of command components try to fix that */}
                                {
                                    (index > 0 && message.author?.id === messages[index - 1].author?.id && !(message.replyTo || message.replyToMessageId || message.replyToDeleted)) ? (
                                        <> {/* Show only message */}
                                            <div className='flex-1 flex flex-col gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    {
                                                        message.reactions?.map(({emoji, count}) => (
                                                            <div
                                                                key={emoji}
                                                                className={`mt-1 flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium cursor-pointer`}
                                                                onClick={() => toggleReaction(message.id, emoji)}
                                                            >
                                                                <span>{emoji}</span>
                                                                <span>{count}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div>
                                                    <p className='text-sm text-[13px] font-medium cursor-text'>
                                                        <Linkify options={{ target: "_blank" }}>
                                                            {message.content}
                                                        </Linkify>
                                                    </p>
                                                    {
                                                        message.attachments && message.attachments.length > 0 && (
                                                            <div className="flex gap-2 bg-background rounded-t-lg border-b-0 border border-muted-border">
                                                                {/*FIXME: Use Grid to show media like 3x3 grid or something*/}
                                                                {
                                                                    message.attachments.map(file => {
                                                                        return (
                                                                            <div key={file.id} className="shrink-0">
                                                                                {file.type === "VIDEO" ? (
                                                                                    <CloudVideo url={file.publicId} />
                                                                                ) : file.type === "IMAGE" ? (
                                                                                    <div className="w-37.5 h-50 bg-black border border-muted-border rounded-lg overflow-hidden">
                                                                                        <CldImage
                                                                                            src={file.publicId}
                                                                                            width={150}
                                                                                            height={200}
                                                                                            crop={"fill"}
                                                                                            className="w-full h-full"
                                                                                            alt="media"
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <p>{file.publicId}</p>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar shape="circle" size={48} src="/logo.png" className='border-background' />
                                            <div className='flex-1 flex flex-col gap-1'>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-semibold'>{message.author?.username}</p>
                                                    {
                                                        message.reactions?.map(({emoji, count}) => (
                                                            <div
                                                                key={emoji}
                                                                className={`flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium cursor-pointer`}
                                                                onClick={() => toggleReaction(message.id, emoji)}
                                                            >
                                                                <span>{emoji}</span>
                                                                <span>{count}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div>
                                                    <p className='text-sm text-[13px] font-medium cursor-text'>
                                                        <Linkify options={{ target: "_blank" }}>
                                                            {message.content}
                                                        </Linkify>
                                                    </p>
                                                    {
                                                        message.attachments && message.attachments.length > 0 && (
                                                            <div className="flex gap-2 bg-background rounded-t-lg border-b-0 border border-muted-border">
                                                                {/*FIXME: Use Grid to show media like 3x3 grid or something*/}
                                                                {
                                                                    message.attachments.map(file => {
                                                                        return (
                                                                            <div key={file.id} className="shrink-0">
                                                                                {file.type === "VIDEO" ? (
                                                                                    <CloudVideo url={file.publicId} />
                                                                                ) : file.type === "IMAGE" ? (
                                                                                    <div className="w-37.5 h-50 bg-black border border-muted-border rounded-lg overflow-hidden">
                                                                                        <CldImage
                                                                                            src={file.publicId}
                                                                                            width={150}
                                                                                            height={200}
                                                                                            crop={"fill"}
                                                                                            className="w-full h-full"
                                                                                            alt="media"
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <p>{file.publicId}</p>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
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
                                    <span className="cursor-pointer" onClick={() => toggleReaction(message.id, "👍")}>👍</span>
                                    <span className="cursor-pointer" onClick={() => toggleReaction(message.id, "🙂")}>🙂</span>
                                    <span className="cursor-pointer" onClick={() => toggleReaction(message.id, "😢")}>😢</span>
                                    <Divider orientation="vertical" style={{ borderColor: "var(--foreground)" }} />
                                    {
                                        message.authorId === user?.id && (
                                            <Pencil size={16} onClick={() => setEditMessage(message)} className="cursor-pointer"/>
                                        )
                                    }
                                    <MessageCircleReply size={16} onClick={() => setReplyMessage(message)} className="cursor-pointer"/>
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

            {/*<CldImage*/}
            {/*    src="cld-sample-5" // Use this sample image or upload your own via the Media Library*/}
            {/*    width="500" // Transform the image: auto-crop to square aspect_ratio*/}
            {/*    height="500"*/}
            {/*    alt="Simple"*/}
            {/*    crop={{*/}
            {/*        type: 'auto',*/}
            {/*        source: true*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<CldVideoPlayer*/}
            {/*    width="100"*/}
            {/*    height="200"*/}
            {/*    src="chat-media/e0ys7cl7cb3xmluehgir"*/}
            {/*/>*/}
        </div>
    );
}

export default ChatMessage;