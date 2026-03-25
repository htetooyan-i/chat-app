import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useChannel } from '@/hooks/useChannel';
import { getErrorMessage } from '@/lib/api';
import { Trash2Icon } from "lucide-react"
import { Spinner } from '@/components/ui/Spinner';


type DeleteChannelAlertProps = {
    show: boolean;
    onClose: () => void;
};

function DeleteChannelAlert({ show, onClose }: DeleteChannelAlertProps) {

    const router = useRouter();
    const { serverId, channelId } = useParams();

    const { deleteChannel, channels } = useChannel();
    const channelName = channels.find(c => String(c.id) === String(channelId))?.name || "";

    const [ isDeleting, setIsDeleting ] = useState(false);

    const handleDeleteChannel = async () => {
        setIsDeleting(true);
        try {
            await deleteChannel();

            // Redirect to another channel or server root after deletion.
            const remaining = channels.filter(c => String(c.id) !== String(channelId));
            if (remaining.length > 0) {
                router.push(`/channels/${serverId}/${remaining[0].id}`);
            } else {
                router.push(`/channels/${serverId}`);
            }

            toast.success("Channel deleted successfully!");
            onClose();
        } catch (err) {
            toast.error("Failed to delete channel.", {
                description: getErrorMessage(err, "An unexpected error occurred.")
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={show} onOpenChange={(open) => {

        }}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete channel?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete #<span className='font-bold'>{channelName}</span>? This cannot be undone.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel
                    variant="default"
                    disabled={isDeleting}
                    className="bg-muted-background disabled:bg-muted-background/70 cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                >
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    variant="destructive"
                    onClick={handleDeleteChannel}
                    disabled={isDeleting}
                    className={`bg-error-background disabled:pointer-events-auto ${isDeleting ? "cursor-progress bg-error-background/70" : "cursor-pointer hover:bg-error-background-hover"}`}
                >
                    {isDeleting && <Spinner />}
                    {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteChannelAlert;