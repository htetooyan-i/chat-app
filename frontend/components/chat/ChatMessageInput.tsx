import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Layout, Input, GetProps } from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { createStaticStyles } from 'antd-style';
import { Paperclip, Send, Sticker, X } from 'lucide-react';

import { handleMaintenanceRoute } from '@/lib/helper';
import { useMessage } from '@/hooks/useMessage';
import { useChatUI } from '@/hooks/useChatUI';
import { useAuth } from '@/hooks/useAuth';

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


type ChatMessageInputProps = {

}

function ChatMessageInput({  }: ChatMessageInputProps) {

    const { user } = useAuth();
    const { sendMessage, editExistingMessage } = useMessage();
    const { replyMessage, setReplyMessage, editMessage, setEditMessage, handleTyping, stopTyping } = useChatUI();
    const [ text, setText ] = useState("");

    // Auto-focus when replyMessage changes
    const inputRef = useRef<TextAreaRef>(null);
    useEffect(() => {
    if ((replyMessage || editMessage) && inputRef.current) {
        inputRef.current.focus();
    }

    if (editMessage) {
        setText(editMessage.content);
    }

    }, [replyMessage, editMessage]);

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
        if (text.trim()) {
            if (editMessage) {
                editExistingMessage(editMessage.id, text);
                setEditMessage(null);
            } else {
                sendMessage(text, replyMessage);
                setReplyMessage(null);
            }
            setText(''); // clear input
        }
        }
    };


    return (
        <Footer style={{ minHeight: "60px", background: "var(--chat-panel)", paddingTop: "0", paddingInline: "20px", paddingBottom: "10px", flexShrink: 0 }}>
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
            <div className={`flex gap-4 border ${replyMessage ? "rounded-b-lg" : "rounded-lg"} border-muted-border bg-background px-2 text-foreground min-h-[50px] p-2 items-center`}>
                <Paperclip className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                <TextArea 
                ref={inputRef}
                value={text} 
                onChange={(e) => {setText(e.target.value), handleTyping()}} 
                onFocus={() => handleTyping()}
                onBlur={() => stopTyping()}
                onKeyDown={handleKeyPress}
                className={styles.textArea} 
                styles={stylesFnTextArea} 
                placeholder="Send a message..." 
                autoSize={{ minRows: 1, maxRows: 5 }}
                />
                <div className='flex gap-2 items-center'>
                    <X className={`cursor-pointer ${editMessage ? "block" : "hidden"} outline outline-2 outline-offset-2 rounded-sm me-5 cursor-pointer outline-error/50 text-error`} size={16} onClick={() => {setEditMessage(null); setText("");}}/>
                    <Sticker className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                    {/* <Send className="cursor-pointer" onClick={() => {handleSendMessage(text); setText("");}}/> */}
                </div>

            </div>
        </Footer>
    );
}

export default ChatMessageInput;

