"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const GiphyGrid = dynamic(
  () => import("@giphy/react-components").then((mod) => mod.Grid),
  { ssr: false }
);

type StickerPopoverProps = {
  children: React.ReactNode;
};

export default function StickerPopover({ children }: StickerPopoverProps) {
  const gf = new (require("@giphy/js-fetch-api").GiphyFetch)(
    process.env.NEXT_PUBLIC_GIPHY_API_KEY || ""
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(300);
  const [mounted, setMounted] = React.useState(false); // client-only mount

  React.useEffect(() => {
    setMounted(true); // now it’s safe to render GiphyGrid
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-background border border-muted-border">
        <div
          ref={containerRef}
          className="w-full h-80 overflow-y-auto scrollbar-hide rounded-md"
          style={{ scrollbarWidth: "none" }}
        >
          {mounted && (
            <GiphyGrid
              fetchGifs={(offset: number) => gf.trending({ offset })}
              width={width}
              columns={3}
              gutter={8}
              user={{}}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}