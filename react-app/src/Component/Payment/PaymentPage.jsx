// PaymentPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountToPay = location.state?.amountToPay || 0;

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [upiId, setUpiId] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (selectedMethod === 'cod') {
      toast.success('Order placed with Cash on Delivery!');
      setTimeout(() => {
        navigate('/thankyou', { state: { amountPaid: amountToPay } });
      }, 2000);
      return;
    }

    if (selectedMethod === 'upi' && !upiId.trim()) {
      toast.error('Please enter your UPI ID');
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // 1. Create order from backend
      const { data } = await axios.post('https://bharatbazaar-45ug.onrender.com/api/payment/create-order', { amount: amountToPay });

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // 🔥 Replace with your Razorpay API Public Key
        amount: data.amount,
        currency: "INR",
        name: "BharatBazaar",
        description: "Payment",
        order_id: data.id,
        handler: function (response) {
          toast.success('Payment Successful!');
          setTimeout(() => {
            navigate('/thankyou', { state: { amountPaid: amountToPay } });
          }, 2000);
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Payment Failed!');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <ToastContainer position="top-right" />
      <style>{paymentStyles}</style>

      {/* Steps Indicator */}
      <div className="step">
        <div>1. Address</div>
        <div className="active">2. Payment</div>
        <div>3. Thank You</div>
      </div>

      <div className="payment-container">
        {/* Payment Methods */}
        <div className="payment-methods">
          <button
            className={selectedMethod === 'card' ? 'active' : ''}
            onClick={() => setSelectedMethod('card')}
          >
            💳 Card Payment
          </button>
          <button
            className={selectedMethod === 'upi' ? 'active' : ''}
            onClick={() => setSelectedMethod('upi')}
          >
            📱 UPI
          </button>
          <button
            className={selectedMethod === 'cod' ? 'active' : ''}
            onClick={() => setSelectedMethod('cod')}
          >
            💵 Cash on Delivery
          </button>
        </div>

        {/* Payment Form */}
        <div className="payment-form">
          {selectedMethod === 'upi' && (
            <input
              type="text"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}
          {selectedMethod === 'cod' && (
            <p style={{ marginBottom: "1rem", fontWeight: "500" }}>
              Pay in cash when your order is delivered.
            </p>
          )}
          <button className="pay-button" onClick={handlePayment}>
            {selectedMethod === 'cod' ? 'Place Order' : `Pay ₹${amountToPay}`}
          </button>
        </div>

        {/* Amount Summary */}
        <div className="amount-summary">
          <h2>Summary</h2>
          <p>Product Amount: ₹{amountToPay}</p>
          <p style={{ fontWeight: "bold" }}>Final Payable: ₹{amountToPay}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
  },
};

const paymentStyles = `
   .step {
     display: flex;
     justify-content: space-between;
     margin-bottom: 2rem;
     font-size: 0.9rem;
     font-weight: 500;
     color: #6b7280;
   }
   .step .active {
     color: #2563eb;
   }
   .payment-container {
     display: flex;
     gap: 2rem;
   }
   .payment-methods {
     width: 30%;
     border: 1px solid #e5e7eb;
     border-radius: 0.5rem;
     padding: 1rem;
     background-color: #f9fafb;
   }
   .payment-methods button {
     width: 100%;
     background: none;
     border: none;
     padding: 0.8rem;
     text-align: left;
     border-bottom: 1px solid #e5e7eb;
     cursor: pointer;
     font-weight: 500;
     transition: background 0.3s;
     display: flex;
     align-items: center;
     gap: 10px;
   }
   .payment-methods button:hover, .payment-methods .active {
     background-color: #e0e7ff;
   }
   .payment-form {
     flex-grow: 1;
     border: 1px solid #e5e7eb;
     border-radius: 0.5rem;
     padding: 1.5rem;
   }
   .amount-summary {
     width: 25%;
     border: 1px solid #e5e7eb;
     border-radius: 0.5rem;
     padding: 1.5rem;
     height: fit-content;
     background-color: #f9fafb;
   }
   input {
     width: 100%;
     padding: 0.75rem 1rem;
     border: 1px solid #ccc;
     border-radius: 0.375rem;
     outline: none;
     margin-bottom: 1rem;
   }
   input:focus {
     border-color: #2563eb;
     box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
   }
   .flex {
     display: flex;
     gap: 1rem;
   }
   .half {
    width: 50%;
   }
   .pay-button {
     width: 100%;
     background-color: #2563eb;
     color: white;
     padding: 0.75rem;
     border: none;
     border-radius: 0.375rem;
     font-weight: 600;
     font-size: 1rem;
     margin-top: 1rem;
     cursor: pointer;
     transition: background-color 0.3s;
   }
   .pay-button:hover {
     background-color: #1d4ed8;
   }
`;

export default PaymentPage;
