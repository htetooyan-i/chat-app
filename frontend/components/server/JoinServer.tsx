import React from 'react';

type JoinServerProps = {
    handleJoinServer: () => void;
    inviteCode: string;
    setInviteCode: (code: string) => void;
}

function JoinServer({ handleJoinServer, inviteCode, setInviteCode }: JoinServerProps) {
    return (
        <main className="flex flex-col gap-10 items-center justify-center">
            <p className='text-[12px] text-muted-text'>Enter an invite code below to join a server.</p>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="inviteCode" className="text-[14px] font-bold">Invite Code <span className='text-error'>*</span></label>
                <input 
                    type="text" 
                    id="inviteCode" 
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                />
            </div>
    </main>
    );
}

export default JoinServer;