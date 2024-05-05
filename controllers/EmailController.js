import nodemailer from 'nodemailer';

// Function to send email
export const sendEmail = async (req, res) => {
  const { first_name, last_name, email, phone_number, message } = req.body;

  try {
    // Creating transporter
    const transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com', 
      port: 587, 
      secure: false, 
      auth: {
        user: 'zgjimizh2409@gmail.com', 
        pass: 'mgnw tnww vgwb dsmd', 
      },
    });

    
    await transporter.sendMail({
        from: `${email}`, 
        to: 'zgjimizh2409@gmail.com', 
        subject: 'New Contact Form Submission',
        text: `
          Name: ${first_name} ${last_name}
          Email: ${email}
          Phone Number: ${phone_number}
          Message: ${message}
        
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
