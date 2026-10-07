import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../utlis/customAPI";
import { useAuth } from "./AuthContext";

const GUEST_CART_KEY = "guest-cart";
const CartContext = createContext(null);

const readGuest = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeGuest = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const guestItem = ({ product, variant, size, quantity }) => ({
  id: `local-${size.id}`,
  productId: product.id,
  variantId: variant.id,
  sizeId: size.id,
  quantity,
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    onSale: product.onSale,
    discountPercent: product.discountPercent,
    collection: product.collection,
    type: product.type,
  },
  variant: {
    id: variant.id,
    color: variant.color,
    images: (variant.images || []).map((image) => ({ imageUrl: image.imageUrl })),
  },
  size: {
    id: size.id,
    size: size.size,
    stockCount: size.stockCount,
  },
});

const mergeGuestCart = async () => {
  const guest = readGuest();
  if (!guest.length) return;
  writeGuest([]);
  const failed = [];
  for (const item of guest) {
    try {
      await api.post("/cart", {
        productId: item.productId,
        variantId: item.variantId,
        sizeId: item.sizeId,
        quantity: item.quantity,
      });
    } catch {
      failed.push(item);
    }
  }
  if (failed.length) writeGuest(failed);
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => (user ? [] : readGuest()));
  const [ready, setReady] = useState(!user);

  const refresh = useCallback(async () => {
    if (!user) {
      const guest = readGuest();
      setItems(guest);
      setReady(true);
      return guest;
    }
    const response = await api.get("/cart");
    const next = Array.isArray(response.data?.data) ? response.data.data : [];
    setItems(next);
    setReady(true);
    return next;
  }, [user]);

  useEffect(() => {
    let active = true;
    setReady(false);
    (async () => {
      try {
        if (!user) {
          if (active) setItems(readGuest());
          return;
        }
        await mergeGuestCart();
        const response = await api.get("/cart");
        if (active) setItems(Array.isArray(response.data?.data) ? response.data.data : []);
      } catch {
        if (active) setItems(user ? [] : readGuest());
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const value = useMemo(
    () => ({
      items,
      ready,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      refresh,
      async addItem(payload) {
        if (user) {
          await api.post("/cart", {
            productId: payload.productId,
            variantId: payload.variantId,
            sizeId: payload.sizeId,
            quantity: payload.quantity,
          });
          await refresh();
          return;
        }
        const current = readGuest();
        const existing = current.find((item) => item.sizeId === payload.size.id);
        const nextQuantity = (existing?.quantity || 0) + payload.quantity;
        if (nextQuantity > payload.size.stockCount) {
          throw new Error(`Only ${payload.size.stockCount} left in size ${payload.size.size}`);
        }
        const nextItem = guestItem({ ...payload, quantity: nextQuantity });
        const next = existing
          ? current.map((item) => (item.sizeId === payload.size.id ? nextItem : item))
          : [nextItem, ...current];
        writeGuest(next);
        setItems(next);
      },
      async updateItem(id, quantity) {
        if (user) {
          await api.patch(`/cart/${id}`, { quantity });
          await refresh();
          return;
        }
        const current = readGuest();
        const item = current.find((entry) => entry.id === id);
        if (!item) return;
        if (quantity > item.size.stockCount) {
          throw new Error(`Only ${item.size.stockCount} left in size ${item.size.size}`);
        }
        const next = current.map((entry) => (entry.id === id ? { ...entry, quantity } : entry));
        writeGuest(next);
        setItems(next);
      },
      async removeItem(id) {
        if (user) {
          await api.delete(`/cart/${id}`);
          await refresh();
          return;
        }
        const next = readGuest().filter((item) => item.id !== id);
        writeGuest(next);
        setItems(next);
      },
    }),
    [items, ready, refresh, user]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
