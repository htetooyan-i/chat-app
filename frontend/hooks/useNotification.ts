import { notification } from 'antd';

export const useNotification = () => {
    
    const [api, contextHolder] = notification.useNotification();

    const showSuccess = (title: string, description?: string) => {
        api.success({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 3,
        });
    };

    const showError = (title: string, description?: string) => {
        api.error({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 5,
        });
    };

    const showWarning = (title: string, description?: string) => {
        api.warning({
            title,
            description,
            placement: 'topRight',
            showProgress: true,
            duration: 4,
        });
    };

    const showInfo = (title: string, description?: string) => {
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