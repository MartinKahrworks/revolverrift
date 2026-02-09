const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const PORT = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/contact', async (req, res) => {
    const { name, email, comment } = req.body;
    
    // Validation
    if (!name || !email || !comment) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL_USER,       //add the email id (in env file) of the account u want to get the emails from in env file
                pass: process.env.EMAIL_PASS        //Generate an App Password in your Google Account security settings.
            }
        })
        
        const mailOption = {
            from: email,
            to: process.env.EMAIL_TO,            //email id where u want to recieve the form data
            replyTo: email,
            subject: `New Message From ${name}`,
            text: `Email: ${email}\n\n${comment}`,
        }

        await  transporter.sendMail(mailOption);

        res.status(200).json({message:"Email sent Successfully"})

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.get("/api", async(req, res)=>{
  res.json({message:"working"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API for Vercel
module.exports = app;