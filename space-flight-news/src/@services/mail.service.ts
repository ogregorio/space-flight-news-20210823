import * as sendgrid from '@sendgrid/mail';

const sendMail = async () => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.NOTIFICATION_EMAIL,
    from: process.env.NOTIFICATION_EMAIL,
    subject: 'DATABASE SYNCHRONIZING FAILED',
    text: 'A failure occurred while trying to synchronize the database. Check what happened.',
  };
  try {
    await sendgrid.send(msg);
    return true;
  } catch (e) {
    return false;
  }
};

export { sendMail };
