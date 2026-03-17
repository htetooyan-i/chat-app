import React, { useState } from 'react';
import {CldImage} from "next-cloudinary";
import { FileFilled } from "@ant-design/icons";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Attachment} from "@/types/Attachment";

type ChatAttachmentProps = {
    attachments?: Attachment[];
}
function ChatAttachments({attachments}: ChatAttachmentProps) {

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const imageAttachments = attachments?.filter(file => file.type !== 'RAW') ?? [];

    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="grid grid-flow-row grid-cols-3 gap-1 justify-start w-fit my-1">
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={imageAttachments.map(a => ({ src: a.url }))}
            />
            {attachments.map((file) => (
                <div key={file.id} className="w-36 h-50 bg-muted-background border border-muted-border rounded-lg overflow-hidden">
                    {file.type === "IMAGE" ? (
                        <CldImage
                            src={file.publicId}
                            width={144}
                            height={200}
                            crop={"fill"}
                            className="w-full h-full cursor-pointer"
                            alt="media"
                            onClick={() => {
                                const lightboxIndex = imageAttachments.findIndex(a => a.id === file.id);
                                setIndex(lightboxIndex);
                                setOpen(true);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <a
                                href={file.url}
                                download={file.originalName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-1 w-full h-full"
                            >
                                <FileFilled className="text-5xl" style={{color: "var(--muted-text"}}/>
                                <p className="text-xs truncate w-full text-center text-muted-text">{file.originalName}</p>
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatAttachments;