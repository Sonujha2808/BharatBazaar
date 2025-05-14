const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer"); // <-- ✨ Added Nodemailer

const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require('./routes/paymentroute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow cookies and credentials
}));

// API Routes
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/payment', paymentRoutes);

// ✨ NEW Subscribe Route
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // <-- Use from .env
        pass: process.env.EMAIL_PASS,  // <-- App Password from .env
      },
    });

    const mailOptions = {
      from: `"BharatBazaar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for subscribing!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>Welcome to BharatBazaar!</h1>
          <p>Thank you for subscribing. We're excited to have you with us!</p>
          <p>Stay tuned for amazing offers and updates 🚀</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription email sent successfully." });
  } catch (error) {
    console.error("Error sending subscription email:", error);
    res.status(500).json({ message: "Failed to send subscription email." });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
