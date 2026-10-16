import { escapeHtml } from "@/lib/email-templates/escape-html";

interface ClientConfirmationParams {
    name: string;
    packageInterest?: string;
}

// Email clients rarely load web fonts, so each family falls back to a system font.
const MONO = "'JetBrains Mono',Consolas,Menlo,'Courier New',monospace";
const HEAD = "'Plus Jakarta Sans','Helvetica Neue',Helvetica,Arial,sans-serif";

// The official Builder Loop wordmark, hosted on the site so it loads for every recipient.
// The alt text keeps the name readable when images are blocked.
const WORDMARK = `<a href="https://sud0ops.com" style="text-decoration:none;"><img src="https://sud0ops.com/brand/sud0ops-email-logo.png" width="188" height="40" alt="Sud0ops" style="display:inline-block;border:0;width:188px;height:40px;font-family:${MONO};font-size:22px;font-weight:700;color:#F8FAFC;" /></a>`;

const step = (n: number, text: string, last = false) => `
                <tr>
                    <td style="padding:0 0 ${last ? 0 : 12}px;vertical-align:top;width:28px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr><td style="width:22px;height:22px;border:1px solid #38BDF8;text-align:center;vertical-align:middle;font-family:${MONO};font-size:11px;color:#38BDF8;font-weight:700;">${String(n).padStart(2, "0")}</td></tr>
                        </table>
                    </td>
                    <td style="padding:0 0 ${last ? 0 : 12}px 12px;vertical-align:middle;">
                        <p style="font-size:14px;color:#CBD5E1;margin:0;line-height:1.5;">${text}</p>
                    </td>
                </tr>`;

export function clientConfirmationHtml({ name, packageInterest }: ClientConfirmationParams): string {
    const firstName = escapeHtml(name.split(" ")[0]);
    const pkg = packageInterest ? escapeHtml(packageInterest) : "";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<style>
:root { color-scheme: light only; }
[data-ogsc], [data-ogsb] { background-color: inherit !important; color: inherit !important; }
</style>
</head>
<body style="margin:0;padding:0;background:#E2E8F0;font-family:Inter,'Helvetica Neue',Helvetica,Arial,sans-serif;color-scheme:light only;-webkit-text-size-adjust:none;">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background:#E2E8F0;padding:32px 16px;">
<tr><td align="center">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:600px;width:100%;background:#0F172A;border:1px solid #273449;border-top:2px solid #38BDF8;">

    <!-- Logo -->
    <tr>
        <td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #273449;">
            ${WORDMARK}
        </td>
    </tr>

    <!-- Greeting -->
    <tr>
        <td style="padding:28px 32px 0;text-align:center;">
            <p style="font-family:${MONO};font-size:12px;color:#94A3B8;margin:0 0 12px;"><span style="color:#FFB800;">$</span> enquiry received</p>
            <h1 style="font-family:${HEAD};font-size:22px;font-weight:800;color:#F8FAFC;margin:0 0 8px;letter-spacing:-0.3px;">
                Thanks for reaching out, ${firstName}.
            </h1>
            <p style="font-size:15px;color:#94A3B8;margin:0;line-height:1.6;">
                We&rsquo;ve received your enquiry and will get back to you within <strong style="color:#F8FAFC;">24 hours</strong>.
            </p>
        </td>
    </tr>

    ${pkg ? `
    <!-- Package interest -->
    <tr>
        <td style="padding:24px 32px 0;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background:#142036;border:1px solid #273449;border-left:2px solid #38BDF8;">
                <tr>
                    <td style="padding:16px 20px;">
                        <p style="font-family:${MONO};font-size:10px;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;">Package of interest</p>
                        <p style="font-family:${HEAD};font-size:15px;color:#F8FAFC;font-weight:700;margin:0;">${pkg}</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    ` : ""}

    <!-- What happens next -->
    <tr>
        <td style="padding:28px 32px 0;">
            <p style="font-family:${MONO};font-size:11px;font-weight:600;color:#94A3B8;margin:0 0 16px;letter-spacing:1.5px;text-transform:uppercase;"><span style="color:#38BDF8;">01</span> / what happens next</p>
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                ${step(1, "We review your enquiry and assess your needs.")}
                ${step(2, "A team member reaches out to schedule a consultation.")}
                ${step(3, "We scope the engagement and get to work.", true)}
            </table>
        </td>
    </tr>

    <!-- CTA -->
    <tr>
        <td style="padding:28px 32px 32px;text-align:center;">
            <a href="https://sud0ops.com/#services" style="display:inline-block;background:#FFB800;color:#0F172A;font-family:${HEAD};font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;">
                See what we fix &rarr;
            </a>
        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#142036;border-top:1px solid #273449;padding:24px 32px;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                <tr>
                    <td style="padding-bottom:16px;">
                        <p style="font-size:13px;color:#94A3B8;margin:0;line-height:1.6;">We don&rsquo;t just advise; we build the pipelines alongside you.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:16px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr>
                                <td style="padding-right:16px;vertical-align:top;">
                                    <p style="font-family:${MONO};font-size:10px;font-weight:600;color:#94A3B8;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;">Services</p>
                                    <p style="font-size:11px;color:#CBD5E1;margin:0;line-height:1.8;">Workflow Automation<br/>Tool Integration<br/>AI Assistants<br/>Operational Dashboards</p>
                                </td>
                                <td style="padding-left:24px;vertical-align:top;">
                                    <p style="font-family:${MONO};font-size:10px;font-weight:600;color:#94A3B8;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;">Contact</p>
                                    <p style="font-size:11px;color:#CBD5E1;margin:0;line-height:1.8;">
                                        <a href="mailto:alex@sud0ops.com" style="color:#CBD5E1;text-decoration:none;">alex@sud0ops.com</a><br/>
                                        <a href="https://sud0ops.com" style="color:#38BDF8;text-decoration:none;">sud0ops.com</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top:16px;border-top:1px solid #273449;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                            <tr>
                                <td style="vertical-align:middle;">
                                    <p style="font-family:${MONO};font-size:10px;color:#94A3B8;margin:0;">&copy; ${new Date().getFullYear()} Sud0ops</p>
                                </td>
                                <td style="text-align:right;vertical-align:middle;white-space:nowrap;">
                                    <span style="font-family:${MONO};font-size:10px;color:#FFB800;">[status: systems optimised]</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function clientConfirmationText({ name, packageInterest }: ClientConfirmationParams): string {
    const firstName = name.split(" ")[0];
    return [
        `Hi ${firstName},`,
        "",
        "Thanks for reaching out to Sud0ops. We've received your enquiry and will get back to you within 24 hours.",
        "",
        packageInterest ? `Package of interest: ${packageInterest}\n` : "",
        "What happens next:",
        "1. We review your enquiry and assess your needs.",
        "2. A team member reaches out to schedule a consultation.",
        "3. We scope the engagement and get to work.",
        "",
        "See what we fix: https://sud0ops.com/#services",
        "",
        "---",
        ">Sud0ops_",
        "We don't just advise; we build the pipelines alongside you.",
        "https://sud0ops.com",
    ].filter(Boolean).join("\n");
}
