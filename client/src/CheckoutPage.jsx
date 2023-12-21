import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo } from './assets';
import { FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa'; // Import icons

const CheckoutPage = ({ orderDetails }) => {
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const deliveryDetails = {
    name: 'Sagar Bagwe',
    address: '123 Main St, Cityville, State, 12345',
    contact: '+91 8276282872',
  };

  const [quantity, setQuantity] = useState(1);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Additional logic or redirection to the payment page can be added here
  };

  const orderTotal = orderDetails.products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-20 object-contain" />
        </Link>

        {/* Checkout heading */}
        <h1 className="text-2xl font-bold">Checkout </h1>
      </div>

      {/* Delivery Details */}
      <div className="mb-4 rounded p-4 border">
        <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
        <div className="flex items-center mb-2">
          <FaUser className="inline-block mr-2" />
          <p>{deliveryDetails.name}</p>
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="inline-block mr-2" />
          <p>{deliveryDetails.address}</p>
        </div>
        <div className="flex items-center">
          <FaPhone className="inline-block mr-2" />
          <p>{deliveryDetails.contact}</p>
        </div>
      </div>

      {/* Order List */}
      <div className="mb-4 rounded p-4 border">
        <h2 className="text-xl font-semibold mb-2">Order List</h2>
        <ol className="list-none pl-8">
          {orderDetails.products.map((product, index) => (
            <li key={product.id} className="border rounded p-4 mb-2">
              <div className="flex items-center">
                {product.title && (
                  <img src={product.image} alt={product.title} className="w-10 h-10 object-cover mr-2" />
                )}
                {product.title ? (
                  <>
                    <span>{product.title} - ${product.price}</span>
                    <div className="ml-auto flex items-center">
                      <button onClick={handleDecrement} className="bg-blue-500 text-white py-1 px-2 rounded-l">
                        -
                      </button>
                      <span className="bg-blue-100 text-blue-500 py-1 px-4">{quantity}</span>
                      <button onClick={handleIncrement} className="bg-blue-500 text-white py-1 px-2 rounded-r">
                        +
                      </button>
                    </div>
                  </>
                ) : (
                  <span>Product - ${product.price} x {product.quantity}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Order Summary */}
      <div className="mb-4 rounded p-4 border">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p>Total Items: {orderDetails.products.length}</p>
        <p>Order Total: ${orderTotal.toFixed(2)}</p>
      </div>

      {/* Continue to Payment Button */}
      <Link
        to="/payment"
        onClick={handleButtonClick}
        className={`py-2 px-4 rounded ${buttonClicked ? 'bg-green-500' : 'bg-blue-500'} text-white`}
      >
        Continue to Payment
      </Link>
    </div>
  );
};

export default CheckoutPage;
