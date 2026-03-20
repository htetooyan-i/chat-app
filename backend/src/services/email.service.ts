import { Resend } from "resend";
import EmailTemplates from "../lib/EmailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {

    private static async sendEmail(to: string, subject: string, react: React.ReactNode) {
        try {
            const response = await resend.emails.send({
            from: process.env.FROM_EMAIL || "no-reply@chatapp.com",
            to,
            subject,
            react,
            });
            return response;
        } catch (err) {
            console.error("Error sending email:", err);
            throw err;
        }
    }

    private static createLink(path: string, token: string) {
        const base = process.env.BACKEND_URL; // Change to your frontend URL in production
        return `${base}${path}?token=${token}`;
    }

    static async sendWelcomEmail(to: string, token: string) {
        const link = this.createLink("/api/auth/verify-email", token);
        const react = await EmailTemplates.WelcomeEmailTemplate(link);
        await this.sendEmail(to, "Welcome to ChatApp!", react);
    }

    static async sendVerificationEmail(to: string, token: string) {
        const link = this.createLink("/api/auth/verify-email", token);
        const react = await EmailTemplates.VerificationEmailTemplate(link);
        await this.sendEmail(to, "Verify your email", react);
    }

    static async sendPasswordResetEmail(to: string, token: string) {
        const react = await EmailTemplates.PasswordResetEmailTemplate(`${process.env.FRONTEND_URL}/reset-password?token=${token}`);
        await this.sendEmail(to, "Reset your password", react);
    }

}
