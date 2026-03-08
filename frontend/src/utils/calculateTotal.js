// TODO: Calculate cart total from items array
// items: [{ product: { price }, quantity }]

export const calculateTotal = (items = []) => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
