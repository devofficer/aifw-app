import emailjs from "@emailjs/browser";

export const sendEmail = async (templateId: string, data: any) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
    templateId,
    data,
    process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
  );
};
