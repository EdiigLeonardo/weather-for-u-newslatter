// export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
//     const formData = new URLSearchParams();
//     formData.append('to', to);
//     formData.append('subject', subject);
//     formData.append('text', text);

//     try {
//         const response = await fetch("https://getform.io/f/dd30355a-2c79-40c8-b0fa-0b5826778f3d", {
//             method: "POST",
//             body: formData,
//             headers: {
//                 "Accept": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         console.log('Email sent successfully:', await response.json());
//     } catch (error) {
//         console.error('Failed to send email:', error);
//     }
// };
"use server";
import nodemailer from 'nodemailer';

// Configuração do transporter (substitua com suas credenciais)
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail
  host: process.env.SMTP_SERVER_HOST, // ex: smtp.gmail.com
  port: 587, // porta padrão para TLS
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.SMTP_SERVER_USERNAME, // seu e-mail
    pass: process.env.SMTP_SERVER_PASSWORD, // sua senha ou senha de aplicativo
  },
});

/**
 * Função para enviar e-mails usando Nodemailer.
 * @param to - E-mail do destinatário.
 * @param subject - Assunto do e-mail.
 * @param text - Conteúdo do e-mail em texto simples.
 * @returns Promise<void>
 */
export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  try {
    // Verifica se o transporter está configurado corretamente
    await transporter.verify();
    console.log('Server is ready to send emails');

    // Configura as opções do e-mail
    const mailOptions = {
      from: process.env.SMTP_SERVER_USERNAME, // E-mail do remetente
      to, // E-mail do destinatário
      subject, // Assunto do e-mail
      text, // Corpo do e-mail em texto simples
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};
