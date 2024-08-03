import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [amount, setAmount] = useState(0);

  const coursePrices = {
    java: 200,
    python: 300,
    c: 300,
    cpp: 400,
    webdev: 500,
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    setAmount(coursePrices[course]);
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/payment', { amount: amount });
      const options = {
        key: 'rzp_test_D7dUiJyEe7kjFZ', 
        amount: data.amount,
        currency: 'INR',
        name: 'Course Payment',
        description: `Payment for ${selectedCourse} course`,
        order_id: data.id,
        handler: function (response) {
          alert('Payment successful!');
          console.log(response);
          window.location.href = '/confirmation';
        },
        prefill: {
          name: 'sai',
          email: 'sai@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
   
    <div className="payment-form">
      <h1>Course Payment</h1>
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select Course</option>
        <option value="java">Java - ₹200</option>
        <option value="python">Python - ₹300</option>
        <option value="c">C - ₹300</option>
        <option value="cpp">C++ - ₹400</option>
        <option value="webdev">Web Development - ₹500</option>
      </select>
      <div className="amount">Amount: ₹{amount}</div>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  
  );
};

export default PaymentForm;


