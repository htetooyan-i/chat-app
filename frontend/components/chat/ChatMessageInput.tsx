import React, { useState, KeyboardEvent } from 'react';
import { Layout, Input, GetProps } from 'antd';
import { createStaticStyles } from 'antd-style';
import { Paperclip, Send, Sticker } from 'lucide-react';

import { handleMaintenanceRoute } from '@/lib/helper';

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
    handleSendMessage: (text: string) => void;
}

function ChatMessageInput({ handleSendMessage }: ChatMessageInputProps) {

    const [ text, setText ] = useState("");

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
            handleSendMessage(text);
            setText(''); // clear input
        }
        }
    };


    return (
        <Footer style={{ minHeight: "60px", background: "var(--chat-panel)", paddingTop: "0", paddingInline: "20px", paddingBottom: "10px", flexShrink: 0 }}>
            <div className={`flex gap-4 border rounded-lg border-muted-border bg-background px-2 text-foreground min-h-[50px] p-2 items-center`}>
                <Paperclip className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                <TextArea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                onKeyDown={handleKeyPress}
                className={styles.textArea} 
                styles={stylesFnTextArea} 
                placeholder="Send a message..." 
                autoSize={{ minRows: 1, maxRows: 5 }}
                />
                <div className='flex gap-2'>
                    <Sticker className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                    <Send className="cursor-pointer" onClick={() => {handleSendMessage(text); setText("");}}/>
                </div>

            </div>
        </Footer>
    );
}

export default ChatMessageInput;