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
    const start = startDate instanceof Date 
        ? startDate 
        : new Date(startDate);
    const end = endDate instanceof Date 
        ? endDate 
        : new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};