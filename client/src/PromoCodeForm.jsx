import React, { useState } from 'react';

const PromoCodeForm = ({ onApplyPromoCode }) => {
  const [promoCode, setPromoCode] = useState('');
  const promoCodesList = ['groww', 'first groww', 'groww with groww'];

  const handleApplyPromoCode = () => {
    // Validate the entered promo code against the list
    if (promoCodesList.includes(promoCode.toLowerCase())) {
      onApplyPromoCode(promoCode);
    } else {
      alert('Invalid promo code. Please enter a valid promo code.');
    }
  };

  return (
    <div className="mb-4 rounded p-4 border">
      <h2 className="text-xl font-semibold mb-2">Promo Code</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          className="py-2 px-4 border rounded-l w-full"
        />
        <button
          onClick={handleApplyPromoCode}
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PromoCodeForm;
