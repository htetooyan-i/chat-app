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

export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: undefined };
    return date.toLocaleDateString(undefined, options);
};