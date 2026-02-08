import { transporter } from "../lib/mailer";
import nodemailer from "nodemailer";

export class EmailService {

    private static async sendEmail(to: string, subject: string, html: string) {
        const info = await transporter.sendMail({
            from: '"My App" <no-reply@chatapp.com>',
            to,
            subject,
            html,
        });

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    static async sendVerificationEmail(to: string, token: string) {
        const link = `http://localhost:4000/api/auth/verify-email?token=${token}`;
        const html = `
            <p>Click the link below to verify your email:</p>
            <a href="${link}">Verify Email</a>
        `;
        await this.sendEmail(to, "Verify your email", html);
    }

    static async sendPasswordResetEmail(to: string, token: string) {
        const link = `http://localhost:4000/api/auth/reset-password?token=${token}`;
        const html = `
            <p>Click the link below to reset your password:</p>
            <a href="${link}">Reset Password</a>
        `;
        await this.sendEmail(to, "Reset your password", html);
    }

}
