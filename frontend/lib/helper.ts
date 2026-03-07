import { Message } from '@/types/Message'

export const handleMaintenanceRoute = () => {
    // Navigate to the maintenance page
    window.location.href = "/maintenance?from=/";
};

export const parsePasswordValidation = (pwd: string) => {
    const hasMinLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return hasMinLength && hasUppercase && hasLowercase && hasNumber;
};

export const formatDate = (dateInput: Date | string, dayIncluded: boolean = false) => {
    const date = dateInput instanceof Date 
        ? dateInput 
        : new Date(dateInput);

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: dayIncluded ? 'numeric' : undefined,
    });
};


export const calculateDays = (startDate: Date | string, endDate: Date | string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDateTime = (dateInput: Date | string) => {
    const date = dateInput instanceof Date 
        ? dateInput 
        : new Date(dateInput);

    return date.toLocaleString(undefined, {
        year: undefined,
        month: undefined,
        day: undefined,
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);
};

export const addMessageToGroup = ( groups: Record<string, Message[]>, message: Message ) => {
    const date = new Date(message.createdAt).toDateString();

    return {
        ...groups,
        [date]: groups[date] ? [...groups[date], message] : [message],
    };
};