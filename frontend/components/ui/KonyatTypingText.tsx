import type { CSSProperties } from 'react';
import Image from 'next/image';

type KonyatTypingTextProps = {
    text?: string;
    className?: string;
};

function KonyatTypingText({ text = 'Konyat', className = '' }: KonyatTypingTextProps) {
    const typingStyle = {
        '--konyat-chars': `${Math.max(text.length, 1)}ch`,
        '--konyat-steps': `${Math.max(text.length, 1)}`,
    } as CSSProperties;

    return (
        <div className={`flex items-center konyat-type-with-logo ${className}`.trim()}>
            <span className='konyat-static-logo'>
                <Image
                    src='/logo.png'
                    alt='Konyat logo'
                    width={20}
                    height={20}
                    className='konyat-static-logo-image'
                    priority
                />
            </span>
            <div style={typingStyle} className='konyat-type-shell flex items-center'>
                <span className='konyat-type-loop'>
                    {text}
                </span>
            </div>
        </div>
    );
}

export default KonyatTypingText;
