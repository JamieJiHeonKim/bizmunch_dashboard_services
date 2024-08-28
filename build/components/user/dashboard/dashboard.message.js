"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordMessage = exports.VerifyEMailMessage = exports.messages = void 0;
const env_1 = require("../../../middleware/env");
exports.messages = {
    notFound: 'Not Found',
    somethingWentWrong: 'Something went wrong',
    success: 'Success',
    failure: 'Failure',
    'SendMessage.success': 'Message sent successfully',
    'EditMessage.success': ' Edited Successfully',
    'MagazineDeleted.success': 'Magazine Deleted successfully',
    emailAlreadySend: ' Can not edit magazine as email already sent',
    noDataFound: 'No data found',
    internalServerError: 'Internal Server Error',
    dateError: 'Date must be with in next 72 hors',
    noParentFound: 'No Parent Found',
};
const VerifyEMailMessage = (email, link) => ({
    to: email,
    from: env_1.SENDGRID_EMAIL_SENDER,
    subject: 'Please verify your email address',
    html: `
      <p>Dear user,</p>
      <p>Please click on the link below to verify your email address:</p>
      <a href="${link}">${link}</a>
      <p>This link will expire in 30 minutes.</p>
      <p>Regards,</p>
      <p>Your website team</p>
    `
});
exports.VerifyEMailMessage = VerifyEMailMessage;
const ForgotPasswordMessage = (email, link) => ({
    to: email,
    from: env_1.SENDGRID_EMAIL_SENDER,
    subject: 'Reset Password Link',
    html: `
    <p>Dear user,</p>
    <p>Please click on the link below to rest your password:</p>
    <a href="${link}">${link}</a>
    <p>This link will expire in 30 minutes.</p>
    <p>Regards,</p>
    <p>Your website team</p>
  `
});
exports.ForgotPasswordMessage = ForgotPasswordMessage;
//# sourceMappingURL=dashboard.message.js.map