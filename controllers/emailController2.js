import nodemailer from 'nodemailer';

// Function to send email
export const sendReply = async (req, res) => {
  const { to, from, subject, text, adminFirstName, adminLastName } = req.body;

  try {
    // Creating transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', 
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    await transporter.sendMail({
      from: `${from}`, 
      to, 
      subject,
      text: `
        From: ${adminFirstName} ${adminLastName}
        Email: ${from}

        ${text}
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
