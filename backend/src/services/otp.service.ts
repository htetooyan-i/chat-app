import { twilioClient } from "../lib/twilio";

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
            console.log("OTP sent:", message.sid);
        } catch (err) {
            console.error("Failed to send OTP:", err);
            throw new Error("Failed to send OTP");
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
            throw new Error("Failed to verify OTP");
        }
    }

    // Generate a 6-digit code
    private static generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}