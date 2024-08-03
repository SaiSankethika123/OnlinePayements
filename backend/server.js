require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_D7dUiJyEe7kjFZ', 
  key_secret: 'LfekcozrUjIyp2IBsbvpstEW', 
});

app.post('/api/payment', async (req, res) => {
  const { amount } = req.body;

  try {
    const payment = await razorpay.orders.create({
      amount: amount * 100, 
      currency: 'INR',
    });
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

console.log("My name is", process.env.myname);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Correct mongoose connection and add error handling
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Failed to connect to MongoDB", err));
