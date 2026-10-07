const API_ORIGIN = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

export function mediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function coverImage(product) {
  for (const variant of product?.variants || []) {
    const image = variant.images?.[0]?.imageUrl;
    if (image) return mediaUrl(image);
  }
  return "";
}

export function variantImage(variant) {
  return mediaUrl(variant?.images?.[0]?.imageUrl || "");
}

export function unitPrice(product) {
  const price = Number(product?.price || 0);
  if (!product?.onSale) return price;
  const discount = Number(product.discountPercent || 0);
  return Math.round((price - (price * discount) / 100) * 100) / 100;
}

export function money(value) {
  return `$ ${Number(value || 0).toFixed(2)}`;
}

export function lineTotal(item) {
  return Math.round(unitPrice(item.product) * item.quantity * 100) / 100;
}
