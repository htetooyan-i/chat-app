import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Divider from '@mui/material/Divider';
import { MenuList } from '@mui/material';

export type ButtonDropDownItem = {
    label: string;
    onClick: () => void;
    type: 'normal' | 'danger' | 'divider';
    icon?: React.ReactNode;
    canSee?: boolean;
    meta?: { [key: string]: any };
}

type ButtonDropDownComponentProps = {
    items: ButtonDropDownItem[];
    children: React.ReactNode;
    removeStyles?: boolean;
    onOpenChange?: (open: boolean) => void;
}
function ButtonDropDown({ items, children, removeStyles = false, onOpenChange }: ButtonDropDownComponentProps) {
    

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => {
                return (
                    <React.Fragment>
                    <Button 
                    variant="contained" 
                    {...bindTrigger(popupState)}
                    onClick={(e) => {
                        bindTrigger(popupState).onClick(e);
                        onOpenChange?.(true);
                    }} 
                    sx={removeStyles ? {
                        backgroundColor: "transparent",
                        color: "inherit",
                        boxShadow: "none",
                        padding: 0,
                        minWidth: 0,
                        '&:hover': {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        },
                    } : {
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        borderRadius: "5px",
                        padding: "4px 16px",
                        fontSize: "12px",
                        '&:hover': {
                            backgroundColor: "var(--background)",
                        }
                    }}>
                        {children}
                    </Button>
                    <Menu 
                    {...bindMenu(popupState)}
                    onClose={() => {
                        bindMenu(popupState).onClose();
                        onOpenChange?.(false);
                    }}
                    sx={{
                        "& .MuiPaper-root": {
                        backgroundColor: "var(--chat-panel)",
                        color: "var(--foreground)",
                        border: "1px solid var(--muted-border)",
                        borderRadius: "5px",
                        minWidth: "50px",
                        padding: "0",
                        },
                        "& .MuiMenu-list": {
                        paddingInline: "5px",
                        paddingBlock: "0",
                        borderRadius: "5px",
                        },
                    }}
                    >
                        <MenuList>
                            {items.map((item, index) => {  
                                if (item.type === "divider") {
                                    return <Divider key={index} sx={{ borderColor: "var(--muted-border)" }} />;
                                }
                                return (
                                    item.canSee === false ? null : (
                                        <MenuItem 
                                            key={index}
                                            sx={{
                                                fontSize: "12px", 
                                                fontWeight: "bold", 
                                                borderRadius: "5px",
                                                padding: "5px",
                                                color: item.type === "danger" ? "var(--error)" : "inherit",
                                                "&:hover": {
                                                backgroundColor: item.type === "danger" ? "rgb(255, 0, 0, 0.2)" : "rgb(255, 255, 255, 0.1)",
                                                },
                                            }}
                                            onClick={() => {
                                                item.onClick();
                                                popupState.close();
                                                onOpenChange?.(false);
                                            }}
                                        >
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {item.label}
                                        </MenuItem>
                                    )
                                );
                            })}
                        </MenuList>
                    </Menu>
                    </React.Fragment>
                )
            }}
        </PopupState>
    );
}

export default ButtonDropDown;