import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields', success: false });
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });

    // Email content
    const mailOptions = {
      from: `"Kemada Website" <${process.env.EMAIL_USER || 'noreply@kemada.de'}>`,
      to: 'info@kemada.de',
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `
Name: ${name}
Email: ${email}
Telefon: ${phone || 'Nicht angegeben'}

Nachricht:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #9c6644;">Neue Kontaktanfrage von der Kemada Website</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
  <p><strong>Nachricht:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully', success: true });
  } catch (error) {
    console.error('Email konnte nicht gesendet werden:', error);
    return res.status(500).json({ message: 'Email konnte nicht gesendet werden', success: false });
  }
} 