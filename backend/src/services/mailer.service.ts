import nodemailer from 'nodemailer';

// ─── SMTP Transporter ────────────────────────────────────────────────────────
// Reads config from environment variables.
// For Gmail: set SMTP_USER and SMTP_PASS (App Password, NOT account password).
// For Resend: SMTP_HOST=smtp.resend.com, SMTP_PORT=465, SMTP_USER=resend, SMTP_PASS=<API_KEY>
// For SendGrid: SMTP_HOST=smtp.sendgrid.net, SMTP_PORT=587, SMTP_USER=apikey, SMTP_PASS=<API_KEY>

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!host || !user || !pass) {
    if (isProduction) {
      console.error('⛔ SMTP not configured! Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
    }
    return null; // Will fall back to console logging in dev
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });
}

// ─── Email Templates ─────────────────────────────────────────────────────────
function getOtpEmailHtml(code: string, purpose: string): { subject: string; html: string; text: string } {
  const isPasswordReset = purpose === 'PASSWORD_RESET';
  const subject = isPasswordReset
    ? '🔑 GenshinHub — Reset Mật Khẩu'
    : '📧 GenshinHub — Xác Nhận Thay Đổi Email';

  const title = isPasswordReset ? 'Đặt lại mật khẩu' : 'Xác nhận email mới';
  const description = isPasswordReset
    ? 'Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Sử dụng mã xác thực bên dưới:'
    : 'Bạn đã yêu cầu thay đổi địa chỉ email. Sử dụng mã xác thực bên dưới:';
  const warning = isPasswordReset
    ? 'Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này. Tài khoản của bạn vẫn an toàn.'
    : 'Nếu bạn không yêu cầu thay đổi email, hãy bỏ qua email này.';

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#04040a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04040a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="text-align:center;padding-bottom:32px;">
              <div style="display:inline-block;background:linear-gradient(135deg,rgba(200,168,75,0.15),rgba(8,8,18,0.9));border:1px solid rgba(200,168,75,0.3);border-radius:16px;padding:16px 32px;">
                <span style="font-size:24px;font-weight:900;letter-spacing:0.1em;background:linear-gradient(135deg,#f0d080,#c8a84b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                  ✦ GENSHINHUB ✦
                </span>
              </div>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#0a0a14;border:1px solid rgba(200,168,75,0.15);border-radius:24px;padding:40px;box-shadow:0 40px 80px rgba(0,0,0,0.5);">
              <!-- Title -->
              <h1 style="margin:0 0 8px;color:#f0d080;font-size:22px;font-weight:900;letter-spacing:0.05em;text-transform:uppercase;">
                ${title}
              </h1>
              <p style="margin:0 0 28px;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">
                ${description}
              </p>

              <!-- OTP Code Box -->
              <div style="background:#080812;border:2px solid rgba(200,168,75,0.3);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
                <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Mã xác thực</p>
                <div style="font-size:44px;font-weight:900;letter-spacing:0.3em;color:#c8a84b;font-family:'Courier New',monospace;line-height:1;">
                  ${code}
                </div>
                <p style="margin:12px 0 0;color:rgba(255,255,255,0.35);font-size:12px;">
                  ⏱ Mã có hiệu lực trong <strong style="color:rgba(255,255,255,0.6);">10 phút</strong>
                </p>
              </div>

              <!-- Warning -->
              <div style="background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.15);border-radius:12px;padding:16px;margin-bottom:24px;">
                <p style="margin:0;color:rgba(200,168,75,0.8);font-size:13px;line-height:1.5;">
                  ⚠️ ${warning}
                </p>
              </div>

              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:12px;line-height:1.6;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;">
                Đây là email tự động từ GenshinHub. Vui lòng không trả lời email này.<br>
                Nếu bạn cần hỗ trợ, hãy liên hệ qua trang web của chúng tôi.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding-top:24px;">
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;">
                © 2024 GenshinHub · Made with ❤️ for Traveler
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${title}\n\nMã xác thực của bạn: ${code}\n\nMã có hiệu lực trong 10 phút.\n\n${warning}\n\n-- GenshinHub Team`;

  return { subject, html, text };
}

// ─── Mailer Service ──────────────────────────────────────────────────────────
export const mailerService = {
  async sendOtpEmail(to: string, code: string, purpose: string = 'EMAIL_CHANGE'): Promise<boolean> {
    const { subject, html, text } = getOtpEmailHtml(code, purpose);
    const from = process.env.EMAIL_FROM || 'GenshinHub <noreply@genshinhub.com>';

    const transporter = createTransporter();

    if (!transporter) {
      // Development fallback — print to console
      console.log('\n=============================================');
      console.log('✉️  [DEV] EMAIL (SMTP not configured)');
      console.log(`To:      ${to}`);
      console.log(`Subject: ${subject}`);
      console.log('---------------------------------------------');
      console.log(`OTP Code: ${code}`);
      console.log(`Purpose:  ${purpose}`);
      console.log('=============================================\n');
      return true;
    }

    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ Email sent to ${to}: ${info.messageId}`);
      return true;
    } catch (error: any) {
      console.error(`❌ Failed to send email to ${to}:`, error.message);
      // In development, log the OTP so devs can still test
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DEV FALLBACK] OTP for ${to}: ${code}`);
        return true; // Don't fail the whole flow in dev
      }
      throw new Error('Không thể gửi email xác thực. Vui lòng thử lại sau.');
    }
  },

  /**
   * Verify SMTP connection on startup (optional, call once in startServer)
   */
  async verifyConnection(): Promise<void> {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('⚠️  Mailer: SMTP not configured — emails will be logged to console only.');
      return;
    }
    try {
      await transporter.verify();
      console.log('✅ Mailer: SMTP connection verified successfully.');
    } catch (error: any) {
      console.error('❌ Mailer: SMTP connection failed:', error.message);
      console.error('   Check SMTP_HOST, SMTP_USER, SMTP_PASS in your .env file.');
    }
  },
};
