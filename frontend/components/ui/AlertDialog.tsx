import React from 'react';
import { Alert } from 'antd';

type AlertBarProps = {
    title: string;
    type: 'success' | 'info' | 'warning' | 'error';
    showIcon?: boolean;
    closable?: boolean;
    className?: string;
};

function AlertBar({ title, type, showIcon = true, closable = true, className = "" }: AlertBarProps) {
    return (
        <div className={className}>
            <Alert title={title} banner type={type} showIcon={showIcon} closable={closable} />
        </div>
    );
}

export default AlertBar;