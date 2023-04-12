export default function formatPrice(price) {
  return new Intl.NumberFormat('ko', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
}
