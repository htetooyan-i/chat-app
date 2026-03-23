import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ButtonDropDownItem = {
    label: string;
    onClick: () => void;
    type: 'normal' | 'danger' | 'divider';
    icon?: React.ReactNode;
    canSee?: boolean;
    meta?: { [key: string]: any };
}

type ButtonDropDownProps = {
    items: ButtonDropDownItem[];
    children: React.ReactNode;
    removeStyles?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function ButtonDropDown({ items, children, removeStyles = false, onOpenChange }: ButtonDropDownProps) {
  return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit z-100 bg-chat-panel font-semibold" align="start">
                {items.map((item, index) => {  
                    if (item.type === "divider") {
                        return <DropdownMenuSeparator key={index} className="bg-muted-border"/>;
                    }
                    return (
                        item.canSee === false ? null : (
                            <DropdownMenuItem 
                                variant={item.type === "danger" ? "destructive" : "default"}
                                key={index}
                                onClick={() => {
                                    item.onClick();
                                    onOpenChange?.(false);
                                }}
                                className="text-foreground"
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </DropdownMenuItem>
                        )
                    );
                })}

            </DropdownMenuContent>
    </DropdownMenu>
  )
}
