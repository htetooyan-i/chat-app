import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type StickerPopoverProps = {
  children: React.ReactNode;
};

export default function StickerPopover({ children }: StickerPopoverProps) {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || "");
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-background border border-muted-border">
        <div className="w-full h-80 overflow-y-auto">
          <Grid
            fetchGifs={(offset) => gf.trending({ offset })}
            width={300}
            columns={3}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
