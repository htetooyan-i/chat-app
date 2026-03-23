import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


type DeleteChannelModalProps = {
    show: boolean;
    channelName: string;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    isSubmitting?: boolean;
};

function DeleteChannelModal({ show, channelName, onClose, onConfirm, isSubmitting = false }: DeleteChannelModalProps) {

    return (
        <div>
            <Dialog open={show} onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}>

                <form>
                    <DialogContent className="sm:max-w-sm z-100">
                        <DialogHeader>
                            <DialogTitle>Delete Channel</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col items-center justify-center gap-5'>
                            <h2 className='text-sm font-medium text-muted-text'>Are you sure you want to delete #<span className='font-bold'>{channelName}</span>? This cannot be undone.</h2>
                            <div className='flex w-full gap-3'>
                                <button
                                    type='button'
                                    disabled={isSubmitting}
                                    className='flex-1 font-bold bg-muted-background text-foreground px-4 py-2 rounded hover:bg-muted-background/30 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    disabled={isSubmitting}
                                    className='flex-1 font-bold bg-error text-white px-4 py-2 rounded hover:bg-error/70 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'
                                    onClick={onConfirm}
                                >
                                    {isSubmitting ? "Deleting..." : "Delete Channel"}
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default DeleteChannelModal;