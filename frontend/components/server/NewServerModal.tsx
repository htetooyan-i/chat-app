import React, { useState } from 'react';

import CreateServer from './CreateServer';
import JoinServer from './JoinServer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


type NewServerModalProps = {
    showServerCreationModal: boolean;
    setShowServerCreationModal: (show: boolean) => void;
}

function NewServerModal({ showServerCreationModal, setShowServerCreationModal }: NewServerModalProps) {

    const [ isCreating, setIsCreating ] = useState(true);


    return (
        <Dialog open={showServerCreationModal} onOpenChange={(open) => {
            if (!open) {
                setShowServerCreationModal(false);
                setIsCreating(true);
            }
        }}>

            <form>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>{ isCreating ? "Customize Your Server" : "Join Server" }</DialogTitle>
                    </DialogHeader>
                    {
                        isCreating ? (
                            <CreateServer onClose={() => {setShowServerCreationModal(false)}} changeView={() => setIsCreating(false)} />
                        ) : (
                            <JoinServer onClose={() => {setShowServerCreationModal(false)}} changeView={() => setIsCreating(true)} />
                        )   
                    }
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default NewServerModal;