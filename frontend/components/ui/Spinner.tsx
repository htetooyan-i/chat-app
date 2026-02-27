import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

type SpinnerProps = {
    description?: string;
    size?: SpinProps['size'];
};


const styles: SpinProps['styles'] = {
    indicator: {
        color: 'var(--accent)',
    },
}
function Spinner({ description, size }: SpinnerProps) {
    return (
        <div>
            <Spin description={description || null} size={size || "default"} styles={styles}>
                <div className='p-5' />
            </Spin>
        </div>
    );
}

export default Spinner;