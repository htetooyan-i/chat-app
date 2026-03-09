import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Layout, Input, GetProps } from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { createStaticStyles } from 'antd-style';
import {Sticker, X, Paperclip, Play} from 'lucide-react';
import { CldImage} from "next-cloudinary";
import { CldVideoPlayer} from "next-cloudinary";
import 'next-cloudinary/dist/cld-video-player.css';

import { handleMaintenanceRoute } from '@/lib/helper';
import { useMessage } from '@/hooks/useMessage';
import { useChatUI } from '@/hooks/useChatUI';
import { useMediaUpload } from "@/hooks/useMediaUpload";
import {UploadAttachment} from "@/types/Attachment";
import CloudVideo from "@/components/ui/CloudVideo";

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
        }
    }, [replyMessage, editMessage]);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload } = useMediaUpload();
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

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

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        if (text.trim() || files.length > 0) {
            if (editMessage) {
                editExistingMessage(editMessage.id, text);
                setEditMessage(null);
            } else {
                sendMessage(text, replyMessage, files);
                setReplyMessage(null);
                setFiles([])
            }
            setText(''); // clear input
        }
        }
    };


    return (
        <Footer style={{ minHeight: "60px", maxHeight: "340px", background: "var(--chat-panel)", paddingTop: "0", paddingInline: "20px", paddingBottom: "10px", flexShrink: 0, }}>
            {
                replyMessage && (
                    <div className='flex items-center gap-2 px-3 py-1 bg-muted-background rounded-t-lg border border-muted-border'>
                        <div className='flex-1 min-w-0'>
                            <p className='text-[12px] text-muted-text'>Replying to {replyMessage.author.username}</p>
                            <p className='text-[14px] text-foreground tunerate line-clamp-1'>{replyMessage.content}</p>
                        </div>
                        <button onClick={() => setReplyMessage(null)} className='text-muted-text hover:text-foreground transition-colors cursor-pointer'>
                            <span className="sr-only">Cancel reply</span>
                            <X size={16}/>
                        </button>
                    </div>
                )
            }
            {
                files.length > 0 && (
                    <div className="flex gap-2 px-3 py-2 bg-background rounded-t-lg border-b-0 border border-muted-border overflow-x-auto overflow-y-hidden items-start">
                        {
                            files.map(file => {
                                return (
                                    <div key={file.url} className="shrink-0">
                                        {file.type === "video" ? (
                                            <CloudVideo url={file.publicId} />
                                        ) : file.type === "image" ? (
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
            <div className={`flex gap-4 border ${(replyMessage || files.length > 0) ? "rounded-b-lg border-t-0" : "rounded-lg"} border-muted-border bg-background px-2 text-foreground min-h-12.5 p-2 items-center`}>
                <input
                    type="file"
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
                    <X className={`cursor-pointer ${editMessage ? "block" : "hidden"} outline outline-offset-2 rounded-sm me-5 cursor-pointer outline-error/50 text-error`} size={16} onClick={() => {setEditMessage(null); setText("");}}/>
                    <Sticker className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                    {/* <Send className="cursor-pointer" onClick={() => {handleSendMessage(text); setText("");}}/> */}
                </div>

            </div>
        </Footer>
    );
}

export default ChatMessageInput;

