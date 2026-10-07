import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { coverImage } from "../utlis/product";
import { useAuth } from "./AuthContext";

const GUEST_KEY = "saved-products";
const SavedContext = createContext(null);

const read = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

const snapshot = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  onSale: product.onSale,
  discountPercent: product.discountPercent,
  collection: product.collection,
  type: product.type,
  gender: product.gender,
  image: coverImage(product),
});

const storageKey = (user) => (user?.id ? `saved-products:${user.id}` : GUEST_KEY);

export function SavedProvider({ children }) {
  const { user } = useAuth();
  const key = storageKey(user);
  const [items, setItems] = useState(() => read(key));

  useEffect(() => {
    if (!user?.id) {
      setItems(read(GUEST_KEY));
      return;
    }
    const mine = read(key);
    const guest = read(GUEST_KEY);
    const merged = [...mine];
    guest.forEach((item) => {
      if (!merged.some((entry) => entry.id === item.id)) merged.unshift(item);
    });
    write(key, merged);
    if (guest.length) write(GUEST_KEY, []);
    setItems(merged);
  }, [user?.id, key]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isSaved(id) {
        return items.some((item) => item.id === id);
      },
      toggle(product) {
        setItems((current) => {
          const next = current.some((item) => item.id === product.id)
            ? current.filter((item) => item.id !== product.id)
            : [snapshot(product), ...current];
          write(storageKey(user), next);
          return next;
        });
      },
    }),
    [items, user]
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export const useSaved = () => useContext(SavedContext);
