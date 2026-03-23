import React from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '../../ui/combobox';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/Spinner";

type ReviewBanModalProps = {
    show: boolean;
    onClose: () => void;
    makeDecision: (decision: "ACCEPTED" | "REJECTED", duration?: string) => Promise<void>;
};

type Option = {
    label: string;
    value: string;
};

const BAN_DURATION_OPTIONS: Option[] = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: 'permanent', label: 'Permanent' },
];

function ReviewBanModal({ show, onClose, makeDecision }: ReviewBanModalProps) {
    const [ duration, setDuration ] = React.useState<string>("7");
    const [selectedDuration, setSelectedDuration] = React.useState<Option>(BAN_DURATION_OPTIONS[0]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [decisionInProgress, setDecisionInProgress] = React.useState<"ACCEPTED" | "REJECTED" | null>(null);

    const resetDuration = () => {
        setDuration(BAN_DURATION_OPTIONS[0].value);
        setSelectedDuration(BAN_DURATION_OPTIONS[0]);
    };

    return (
        <Dialog open={show} onOpenChange={(open) => {
            if (!open) {
                onClose();
                resetDuration();
            }
        }}>

            <form>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>Review Ban</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a duration for the ban.</p>
                        <div className='flex flex-col gap-4 mb-6'>
                            <div className='flex flex-col gap-3'>
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
                                    <ComboboxInput className='w-full' placeholder="Select ban duration" />
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
                        </div>

                        <div className='flex justify-end gap-2'>
                            <button 
                                type='button'
                                disabled={isSubmitting}
                                onClick={async () => {
                                    setIsSubmitting(true);
                                    setDecisionInProgress("REJECTED");
                                    try {
                                        await makeDecision("REJECTED");
                                        resetDuration();
                                        onClose();
                                    } finally {
                                        setIsSubmitting(false);
                                        setDecisionInProgress(null);
                                    }
                                }}
                                className={`flex-1 px-4 py-2 rounded-lg text-success bg-success/20 font-semibold flex items-center justify-center gap-2 ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                            >
                                {decisionInProgress === "REJECTED" && <Spinner />}
                                <span>{decisionInProgress === "REJECTED" ? "Rejecting..." : "Reject Request"}</span>
                            </button>
                            <button 
                                type='button'
                                disabled={isSubmitting}
                                onClick={async () => {
                                    setIsSubmitting(true);
                                    setDecisionInProgress("ACCEPTED");
                                    try {
                                        await makeDecision("ACCEPTED" , duration);
                                        resetDuration();
                                        onClose();
                                    } finally {
                                        setIsSubmitting(false);
                                        setDecisionInProgress(null);
                                    }
                                }}
                                className={`flex-1 px-4 py-2 rounded-lg bg-error text-white font-semibold transition-opacity duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:opacity-80"}`}
                            >
                                {decisionInProgress === "ACCEPTED" && <Spinner />}
                                <span>{decisionInProgress === "ACCEPTED" ? "Accepting..." : "Accept Request"}</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ReviewBanModal;