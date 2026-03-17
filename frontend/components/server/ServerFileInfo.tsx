import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { Image as ImageIcon, ChevronDown, FileText, ChevronsDown } from 'lucide-react';
import { Skeleton } from 'antd';

import {useServerAttachment} from "@/hooks/useServerAttachment";
import Lightbox from "yet-another-react-lightbox";

function ServerFileInfo() {

    const [ expendedGroup, setExpendedGroup ] = React.useState<'images' | 'files' | 'none'>("none");

    const params = useParams();
    const channelId = Array.isArray(params.channelId)
        ? Number(params.channelId[0])
        : Number(params.channelId);

    const { attachments, fetchAttachments, totalImages, hasMoreImages, totalRaws, hasMoreRaws, loading } = useServerAttachment();

    useEffect(() => {
        fetchAttachments(channelId, true);
    }, [channelId, fetchAttachments]);

    const images = useMemo(() => attachments.filter(a => a.type === "IMAGE"), [attachments]);
    const files  = useMemo(() => attachments.filter(a => a.type === "RAW"),  [attachments]);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    return (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map(a => ({ src: a.url }))}
            />
            <div className="overflow-y-auto h-full">
                <header className="p-4 flex justify-between items-center">
                    <h2 className="text-[21px] font-bold py-2">Files</h2>
                </header>
                <main className="flex flex-col gap-4">
                    <section className={'px-2'}>
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center gap-2">
                                <ImageIcon />
                                <span className={'font-medium'}>{totalImages} Images</span>
                            </div>
                            <div className={`p-0.5 rounded-full cursor-pointer hover:bg-accent/50 transition duration-200 ${expendedGroup === "images" ? "rotate-180": "rotate-0"}`} onClick={() => setExpendedGroup(expendedGroup === "images" ? "none" : "images")} >
                                <ChevronDown size={25}/>
                            </div>
                        </div>
                        <div className={`px-2 grid grid-flow-row grid-cols-3 gap-1 items-center transition-all duration-200 overflow-hidden ${expendedGroup === "images" ? "h-auto my-2 opacity-100": "h-0 opacity-0"}`}    >
                            {
                                images.map((image, idx) => (
                                    <div key={image.id} className="w-full h-full rounded-md bg-sidebar flex items-center overflow-hidden">
                                        <Image src={image.url} alt="image" width={100} height={100} className="w-full h-auto " onClick={() => {
                                            setIndex(idx);
                                            setOpen(true);
                                        }}/>
                                    </div>
                                ))
                            }
                            {
                                loading && (
                                    Array.from({ length: 10 }).map((_, idx) => (
                                        <Skeleton.Node key={idx} active style={{ height: "150px", width: "100%", backgroundColor: "var(--muted-background)", borderRadius: "6px"}} />
                                    ))
                                )
                            }
                            {
                                hasMoreImages && (
                                    <div className={'flex justify-center items-center w-full my-2 col-span-3 cursor-pointer hover:bg-muted-background/20 hover:rounded-md transition duration-200'} onClick={() => fetchAttachments(channelId, false)}>
                                        <span className={'text-muted-text text-xs font-semibold'}>Load More</span>
                                        <ChevronsDown className={'text-muted-text text-xs'}/>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                    <section className={'px-2'}>
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center gap-2">
                                <FileText />
                                <span className={'font-medium'}>{totalRaws} Files</span>
                            </div>
                            <div className={`p-0.5 rounded-full cursor-pointer hover:bg-accent/50 transition duration-200 ${expendedGroup === "files" ? "rotate-180": "rotate-0"}`} onClick={() => setExpendedGroup(expendedGroup === "files" ? "none" : "files")} >
                                <ChevronDown size={25}/>
                            </div>
                        </div>
                        <div className={`flex flex-col gap-2 transition-all duration-200 overflow-hidden ${expendedGroup === "files" ? "h-auto opacity-100 my-2": "h-0 opacity-0"}`}    >
                            {
                                files.map(file => (
                                    <div key={file.id} className="px-2 flex items-center gap-2 py-1 rounded-md hover:bg-muted-background/20 cursor-pointer transition duration-200"onClick={() => window.open(file.url, '_blank')}>
                                        <FileText size={21} className={'text-muted-text'}/>
                                        <span className={'text-xs text-muted-text truncate'}>{file.originalName}</span>
                                    </div>
                                ))
                            }
                            {
                                hasMoreRaws && (
                                    <div className={'flex justify-center items-center w-full my-2 col-span-3 cursor-pointer'}>
                                        <span className={'text-muted-text text-xs font-semibold'}>Load More</span>
                                        <ChevronsDown className={'text-muted-text text-xs'}/>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default ServerFileInfo;