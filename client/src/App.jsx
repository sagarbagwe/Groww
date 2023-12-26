import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { logo } from './assets';
import CheckoutPage from './CheckoutPage';
import PaymentPage from './PaymentPage';
import OrderConfirmationPage from './OrderConfirmationPage';

const Home = () => {
  return (
    <div>
      <main
        style={{
          background: '#f9fafe',
          minHeight: 'calc(100vh - 73px)',
        }}
        className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]"
      >
        <div
          style={{
            border: '1px solid #e2e8f0',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <h1 className="text-4xl font-bold mb-4">GrowwCO</h1>
          <p className="text-xl font-semibold mb-4">SDE Intern - Assignment Round</p>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Payment Process:</h2>
            <ol className="list-decimal pl-6">
              <li>Navigate to the checkout page on the website or application.</li>
              <li>Retrieve relevant data from the API to populate the checkout page with necessary information.</li>
              <li>Adjust the items in your shopping cart as needed by adding new items or removing existing ones.</li>
              <li>Locate and click the "Proceed to Payment" button to advance to the payment processing stage.</li>
              <li>Transition to the payment page where you will input payment details.</li>
              <li>Select any preferred payment option available, such as credit/debit card, PayPal, etc.</li>
              <li>After choosing the payment method, click on the confirmation button to initiate the payment processing.</li>
              <li>If the payment is successful, print or display the confirmation page with details of the completed transaction.</li>
              <li>If the payment fails, click on the "Try Again" page.</li>
              <li>On the "Try Again" page, select an alternative payment option for the transaction.</li>
              <li>Click on the confirmation button again to process the alternative payment method.</li>
              <li>If the payment is successful, print the confirmation page. If not, you may choose to retry with another option or follow any additional instructions provided.</li>
              <li>Display a "Thank you for shopping" message to acknowledge the successful completion of the transaction.</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const theme = {
    "--background": "hsl(0, 0%, 100%)",
    "--foreground": "hsl(240, 10%, 3.9%)",
    "--primary": "hsl(240, 5.9%, 10%)",
    "--primary-foreground": "hsl(0, 0%, 98%)",
  };

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setOrderDetails(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePlaceOrder = (paymentMethod) => {
    const orderStatusOptions = ['Success', 'Failure', 'Pending'];
    const randomStatusIndex = Math.floor(Math.random() * orderStatusOptions.length);
    const randomOrderStatus = orderStatusOptions[randomStatusIndex];

    // Set the selected payment method
    setSelectedPaymentMethod(paymentMethod);

    // Return an object with data to be passed to the confirmation page
    return {
      orderDetails,
      selectedPaymentMethod: paymentMethod,
      orderStatus: randomOrderStatus,
    };
  };

  return (
    <BrowserRouter>
      <header
        style={{
          background: theme["--background"],
          borderBottom: `1px solid ${theme["--foreground"]}`,
        }}
        className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link to="/home">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex items-center">
          <Link to="/checkout" className="mr-4">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl mr-2" />
            Checkout
          </Link>
        </div>
      </header>
      <main
        style={{
          background: theme["--background"],
          minHeight: "calc(100vh - 73px)",
        }}
        className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]"
      >
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage orderDetails={orderDetails} />} />
          <Route
            path="/payment"
            element={
              orderDetails ? (
                <PaymentPage
                  orderDetails={orderDetails}
                  onPlaceOrder={handlePlaceOrder}
                />
              ) : null
            }
          />
          <Route
            path="/confirmation/*"
            element={<OrderConfirmationPage />}
          />
        </Routes>
        <Analytics />
      </main>
      {/* Footer */}
      <footer
        style={{
          background: theme["--foreground"],
          color: theme["--primary-foreground"],
          textAlign: "center",
          padding: "1rem",
        }}
        className="w-full"
      >
        <p>&copy; 2023 Sagar Bagwe</p>
      </footer>
    </BrowserRouter>
  );
};

export default App;
