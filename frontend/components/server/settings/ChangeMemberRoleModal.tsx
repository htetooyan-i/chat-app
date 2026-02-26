import React from 'react';
import { Modal, ModalProps } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type ChangeMemberRoleModalProps = {
    show: boolean;
    onClose: () => void;
    changeMemberRole: (newRole: string) => Promise<void>;
};


const styles: ModalProps['styles'] = {
    mask: {
        backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
  
    container: { 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '10px',
        border: '1px solid var(--muted-border)',
    },
    title: { 
        color: 'var(--foreground)',
        fontSize: '23px', 
        fontWeight: 'bold',
    },
    body: {
        color: 'var(--foreground)',
        overflowY: 'auto',
    },

};

function ChangeMemberRoleModal({ show, onClose, changeMemberRole }: ChangeMemberRoleModalProps) {

    const [ newMemberRole, setNewMemberRole ] = React.useState("MEMBER");
    return (
        <div>
            <Modal
            centered
            footer={null}
            title="Change Member Role"
            open={show}
            onCancel={() => {
                onClose();
                setNewMemberRole("MEMBER");
            }}
            width={"30%"}
            styles={styles}
            closable={false}
            >
                <div>
                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new member role.</p>

                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='flex flex-col gap-1'>
                            {/* <label htmlFor="newMemberRole" className="text-[14px] font-bold">New Member Role</label>
                            <input 
                                type="text" 
                                id="newMemberRole" 
                                className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                value={newMemberRole}
                                onChange={(e) => setNewMemberRole(e.target.value)}
                            /> */}
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel 
                                id="demo-select-small-label" 
                                sx={{
                                    color: "var(--foreground)",
                                    '&.Mui-focused': {
                                        color: 'var(--accent)',
                                    },
                                }}
                                >New Member Role</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={newMemberRole}
                                    label="New Member Role"
                                    onChange={(e) => setNewMemberRole(e.target.value)}
                                    sx={{
                                        color: "var(--foreground)",
                                        backgroundColor: "var(--chat-panel)",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--muted-border)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--accent)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--muted-border)',
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "var(--foreground) !important",
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: "var(--chat-panel)",
                                                marginTop: "4px",
                                                color: "var(--foreground)",
                                            }
                                        },
                                        MenuListProps: {
                                            sx: {
                                                padding: 0,
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                                    <MenuItem value={"MODERATOR"}>Moderator</MenuItem>
                                    <MenuItem value={"MEMBER"} selected>Member</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button 
                            type='button'
                            onClick={() => {
                                onClose();
                                setNewMemberRole("MEMBER");
                            }}
                            className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button 
                            type='button'
                            onClick={() => {
                                changeMemberRole(newMemberRole);
                                setNewMemberRole("MEMBER");
                                onClose();
                            }}
                            className='flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ChangeMemberRoleModal;