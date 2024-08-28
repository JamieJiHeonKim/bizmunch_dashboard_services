import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { SEND_GRID_API_KEY } from '../../middleware/env';
import { Logger } from '../../middleware/log4';


sgMail.setApiKey(SEND_GRID_API_KEY);

/**
 * @description Mail内容を元にメールを送信
 * @param message
 * @returns Promise<any>
 */
export const sendMessage = async (message: MailDataRequired) => {
  try {
    let isSend =await sgMail.send(message);
    Logger.info('Email was sent.');
    return Promise.resolve(isSend);
  } catch (err) {
    Logger.error(err);
    return Promise.reject(err);
  }
};
