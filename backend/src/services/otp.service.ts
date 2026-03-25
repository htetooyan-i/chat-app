import { twilioClient } from "../lib/twilio";
import { AppError } from '../errors/appError';

export class OTPService {

    // Send OTP
    static async sendOTP(to: string) {
        const from = process.env.TWILIO_PHONE_NUMBER!;

        try {
            const message = await twilioClient.verify.v2
                .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
                .verifications
                .create({
                    to,
                    channel: 'whatsapp',
                });
        } catch (err) {
            console.error("Failed to send OTP:", err);
            throw new AppError('INTERNAL_SERVER_ERROR', 'Failed to send OTP', 500);
        }
    }

    // Verify OTP
    static async verifyOTP(to: string, code: string): Promise<string> {
        try {
            const verificationCheck = await twilioClient.verify.v2
                .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
                .verificationChecks
                .create({
                    to,
                    code,
                });
            return verificationCheck.status;
        } catch (err) {
            console.error("Failed to verify OTP:", err);
            throw new AppError('INTERNAL_SERVER_ERROR', 'Failed to verify OTP', 500);
        }
    }

    // Generate a 6-digit code
    private static generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}