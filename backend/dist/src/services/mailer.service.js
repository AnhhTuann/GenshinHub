"use strict";
/**
 * Mailer Service
 * Used to send OTPs via email. Currently mocks the email sending by printing to console.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerService = void 0;
exports.mailerService = {
    async sendOtpEmail(to, code, purpose = 'EMAIL_CHANGE') {
        // In a real application, you would use nodemailer here:
        // const transporter = nodemailer.createTransport({ ... });
        // await transporter.sendMail({ from, to, subject, text });
        const subject = purpose === 'EMAIL_CHANGE' ? 'GenshinHub - Thay đổi Email' : 'GenshinHub - OTP Xác thực';
        console.log('\n=============================================');
        console.log(`✉️ MOCK EMAIL SENT`);
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`---------------------------------------------`);
        console.log(`Mã OTP của bạn là: ${code}`);
        console.log(`Mã này có hiệu lực trong 5 phút.`);
        console.log('=============================================\n');
        return true;
    }
};
