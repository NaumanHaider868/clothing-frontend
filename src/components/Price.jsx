import { money, unitPrice } from "../utlis/product";

export function Price({ product }) {
  const current = unitPrice(product);
  const original = Number(product?.price || 0);
  const onSale = Boolean(product?.onSale) && original > current;

  return (
    <span className={`price${onSale ? " is-sale" : ""}`}>
      {onSale ? <span className="was">{money(original)}</span> : null}
      <span className="now">{money(current)}</span>
      {onSale ? <span className="sale-tag">Sale</span> : null}
    </span>
  );
}
