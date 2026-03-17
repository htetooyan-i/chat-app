import React from 'react';

type ForgetPasswordFormProps = {
  onSubmit: (data: {
    email: string;
  }) => void;
};


function ForgetPasswordForm({ onSubmit }: ForgetPasswordFormProps) {

    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        const data = {
            email: form.email.value,
        };

        onSubmit(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST" className='mt-5 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='text-[14px] font-semibold'>Email</label><br/>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                </div>
                <button type="submit" className="bg-accent text-primary rounded-md py-2 mt-5 text-[14px] font-semibold cursor-pointer hover:opacity-80 transition-all">Send Reset Password Email</button>
            </form>
        </div>
    );
}

export default ForgetPasswordForm;