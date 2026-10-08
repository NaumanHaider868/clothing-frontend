import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSaved } from "../../../context/SavedContext";
import { Price } from "../../../components/Price";
import fallback from "../../../assets/img/cloth1.png";

export default function Saved() {
  const { items, toggle } = useSaved();

  return (
    <div className="products shop-page pt-[65px] pr-[52px]">
      <div className="shop-main">
        <h1 className="text-[28px] font-bold tracking-[2px]">SAVED</h1>
        {items.length === 0 ? <p className="pt-6">You have not saved any products yet.</p> : null}
        <div className="shop-grid">
          {items.map((product) => (
            <div key={product.id} className="shop-card-wrap">
              <button type="button" className="save-mark on" onClick={() => toggle(product)} aria-label="Remove from saved">
                <FaHeart />
              </button>
              <Link to={`/product/${product.id}`} className="product shop-card">
                <div className="img">
                  <img src={product.image || fallback} alt={product.name} loading="lazy" decoding="async" />
                </div>
                <div className="details pt-[14px]">
                  <span className="type text-[#525252] text-[12px]">{product.collection || product.type}</span>
                  <div className="detail flex justify-between">
                    <span className="text-[14px]">{product.name}</span>
                    <Price product={product} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
