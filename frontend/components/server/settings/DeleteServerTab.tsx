import React from 'react';

type DeleteServerTabProps = {
    deleteServer: () => void;
    serverName: string;
    onclose: () => void;
};

function DeleteServerTab({ deleteServer, serverName, onclose }: DeleteServerTabProps) {
    const [ confirmationName, setConfirmationName ] = React.useState("");
    return (
        <div className="py-4">
            {/* Description */}
            <div>
                <p className='text-muted-text font-semibold text-[11px]'>Are you sure you want to delete <span className='uppercase'>{serverName}</span>?</p>
                <p className="text-error mb-4 font-semibold text-[11px]">This action is irreversible. All data in this server will be permanently deleted.</p>
            </div>
            {/* Confirmation Input */}
            <div className='flex flex-col gap-1 w-1/2'>
                <label htmlFor="serverName" className="text-[14px] font-bold">Server Name <span className='text-error'>*</span></label>
                <input 
                    type="text" 
                    id="serverName" 
                    value={confirmationName}
                    onChange={(e) => setConfirmationName(e.target.value)}
                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                    placeholder='Enter your server name to confirm deletion'
                />
            </div>
            {/* Action Buttons */}
            <div className='flex gap-2'>
                <button 
                    onClick={() => {
                        setConfirmationName("");
                        onclose();
                    }}
                    className="bg-muted-background border border-muted-border text-foreground px-4 py-2 rounded-md disabled:opacity-50 mt-4 cursor-pointer"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => {
                        deleteServer();
                        setConfirmationName("");
                    }}
                    disabled={confirmationName.toUpperCase() !== serverName.toUpperCase()}
                    className="bg-error hover:bg-error/70 text-foreground px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
                >
                    Delete Server
                </button>
            </div>
        </div>
    );
}

export default DeleteServerTab;