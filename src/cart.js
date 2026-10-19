const PROMO_CODE = 'SAVE10';
const PROMO_DISCOUNT_RATE = 0.1;
const PROMO_MIN_SUBTOTAL = 20000;
const DELIVERY_PRICE = 30000;
const FREE_DELIVERY_MIN_SUBTOTAL = 50000;

function addToCart(cart, product, quantity) {
  if (quantity <= 0) throw new RangeError('Количество должно быть положительным');

  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = existing ? existing.quantity + quantity : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше, чем есть на складе');
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) throw new RangeError('Количество должно быть положительным');

  const item = cart.find((product) => product.id === productId);
  if (!item) return cart;

  if (quantity > item.stock) {
    throw new RangeError('Количество не может превышать остаток на складе');
  }

  return cart.map((product) =>
    product.id === productId ? { ...product, quantity } : product
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promoCode === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL
      ? Math.round(subtotal * PROMO_DISCOUNT_RATE)
      : 0;
  const delivery = subtotal < FREE_DELIVERY_MIN_SUBTOTAL ? DELIVERY_PRICE : 0;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;