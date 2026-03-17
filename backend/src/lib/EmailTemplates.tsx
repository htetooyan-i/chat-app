import React from 'react';
import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

class EmailTemplates {
    static async WelcomeEmailTemplate(link: string) {
        return (
            <Html>
                <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
                    <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "24px",
                        borderRadius: "8px",
                        fontFamily: "Arial, sans-serif",
                    }}
                    >
                    <Heading style={{ color: "#8B5CF6" }}>
                        Welcome to Konyat 👋
                    </Heading>

                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        Thanks for signing up! Please verify your email to continue.
                    </Text>

                    <Button
                        href={link}
                        style={{
                        marginTop: "20px",
                        backgroundColor: "#8B5CF6",
                        color: "#fff",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        }}
                    >
                        Verify Email
                    </Button>

                    {/* Fallback */}
                    <Text style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
                        If the button doesn’t work, copy and paste this link:
                    </Text>

                    <Text style={{ fontSize: "14px", color: "#555" }}>
                        {link}
                    </Text>

                    <Text style={{ marginTop: "20px", fontSize: "12px", color: "#aaa" }}>
                        If you didn’t create an account, you can ignore this email.
                    </Text>
                    </Container>
                </Body>
            </Html>
        ); 
    }

    static async VerificationEmailTemplate(link: string) {
        return (
            <Html>
                <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
                    <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "24px",
                        borderRadius: "8px",
                        fontFamily: "Arial, sans-serif",
                    }}
                    >
                    <Heading style={{ color: "#8B5CF6" }}>
                        Verify Your Email
                    </Heading>

                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        Please click the button below to verify your email address.
                    </Text>

                    <Button
                        href={link}
                        style={{
                        marginTop: "20px",
                        backgroundColor: "#8B5CF6",
                        color: "#fff",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        }}
                    >
                        Verify Email
                    </Button>

                    {/* Fallback */}
                    <Text style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
                        If the button doesn’t work, copy and paste this link:
                    </Text>

                    <Text style={{ fontSize: "14px", color: "#555" }}>
                        {link}
                    </Text>

                    <Text style={{ marginTop: "20px", fontSize: "12px", color: "#aaa" }}>
                        If you didn’t request this, you can ignore this email.
                    </Text>
                    </Container>
                </Body>
            </Html>
        ); 
    }

    static async PasswordResetEmailTemplate(link: string) {
        return (
            <Html>
                <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
                    <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "24px",
                        borderRadius: "8px",
                        fontFamily: "Arial, sans-serif",
                    }}
                    >
                    <Heading style={{ color: "#8B5CF6" }}>
                        Reset Your Password
                    </Heading>

                    <Text style={{ fontSize: "16px", color: "#555" }}>
                        Please click the button below to reset your password.
                    </Text>

                    <Button
                        href={link}
                        style={{
                        marginTop: "20px",
                        backgroundColor: "#8B5CF6",
                        color: "#fff",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        }}
                    >
                        Reset Password
                    </Button>

                    {/* Fallback */}
                    <Text style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
                        If the button doesn’t work, copy and paste this link:
                    </Text>

                    <Text style={{ fontSize: "14px", color: "#555" }}>
                        {link}
                    </Text>

                    <Text style={{ marginTop: "20px", fontSize: "12px", color: "#aaa" }}>
                        If you didn’t request this, you can ignore this email.
                    </Text>
                    </Container>
                </Body>
            </Html>
        ); 
    }
}

export default EmailTemplates;