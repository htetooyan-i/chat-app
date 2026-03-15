import React from 'react';
import {CldImage} from "next-cloudinary";
import {FileFilled} from "@ant-design/icons";
import {X} from "lucide-react";

function ChatAttachmentPreview() {
    return (
        <div>
            {/*<div key={idx} className="relative shrink-0 w-25 h-35 bg-muted-background border border-muted-border rounded-lg overflow-hidden">*/}
            {/*    {file.type === "image" ? (*/}
            {/*        <CldImage*/}
            {/*            src={file.publicId}*/}
            {/*            width={100}*/}
            {/*            height={140}*/}
            {/*            crop={"fill"}*/}
            {/*            className="w-full h-full cursor-pointer"*/}
            {/*            alt="media"*/}
            {/*        />*/}
            {/*    ) : (*/}
            {/*        <div className="w-full h-full flex flex-col items-center justify-center px-2">*/}
            {/*            <FileFilled className="text-5xl"/>*/}
            {/*            <p className="text-xs truncate w-full text-center">{file.originalName}</p>*/}
            {/*        </div>*/}
            {/*    )}*/}

            {/*    /!* X button on top of the card *!/*/}
            {/*    <button*/}
            {/*        onClick={async () => {*/}
            {/*            setFiles(prev => prev.filter((_, i) => i !== idx));*/}

            {/*            try {*/}
            {/*                await deleteFile(file.publicId, file.type);*/}
            {/*            } catch (error) {*/}
            {/*                // Restore file if delete failed*/}
            {/*                setFiles(prev => [...prev, file]);*/}
            {/*            }*/}
            {/*        }}*/}
            {/*        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer hover:bg-black/80"*/}
            {/*    >*/}
            {/*        <X size={12} className="text-white"/>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
}

export default ChatAttachmentPreview;