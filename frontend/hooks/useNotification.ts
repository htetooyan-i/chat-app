import { notification } from 'antd';
import { useEffect, useState } from 'react';

export const useNotification = () => {
    
    const [mounted, setMounted] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        
        setMounted(true);
    }, []);

    const showSuccess = (title: string, description?: string) => {
        if (!mounted) return;
        api.success({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 3,
        });
    };

    const showError = (title: string, description?: string) => {
        if (!mounted) return;
        api.error({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 5,
        });
    };

    const showWarning = (title: string, description?: string) => {
        if (!mounted) return;
        api.warning({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 4,
        });
    };

    const showInfo = (title: string, description?: string) => {
        if (!mounted) return;
        api.info({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 4,
        });
    };

    return {
        contextHolder,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};