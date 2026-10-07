interface ClientConfirmationParams {
    name: string;
    packageInterest?: string;
}

export function clientConfirmationHtml({ name, packageInterest }: ClientConfirmationParams): string {
    const firstName = name.split(" ")[0];

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
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,'Helvetica Neue',Helvetica,Arial,sans-serif;color-scheme:light only;-webkit-text-size-adjust:none;">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:600px;width:100%;background:#0b0f14;border-radius:14px;border:1px solid rgba(56,189,248,0.18);overflow:hidden;">

    <!-- Top gradient accent line -->
    <tr>
        <td style="height:3px;background:linear-gradient(90deg,#0b0f14 0%,#38bdf8 35%,#00bfff 65%,#0b0f14 100%);font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- Logo -->
    <tr>
        <td style="padding:32px 32px 0;text-align:center;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 auto;">
                <tr>
                    <td style="vertical-align:middle;padding-right:3px;">
                        <span style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;color:#f8fafc;letter-spacing:-1px;line-height:1;">Sud</span>
                    </td>
                    <td style="vertical-align:middle;padding:0 2px;">
                        <img src="https://sud0ops.com/icon.svg" alt="0" width="19" height="26" style="display:block;width:19px;height:26px;" />
                    </td>
                    <td style="vertical-align:middle;padding-left:3px;">
                        <span style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;color:#94a3b8;letter-spacing:-1px;line-height:1;">Ops</span><span style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;color:#38bdf8;line-height:1;">_</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Divider -->
    <tr>
        <td style="padding:20px 32px 0;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:60px;margin:0 auto;">
                <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#38bdf8,transparent);font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
        </td>
    </tr>

    <!-- Greeting -->
    <tr>
        <td style="padding:28px 32px 0;text-align:center;">
            <h1 style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#f8fafc;margin:0 0 8px;letter-spacing:-0.3px;">
                Thanks for reaching out, ${firstName}.
            </h1>
            <p style="font-size:15px;color:#94a3b8;margin:0;line-height:1.6;">
                We&rsquo;ve received your enquiry and will get back to you within <strong style="color:#f8fafc;">24 hours</strong>.
            </p>
        </td>
    </tr>

    ${packageInterest ? `
    <!-- Package interest -->
    <tr>
        <td style="padding:24px 32px 0;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.15);border-radius:8px;padding:16px 20px;">
                <tr>
                    <td>
                        <p style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;">Package of Interest</p>
                        <p style="font-size:15px;color:#38bdf8;font-weight:600;margin:0;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;">${packageInterest}</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    ` : ""}

    <!-- What happens next -->
    <tr>
        <td style="padding:28px 32px 0;">
            <h2 style="font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#f8fafc;margin:0 0 16px;letter-spacing:0.3px;text-transform:uppercase;">What happens next</h2>
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                <tr>
                    <td style="padding:0 0 12px;vertical-align:top;width:28px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr><td style="width:22px;height:22px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);border-radius:6px;text-align:center;vertical-align:middle;font-family:'Courier New',monospace;font-size:11px;color:#38bdf8;font-weight:700;">1</td></tr>
                        </table>
                    </td>
                    <td style="padding:0 0 12px 12px;vertical-align:middle;">
                        <p style="font-size:14px;color:#cbd5e1;margin:0;line-height:1.5;">We review your enquiry and assess your needs.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 12px;vertical-align:top;width:28px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr><td style="width:22px;height:22px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);border-radius:6px;text-align:center;vertical-align:middle;font-family:'Courier New',monospace;font-size:11px;color:#38bdf8;font-weight:700;">2</td></tr>
                        </table>
                    </td>
                    <td style="padding:0 0 12px 12px;vertical-align:middle;">
                        <p style="font-size:14px;color:#cbd5e1;margin:0;line-height:1.5;">A team member reaches out to schedule a consultation.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:0;vertical-align:top;width:28px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr><td style="width:22px;height:22px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);border-radius:6px;text-align:center;vertical-align:middle;font-family:'Courier New',monospace;font-size:11px;color:#38bdf8;font-weight:700;">3</td></tr>
                        </table>
                    </td>
                    <td style="padding:0 0 0 12px;vertical-align:middle;">
                        <p style="font-size:14px;color:#cbd5e1;margin:0;line-height:1.5;">We scope the engagement and get to work.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- CTA -->
    <tr>
        <td style="padding:28px 32px 0;text-align:center;">
            <a href="https://sud0ops.com/packages" style="display:inline-block;background:#38bdf8;color:#0b0f14;font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:8px;letter-spacing:0.2px;">
                View Our Packages
            </a>
        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#080c12;border-top:1px solid rgba(56,189,248,0.1);padding:24px 32px;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                <tr>
                    <td style="padding-bottom:16px;">
                        <p style="font-size:13px;color:#94a3b8;margin:0;line-height:1.6;">Your modern modernization partner. We don&rsquo;t just implement tools &mdash; we build operational maturity.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:16px;">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr>
                                <td style="padding-right:16px;">
                                    <p style="font-size:11px;font-weight:600;color:#f8fafc;margin:0 0 8px;letter-spacing:0.5px;">Expertise</p>
                                    <p style="font-size:11px;color:#94a3b8;margin:0;line-height:1.8;">Cloud Enablement<br/>DevOps Pipelines<br/>AI &amp; Automation<br/>Engineering Standards</p>
                                </td>
                                <td style="padding-left:24px;">
                                    <p style="font-size:11px;font-weight:600;color:#f8fafc;margin:0 0 8px;letter-spacing:0.5px;">Contact</p>
                                    <p style="font-size:11px;color:#94a3b8;margin:0;line-height:1.8;">
                                        <a href="mailto:alex@sud0ops.com" style="color:#94a3b8;text-decoration:none;">alex@sud0ops.com</a><br/>
                                        <a href="https://sud0ops.com" style="color:#94a3b8;text-decoration:none;">sud0ops.com</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.05);">
                        <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">
                            <tr>
                                <td style="vertical-align:middle;">
                                    <p style="font-size:10px;color:#475569;margin:0;">&copy; ${new Date().getFullYear()} Sud0Ops. All rights reserved.</p>
                                </td>
                                <td style="text-align:right;vertical-align:middle;white-space:nowrap;">
                                    <span style="display:inline-block;width:6px;height:6px;background:#22c55e;border-radius:50%;vertical-align:middle;margin-right:5px;"></span>
                                    <span style="font-size:10px;color:#475569;vertical-align:middle;">System Operational</span>
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
        "Thanks for reaching out to Sud0Ops. We've received your enquiry and will get back to you within 24 hours.",
        "",
        packageInterest ? `Package of Interest: ${packageInterest}\n` : "",
        "What happens next:",
        "1. We review your enquiry and assess your needs.",
        "2. A team member reaches out to schedule a consultation.",
        "3. We scope the engagement and get to work.",
        "",
        "View our packages: https://sud0ops.com/packages",
        "",
        "---",
        "Sud0Ops | Cloud. DevOps. Automation.",
        "https://sud0ops.com",
    ].filter(Boolean).join("\n");
}
