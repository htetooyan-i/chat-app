import React from 'react';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { IdCard } from 'lucide-react';

export type ContextDropdownItem = {
  label: string | React.ReactNode;
  onClick: () => void;
  type: 'normal' | 'danger' | 'divider';
  icon?: React.ReactNode;
  meta?: { [key: string]: unknown };
}

type ContextDropdownComponentProps = {
  items: ContextDropdownItem[];
  children: React.ReactNode;
  horizontal?: boolean;

}

function ContextDropdownComponent({ children, items, horizontal = false }: ContextDropdownComponentProps) {

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );

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
      <div className='w-full'>
          <div onContextMenu={handleContextMenu}>
            {children}
            <Menu
              open={contextMenu !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
              disableAutoFocusItem
              disableEnforceFocus
              disableRestoreFocus
              anchorPosition={
                contextMenu !== null
                  ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                  : undefined
              }
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "var(--chat-panel)",
                  color: "var(--foreground)",
                  border: "1px solid var(--muted-border)",
                  borderRadius: "5px",
                  minWidth: horizontal ? "unset" : "150px",
                  padding: "0",
                },
              }}
            >
              <MenuList
                sx={{
                  paddingInline: "5px",
                  paddingBlock: "0",
                  borderRadius: "5px",
                  display: horizontal ? "flex" : "block",
                  flexDirection: horizontal ? "row" : "column",
                  alignItems: horizontal ? "center" : "unset",
                }}
              >
                {items.map((item, index) => {
                  if (item.type === "divider") {
                    return horizontal 
                      ? <Divider key={index} orientation="vertical" flexItem sx={{ borderColor: "var(--muted-border)" }} />
                      : <Divider key={index} sx={{ borderColor: "var(--muted-border)" }} />;
                  }

                  return (
                    <MenuItem
                      key={index}
                      onClick={(e) => {
                          if (item.meta?.disallowSelect) e.stopPropagation();
                          item.onClick();
                          handleClose();
                      }}
                      sx={{
                        color: item.type === "danger" ? "var(--error)" : "inherit",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "5px",
                        "&:hover": {
                          backgroundColor: item.type === "danger" ? "rgb(255, 0, 0, 0.2)" : "rgb(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <div className='flex gap-2 justify-between items-center w-full'>
                        {
                          typeof item.label === "string" ? (
                            <span>{item.label}</span>
                          ) : (
                            item.label
                          )
                        }
                        {item.icon && <span className='mr-2'>{item.icon}</span>}
                      </div>
                    </MenuItem>
                  );
                })}
              </MenuList>

            </Menu>
          </div>
      </div>
  );
}

export default ContextDropdownComponent;