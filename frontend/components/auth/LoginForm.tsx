import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

type LoginFormProps = {
    isSubmitting: boolean;
    onSubmit: (data: {
        email: string;
        password: string;
    }) => void;
    showForgetPassword: () => void;
};

function LoginForm({ onSubmit, showForgetPassword, isSubmitting }: LoginFormProps) {
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        const data = {
            email: form.email.value,
            password: form.password.value,
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
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-[14px] font-semibold'>Password</label><br/>
                    <div className="relative">
                        <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                        {
                            isPasswordVisible ? (
                                <EyeOff type="button" onClick={() => setIsPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            ) : (
                                <Eye type="button" onClick={() => setIsPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            )
                        }
                    </div>
                </div>
                <div>
                    <button type="button" onClick={showForgetPassword} className="underline text-accent font-[11px]">Forget password?</button>
                </div>
                <button type="submit" disabled={isSubmitting} className={`bg-accent text-primary rounded-md py-2 mt-5 font-[14px] font-semibold cursor-pointer hover:opacity-80 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;