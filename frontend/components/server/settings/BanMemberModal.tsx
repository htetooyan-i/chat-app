import React from 'react';
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from "@/lib/api";

type Option = {
    label: string;
    value: string;
};

const BAN_REASON_OPTIONS: Option[] = [
    { value: "spamming", label: "Spamming" },
    { value: "harassing", label: "Harassing" },
    { value: "inappropriate_content", label: "Inappropriate Content" },
    { value: "other", label: "Other" },
];

const BAN_DURATION_OPTIONS: Option[] = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: 'permanent', label: 'Permanent' },
];

type BanMemberProps = {
    show: boolean;
    onClose: () => void;
    byAuthority?: boolean;
};

function BanMemberModal({ show, onClose, byAuthority }: BanMemberProps) {

    const { requestBanMember } = useServerMember();

    const [selectedReason, setSelectedReason] = React.useState<Option>(BAN_REASON_OPTIONS[0]);
    const [duration, setDuration] = React.useState<string>("7");
    const [selectedDuration, setSelectedDuration] = React.useState<Option>(BAN_DURATION_OPTIONS[0]);
    const [customReason, setCustomReason] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const showTextArea = selectedReason.value === "other";


    const handleBanMember = async (finalReason: string) => {
        setIsSubmitting(true);

        try {
            const finalDuration = duration === "permanent" ? null : Number(duration)
            await requestBanMember(finalReason, finalDuration ?? undefined);
            toast.success("Member banned successfully");
            return true;
        } catch (error) {
            toast.error("Failed to ban member.", {
                description: getErrorMessage(error, "Failed to ban member")
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={show} onOpenChange={(open) => {
            if (!open) {
                onClose();
                setSelectedReason(BAN_REASON_OPTIONS[0]);
                setSelectedDuration(BAN_DURATION_OPTIONS[0]);
                setDuration(BAN_DURATION_OPTIONS[0].value);
                setCustomReason("");
            }
        }}>
            <form>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>Ban Member</DialogTitle>
                    </DialogHeader>

                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a reason for banning the member.</p>

                    <div className='flex flex-col gap-6 mb-6'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className="text-[14px] font-bold">Reason</label>
                            <Combobox
                                items={BAN_REASON_OPTIONS}
                                value={selectedReason}
                                onValueChange={(value) => {
                                    if (!value) return;
                                    const nextValue = value as Option;
                                    setSelectedReason(nextValue);
                                }}
                                itemToStringValue={(item) => (item as Option).label}
                            >
                                <ComboboxInput className='w-full' placeholder="Select a ban reason" />
                                <ComboboxContent>
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(option: Option) => (
                                            <ComboboxItem key={option.value} value={option}>
                                                {option.label}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>

                        {showTextArea && (
                            <textarea
                                rows={4}
                                placeholder="Enter custom ban reason..."
                                maxLength={200}
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                className="w-full bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-error resize-none"
                            />
                        )}

                        {byAuthority && (
                            <div className='flex flex-col gap-2 w-full'>
                                <label className="text-[14px] font-bold">Duration</label>
                                <Combobox
                                    items={BAN_DURATION_OPTIONS}
                                    value={selectedDuration}
                                    onValueChange={(value) => {
                                        if (!value) return;
                                        const nextValue = value as Option;
                                        setSelectedDuration(nextValue);
                                        setDuration(nextValue.value);
                                    }}
                                    itemToStringValue={(item) => (item as Option).label}
                                >
                                    <ComboboxInput className='w-full' placeholder="Select duration" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(option: Option) => (
                                                <ComboboxItem key={option.value} value={option}>
                                                    {option.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        )}
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button
                            type='button'
                            disabled={isSubmitting}
                            onClick={() => {
                                onClose();
                                setSelectedReason(BAN_REASON_OPTIONS[0]);
                                setSelectedDuration(BAN_DURATION_OPTIONS[0]);
                                setDuration(BAN_DURATION_OPTIONS[0].value);
                                setCustomReason("");
                            }}
                            className={`flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            disabled={isSubmitting}
                            onClick={async () => {
                                const finalReason = showTextArea
                                    ? customReason.trim()
                                    : selectedReason.label;
                                const didBan = await handleBanMember(finalReason);
                                if (didBan) {
                                    setSelectedReason(BAN_REASON_OPTIONS[0]);
                                    setSelectedDuration(BAN_DURATION_OPTIONS[0]);
                                    setDuration(BAN_DURATION_OPTIONS[0].value);
                                    setCustomReason("");
                                    onClose();
                                }
                            }}
                            className={`flex-1 px-4 py-2 rounded-lg bg-error text-white font-semibold transition-opacity duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "cursor-progress opacity-70" : "cursor-pointer hover:opacity-80"}`}
                        >
                            {isSubmitting && <Spinner />}
                            <span>{isSubmitting ? "Banning..." : "Ban Member"}</span>
                        </button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default BanMemberModal;