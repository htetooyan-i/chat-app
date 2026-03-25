import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import { Layout, Input, GetProps, Progress } from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { createStaticStyles } from 'antd-style';
import {Sticker, X, Paperclip, Image, FileText, Send } from 'lucide-react';

const StickerPopover = dynamic(
  () => import("@/components/ui/StickerPopover").then((mod) => mod.default),
  { ssr: false }
);
import { useMessage } from '@/hooks/useMessage';
import { useChatUI } from '@/hooks/useChatUI';
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { UploadAttachment } from "@/types/Attachment";
import { validateFiles } from "@/lib/helper";


const { Footer } = Layout;
const { TextArea } = Input;
type TextAreaProps = GetProps<typeof Input.TextArea>;

const styles = createStaticStyles(({ css }) => ({
  textArea: css`
    background-color: transparent;
    border: none;
    color: var(--foreground);

    &::placeholder {
      color: var(--placeholder);
      opacity: 1;
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  `,
}));


// type ChatMessageInputProps = {
//
// }

function ChatMessageInput() {

    const { sendMessage, editExistingMessage } = useMessage();
    const { replyMessage, setReplyMessage, editMessage, setEditMessage, handleTyping, stopTyping } = useChatUI();
    const [ text, setText ] = useState("");
    const [ files, setFiles ] = useState<UploadAttachment[]>([]);

    // Autofocus when replyMessage changes
    const inputRef = useRef<TextAreaRef>(null);
    useEffect(() => {
        if ((replyMessage || editMessage) && inputRef.current) {
            inputRef.current.focus();
        }

        if (editMessage) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setText(editMessage.content);
            setFiles(
                (editMessage.attachments ?? []).map(a => ({
                    url: a.url,
                    publicId: a.publicId,
                    type: a.type as 'image' | 'video' | 'raw',
                    originalName: a.originalName,
                }))
            );
        }
    }, [replyMessage, editMessage]);


    const fileInputRef = useRef<HTMLInputElement>(null);

    const { upload, deleteFile, uploading, progress } = useMediaUpload();
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);

        const validFiles = validateFiles(files);

        if (validFiles.length === 0) {
            e.target.value = '';
            return;
        }

        const urls = await Promise.all(files.map(file => upload(file)));
        setFiles(prev => [...prev, ...urls]);
    };

    const stylesFnTextArea: TextAreaProps['styles'] = {
        root: {
            backgroundColor: "transparent",
            border: "none",
            color: "var(--foreground)",
        },
        textarea: {
            backgroundColor: "transparent",
            border: "none",
            color: "var(--foreground)"
        }

    }

    const handleKeyPress = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            if (text.trim() || files.length > 0) {
                if (editMessage) {
                    await editExistingMessage(editMessage.id, text, files);
                    setEditMessage(null);
                    setFiles([]);
                } else {
                    sendMessage(text, replyMessage, files);
                    setReplyMessage(null);
                    setFiles([]);
                }
                setText(''); // clear input
            }
        }
    };


    const handleSendClick = async () => {
        if (text.trim() || files.length > 0) {
            if (editMessage) {
                await editExistingMessage(editMessage.id, text, files);
                setEditMessage(null);
                setFiles([]);
            } else {
                sendMessage(text, replyMessage, files);
                setReplyMessage(null);
                setFiles([]);
            }
            setText(''); // clear input
        }
    }

    return (
        <div className="flex flex-col shrink-0 bg-chat-panel">
            {
                replyMessage && (
                    <div className='flex items-center gap-2 mx-5 px-3 py-1 bg-muted-background rounded-t-lg border border-muted-border shrink-0'>
                        <div className='flex-1 min-w-0'>
                            <p className='text-[12px] text-muted-text'>Replying to {replyMessage.author.username}</p>
                            {/* FUTURE: Want to show real files*/}
                            {
                                replyMessage.content.trim() ? (
                                    <p className='text-[14px] text-foreground line-clamp-1'>{replyMessage.content}</p>
                                ) : replyMessage.attachments && replyMessage.attachments.length > 0 ? (
                                    <div className='flex items-center gap-1 text-muted-text text-[14px]'>
                                        {
                                            replyMessage.attachments[0].type === 'IMAGE' ? (
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <Image size={14} />
                                            ) : (
                                                <FileText size={14} />
                                            )
                                        }
                                        <span>
                                            {
                                                replyMessage.attachments.length === 1
                                                    ? replyMessage.attachments[0].originalName
                                                    : `${replyMessage.attachments.length} files`}
                                        </span>
                                    </div>
                            ) : null}
                        </div>
                        <button onClick={() => setReplyMessage(null)} className='text-muted-text hover:text-foreground transition-colors cursor-pointer'>
                            <span className="sr-only">Cancel reply</span>
                            <X size={16}/>
                        </button>
                    </div>
                )
            }
            {
                (files.length > 0 || uploading ) && (
                    <div className="flex flex-col items-start gap-2 mx-5 px-3 py-2 bg-background rounded-t-lg border-b-0 border border-muted-border shrink-0 max-h-38 overflow-y-auto">
                        {/* FIXME: Want to use preview with images*/}
                        {
                            files.map((file, idx) => (
                                <div key={idx} className={'flex gap-2 justify-start text-foreground items-center'}>
                                    <div className={'flex gap-1 items-center'}>
                                        {
                                            file.type === "image" ? (
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <Image size={16} className={'text-muted-text'}/>
                                            ) : (
                                                <FileText size={16} className={'text-muted-text'}/>
                                            )
                                        }
                                        <span className={'text-muted-text'}>{file.originalName}</span>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            setFiles(prev => prev.filter((_, i) => i !== idx));

                                            if (!editMessage) {
                                                try {
                                                    await deleteFile(file.publicId, file.type);
                                                } catch (error) {
                                                    setFiles(prev => {
                                                        const newFiles = [...prev];
                                                        newFiles.splice(idx, 0, file);
                                                        return newFiles;
                                                    });
                                                }
                                            }
                                        }}
                                        className="bg-error-background rounded-full p-0.5 cursor-pointer hover:bg-error-background/80"
                                    >
                                        <X size={12} className="text-error"/>
                                    </button>
                                </div>
                            ))
                        }
                        {
                            uploading && (
                                <div className={'w-1/4'}>
                                    <Progress percent={progress} size="small" status={"active"} styles={{'indicator': {color: "var(--foreground)"}}}/>
                                    {/*<span  className={'text-muted-text text-sm'}>Uploading...</span>*/}
                                </div>
                            )
                        }
                    </div>
                )
            }
            <Footer style={{ minHeight: "60px", maxHeight: "340px", width: "100%",background: "var(--chat-panel)", paddingTop: "0", paddingInline: "20px", paddingBottom: "10px", flexShrink: 0, overflow: "hidden" }}>
                <div className={`flex gap-4 border ${(replyMessage || files.length > 0 || uploading) ? "rounded-b-lg border-t-0" : "rounded-lg"} border-muted-border bg-background px-2 text-foreground min-h-12.5 px-2 py-0 items-center shrink-0`}>
                    <input
                        type="file"
                        accept="image/*,.pdf,.doc,.docx,.txt,.xlsx,.csv"
                        ref={fileInputRef}
                        className="hidden"
                        multiple={true}
                        onChange={handleFileChange}
                    />
                    <Paperclip
                        className="cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    />

                    {/*<ChatFileUpload />*/}
                    <TextArea
                    ref={inputRef}
                    value={text}
                    onChange={(e) => {setText(e.target.value); handleTyping()}}
                    onFocus={() => handleTyping()}
                    onBlur={() => stopTyping()}
                    onKeyDown={handleKeyPress}
                    className={styles.textArea}
                    styles={stylesFnTextArea}
                    placeholder="Send a message..."
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    />

                    <div className='flex gap-2 items-center'>
                        <X className={`cursor-pointer ${editMessage ? "block" : "hidden"} outline outline-offset-2 rounded-sm me-5 cursor-pointer outline-error/50 text-error`} size={16} onClick={() => {setEditMessage(null); setText(""); setFiles([])}}/>
                        {/* FUTURE: Want to add sticker support back */}
                        {/* <StickerPopover>
                            <Sticker className="cursor-pointer" />
                        </StickerPopover> */}
                        <Send className="cursor-pointer" onClick={handleSendClick}/>
                    </div>

                </div>
            </Footer>
        </div>
    );
}

export default ChatMessageInput;