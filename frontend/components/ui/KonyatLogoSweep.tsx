import Image from 'next/image';

type KonyatLogoSweepProps = {
    text?: string;
    className?: string;
};

function KonyatLogoSweep({ text = 'Konyat', className = '' }: KonyatLogoSweepProps) {
    return (
        <span className={`konyat-live-mask ${className}`.trim()}>
            <span className='konyat-live-text'>{text}</span>
            <span className='konyat-live-sweeper'>
                <Image
                    src='/logo.png'
                    alt='Konyat logo'
                    width={18}
                    height={18}
                    className='konyat-live-logo'
                    priority
                />
            </span>
        </span>
    );
}

export default KonyatLogoSweep;
