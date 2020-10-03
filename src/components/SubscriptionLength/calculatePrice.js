export default function calculatePrice(monthlyPrice, length, discount) {
  const regularPrice = monthlyPrice * length;
  const discountedPrice =
    regularPrice - (monthlyPrice * length * discount) / 100;
  return discount ? discountedPrice.toFixed(2) : regularPrice.toFixed(2);
}
