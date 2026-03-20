import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type HoverCardDemoProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
};

export default function HoverCardUI({ trigger, content, position = "bottom" }: HoverCardDemoProps) {
  return (
    <HoverCard  closeDelay={200}>
        <HoverCardTrigger>
            {trigger}
        </HoverCardTrigger>
        <HoverCardContent className="w-auto bg-background p-0 rounded-md shadow-lg" side={position}>
            {content}
        </HoverCardContent>
    </HoverCard>
  )
}