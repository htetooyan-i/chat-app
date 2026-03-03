import React, { useEffect, useRef } from 'react';
import { Layout, Divider, Avatar } from 'antd';
import { Reply, Ellipsis } from 'lucide-react';


import ButtonDropDown, { ButtonDropDownItem } from '../ui/ButtonDropDown';
import { Message } from '@/types/Message';
import { formatDate, formatDateTime } from '@/lib/helper';

const { Content } = Layout;

type ChatContentProps = {
    groupedMessages: Record<string, Message[]>;   
}
function ChatContent({ groupedMessages }: ChatContentProps) {

    
    const bottomRef = useRef<HTMLDivElement | null>(null);
    
    // Scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [groupedMessages]);
    
    const items: ButtonDropDownItem[] = [
        {
            label: "Reply",
            onClick: () => {},
            type: "normal",
        },
        {
            label: "Copy Text",
            onClick: () => {},
            type: "normal",
        },
        {
            label: "Divide",
            onClick: () => {},
            type: "divider",
        },
        {
            label: "Delete Message",
            onClick: () => {},
            type: "danger",
        },
    ];

    return (
        <Content 
            style={{ 
                flex: 1,
                background: "var(--chat-panel)",
                overflowY: "auto",
                scrollbarWidth: "thin",
                color: "var(--foreground)",
            }}
        >
            <div
                style={{
                    paddingBlock: 24,
                }}
                className='min-h-full w-full flex-1 flex flex-col items-start justify-end gap-1'
            >
                {
                    Object.entries(groupedMessages).map(([date, messages]) => (
                        <div key={date} className='w-full flex flex-col items-start justify-start'>
                            <div className='mx-auto'>
                                <p className='text-sm text-muted-text bg-background p-2 rounded-lg text-[11px]'>{formatDate(date, true)}</p>
                            </div>
                            {
                                messages.map((message, index) => (
                                    <div key={message.id} className={`relative flex items-start justify-start items-start gap-4 w-full hover:bg-muted-background/50 transition-colors cursor-pointer group ${(index > 0 && message.author?.id === messages[index - 1].author?.id) ? "pe-5 ps-21" : "px-5 mt-3"}`}>
                                        {
                                            (index > 0 && message.author?.id === messages[index - 1].author?.id) ? (
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
                                                    <Avatar shape="circle" size={48} src="/profile-img-sec.jpg" className='border-background' />
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
                                        <div className='flex justify-between items-center gap-2 absolute right-25 -top-4 px-2 py-1 bg-muted-background/80 rounded-md border border-muted-border opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <span>👍</span>
                                            <span>🙂</span>
                                            <span>😢</span>
                                            <Divider orientation="vertical" style={{ borderColor: "var(--foreground)" }} />
                                            <Reply size={16}/>
                                            <ButtonDropDown items={items} removeStyles><Ellipsis size={16}/></ButtonDropDown>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <div ref={bottomRef} />
            </div>
            
        </Content>
    );
}

export default ChatContent;