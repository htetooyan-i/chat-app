import React from 'react';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { IdCard } from 'lucide-react';

import api from '@/lib/api';
import { useServer } from '@/hooks/useServer';


type DropdownComponentProps = {
  children: React.ReactNode;
  kickMember: (memberId: string) => void;
  memberId: string;
}

function DropdownComponent({ children, kickMember, memberId }: DropdownComponentProps) {

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
      <div>
          <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
            {children}
            <Menu
              open={contextMenu !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
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
                  minWidth: "150px",
                },
                "& .MuiMenu-list": {
                  paddingInline: "10px",
                  borderRadius: "5px",
                },
              }}
            >
              {/* Open in mod view */}
              <MenuItem
                onClick={handleClose}
                sx={{
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  paddingInlineStart: "5px",
                  "&:hover": {
                    backgroundColor: "rgb(255, 255, 255, 0.1)",
                  },
                }}
              >
                Open in Mod View
              </MenuItem>

              {/* Ban user */}
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: "var(--error)",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  paddingInlineStart: "5px",
                  "&:hover": {
                    backgroundColor: "rgb(255, 0, 0, 0.2)",
                  },
                }}
              >
                Ban User
              </MenuItem>

              {/* Kick user */}
              <MenuItem
                onClick={() => {kickMember(memberId); handleClose();}}
                sx={{
                  color: "var(--error)",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  paddingInlineStart: "5px",
                  "&:hover": {
                    backgroundColor: "rgb(255, 0, 0, 0.2)",
                  },
                }}
              >
                Kick User
              </MenuItem>


              <Divider 
                sx={{
                  borderColor: "var(--muted-border)",
                }}
              />

              {/* Copy ID */}
              <MenuItem
                onClick={handleClose}
                sx={{
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  paddingInlineStart: "5px",
                  "&:hover": {
                    backgroundColor: "rgb(255, 255, 255, 0.1)",
                  },
                }}
              >
                <div className='flex gap-2 items-center'>
                  <IdCard /> 
                  <span>Copy User ID</span>
                </div>
              </MenuItem>

            </Menu>
          </div>
      </div>
  );
}

export default DropdownComponent;