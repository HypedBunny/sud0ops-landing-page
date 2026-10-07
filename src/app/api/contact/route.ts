import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { clientConfirmationHtml, clientConfirmationText } from "@/lib/email-templates/client-confirmation";

export async function POST(req: NextRequest) {
    try {
        const { name, email, company, packageInterest, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Sud0Ops Enquiry" <webmaster@sud0ops.com>`,
            to: "alex@sud0ops.com",
            replyTo: email,
            subject: `New Enquiry from ${name}${company ? ` (${company})` : ""}${packageInterest ? `: ${packageInterest}` : ""}`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nPackage: ${packageInterest || "N/A"}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: 'Inter', sans-serif; background: #0B0F14; color: #f8fafc; padding: 32px; border-radius: 8px; max-width: 600px;">
                    <div style="border-bottom: 1px solid rgba(56,189,248,0.2); padding-bottom: 16px; margin-bottom: 24px;">
                        <h2 style="color: #38BDF8; font-size: 20px; margin: 0;">New Enquiry via Sud0Ops</h2>
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #94a3b8; width: 100px;">Name</td>
                            <td style="padding: 8px 0; color: #f8fafc;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #94a3b8;">Email</td>
                            <td style="padding: 8px 0; color: #f8fafc;"><a href="mailto:${email}" style="color: #38BDF8;">${email}</a></td>
                        </tr>
                        ${company ? `<tr>
                            <td style="padding: 8px 0; color: #94a3b8;">Company</td>
                            <td style="padding: 8px 0; color: #f8fafc;">${company}</td>
                        </tr>` : ""}
                        ${packageInterest ? `<tr>
                            <td style="padding: 8px 0; color: #94a3b8;">Package</td>
                            <td style="padding: 8px 0; color: #38BDF8; font-weight: 600;">${packageInterest}</td>
                        </tr>` : ""}
                    </table>
                    <div style="margin-top: 24px; padding: 16px; background: rgba(56,189,248,0.05); border: 1px solid rgba(56,189,248,0.15); border-radius: 6px;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                        <p style="color: #f8fafc; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        });

        // Send confirmation email to the client
        await transporter.sendMail({
            from: `"Sud0Ops" <webmaster@sud0ops.com>`,
            to: email,
            subject: "We've received your enquiry | Sud0Ops",
            text: clientConfirmationText({ name, packageInterest }),
            html: clientConfirmationHtml({ name, packageInterest }),
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Mail error:", err);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}
