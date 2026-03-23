'use client';

import React from 'react';
import { MemberRole } from '@/types/ServerMember';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Spinner } from "@/components/ui/Spinner";

type ChangeMemberRoleModalProps = {
    show: boolean;
    onClose: () => void;
    changeMemberRole: (newRole: MemberRole) => Promise<void>;
};

type MemberRoleOption = {
    label: string;
    value: MemberRole;
};

const ROLE_OPTIONS: MemberRoleOption[] = [
    { label: "Admin", value: "ADMIN" },
    { label: "Moderator", value: "MODERATOR" },
    { label: "Member", value: "MEMBER" },
];

function ChangeMemberRoleModal({ show, onClose, changeMemberRole }: ChangeMemberRoleModalProps) {

    const [ newMemberRole, setNewMemberRole ] = React.useState<MemberRole>("MEMBER");
    const [isSaving, setIsSaving] = React.useState(false);

    const selectedRoleOption = ROLE_OPTIONS.find((role) => role.value === newMemberRole) ?? ROLE_OPTIONS[2];

    return (
        <div>
            <Dialog open={show} onOpenChange={(open) => {
                if (!open) {
                    onClose();
                    setNewMemberRole("MEMBER");
                }
            }}>
    
                <form>
                    <DialogContent
                        className="sm:max-w-sm z-100"
                        onPointerDownOutside={(event) => event.preventDefault()}
                        onInteractOutside={(event) => event.preventDefault()}
                    >
                        <DialogHeader>
                            <DialogTitle>Change Member Role</DialogTitle>
                        </DialogHeader>
                        <div>
                            <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new member role.</p>

                            <div className='flex flex-col gap-4 mb-6'>
                                <Combobox
                                    items={ROLE_OPTIONS}
                                    value={selectedRoleOption}
                                    onValueChange={(value) => {
                                        if (!value) return;
                                        setNewMemberRole((value as MemberRoleOption).value);
                                    }}
                                    itemToStringValue={(item) => (item as MemberRoleOption).label}
                                >
                                    <ComboboxInput placeholder="Select a role" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(role: MemberRoleOption) => (
                                                <ComboboxItem key={role.value} value={role}>
                                                {role.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            <div className='flex justify-end gap-2'>
                                <button 
                                    type='button'
                                    disabled={isSaving}
                                    onClick={() => {
                                        onClose();
                                        setNewMemberRole("MEMBER");
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border ${isSaving ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type='button'
                                    disabled={isSaving}
                                    onClick={async () => {
                                        setIsSaving(true);
                                        try {
                                            await changeMemberRole(newMemberRole);
                                            setNewMemberRole("MEMBER");
                                            onClose();
                                        } finally {
                                            setIsSaving(false);
                                        }
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${isSaving ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-accent-hover"}`}
                                >
                                    {isSaving && <Spinner />}
                                    <span>{isSaving ? "Saving..." : "Save"}</span>
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default ChangeMemberRoleModal;