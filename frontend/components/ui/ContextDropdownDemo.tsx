import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export type ContextDropdownDemoItem = {
    label: string | React.ReactNode;
      onClick: () => void;
      type: 'normal' | 'danger' | 'divider';
      icon?: React.ReactNode;
      meta?: { [key: string]: unknown };

}

type ContextDropdownDemoComponentProps = {
  items: ContextDropdownDemoItem[];
  children: React.ReactNode;
  horizontal?: boolean;

}

function ContextDropdownDemo({ children, items, horizontal = false }: ContextDropdownDemoComponentProps) {
    const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };
  
  const handleClose = () => {
    setContextMenu(null);
  };

  
  return (
    <ContextMenu>
        <ContextMenuTrigger>
            {children}
        </ContextMenuTrigger>
        <ContextMenuContent>
            {items.map((item, index) => {  
                    if (item.type === "divider") {
                    return horizontal 
                        ? <div key={index} className="w-px h-6 bg-border mx-2" />
                        : <ContextMenuSeparator key={index} className="bg-border" />;
                    }
                    return (
                        <ContextMenuItem 
                            variant={item.type === "danger" ? "destructive" : "default"}
                            key={index}
                            onClick={() => {
                                item.onClick();
                            }}
                            className="text-foreground"
                        >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                        </ContextMenuItem>
                    );
                })}
        </ContextMenuContent>
    </ContextMenu>
  );
}

export default ContextDropdownDemo;