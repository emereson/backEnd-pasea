import { transporter } from '../../utils/nodemailer.js';

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // Dirección de correo electrónico del remitente
      to: email,
      subject: 'Código de Verificación', // Asunto del correo electrónico
      text: `Tu código de verificación es: ${verificationCode}`, // Cuerpo del correo electrónico en texto plano
    });

    console.log('Correo electrónico de verificación enviado:', info);
  } catch (error) {
    console.error('Error al enviar el correo electrónico de verificación:', error);
    throw new Error('No se pudo enviar el correo electrónico de verificación');
  }
};

export { sendVerificationEmail };
