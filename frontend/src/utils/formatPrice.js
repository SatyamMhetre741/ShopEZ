// TODO: Format a number as currency
// Example: formatPrice(1999) => "₹1,999.00" or "$19.99"

export const formatPrice = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
};
