import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="info-page pt-[65px] pr-[52px] pb-[80px]">
      <h1>About</h1>
      <div className="copy">
        <p>
          XIV is a clothing house for men, women, and kids. The shop is set out by season — summer, winter, spring, and autumn — and by what you actually wear: shirts, pants, dresses, outerwear, footwear, and the rest of the wardrobe.
        </p>
        <p>
          Each piece shows its price. When something is on sale, the first price stays beside the reduced one, so the reduction is clear.
        </p>
        <p>
          You can look through the shop, save pieces, and fill a bag before you sign in. An account is asked for only when you place an order.
        </p>
      </div>
      <div className="info-links">
        <Link to="/products">Shop the collection</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
