import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import CashIcon from './CashIcon';
import UPIIcon from './UPIIcon';
import WalletIcon from './WalletIcon';
import CardIcon from './CardIcon';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderDetails, selectedPaymentMethod, orderStatus, paymentDetails } = location.state || {};

  if (!orderDetails || !selectedPaymentMethod || !orderStatus || !paymentDetails) {
    // If data is not available, handle appropriately (redirect, show error, etc.)
    return <div>Error: Data not available</div>;
  }

  const getPaymentStatusIcon = () => {
    const iconSize = 30;

    if (orderStatus === 'Success') {
      return <FaCheckCircle className={`text-green-500 mr-2 text-${iconSize}`} />;
    } else if (orderStatus === 'Failure') {
      return <FaTimesCircle className={`text-red-500 mr-2 text-${iconSize}`} />;
    } else if (orderStatus === 'Pending') {
      return <FaClock className={`text-yellow-500 mr-2 text-${iconSize}`} />;
    }
  };

  const paymentMethodIcons = {
    'Cash on Delivery': <CashIcon />,
    'Card': <CardIcon />,
    'UPI': <UPIIcon />,
    'Wallet': <WalletIcon />,
  };

  const getPaymentMethodIcon = () => {
    return paymentMethodIcons[selectedPaymentMethod] || null;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTryAgain = () => {
    // Redirect to the payment page
    navigate('/payment');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
        {orderDetails.products.map((product) => (
          <div key={product.id} className="flex items-center mb-2 rounded p-4 bg-gray-100">
            <img src={product.image} alt={product.title} className="w-10 h-10 object-cover mr-2" />
            <div className="flex-grow">
              <p className="mb-1">{product.title}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Price: ${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="flex items-center">
          <button className="payment-method-button flex items-center">
            {getPaymentMethodIcon()}
            <p className="ml-2">{selectedPaymentMethod}</p>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Status</h2>
        <p>
          {getPaymentStatusIcon()}
          Status: {orderStatus}
        </p>
        {orderStatus === 'Success' && <p>Thank you for your purchase!</p>}
        {orderStatus === 'Failure' && (
          <>
            <p>Oops! Something went wrong with your order.</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={handleTryAgain}>
              Try Again
            </button>
          </>
        )}
        {orderStatus === 'Pending' && <p>Your order is being processed.</p>}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
        <p>Total Payment: ${paymentDetails.totalPayment.toFixed(2)}</p>
        <p>Platform Fee (2%): ${paymentDetails.platformFee.toFixed(2)}</p>
        <p>GST (18%): ${paymentDetails.gst.toFixed(2)}</p>
        <p>Total Amount Payable: ${paymentDetails.totalAmountPayable.toFixed(2)}</p>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4" onClick={handlePrint}>
        Print
      </button>

      <Link to="/home" className="bg-green-500 text-white py-2 px-4 rounded">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
