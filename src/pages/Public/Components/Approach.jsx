import { Link } from "react-router-dom";
import { GENDERS } from "../../../utlis/shopMenu";

export default function Approach() {
    return (
        <section className="departments">
            <h2>Shop</h2>
            <div className="tiles">
                {GENDERS.map((gender) => (
                    <div className="tile-block" key={gender.value}>
                        <Link to={`/products?gender=${gender.value}`} className="tile">
                            <img src={gender.image} alt="" />
                            <span>{gender.label}</span>
                        </Link>
                        <div className="cats">
                            {gender.categories.map((category) => (
                                <Link
                                    key={category}
                                    to={`/products?gender=${gender.value}&collection=${encodeURIComponent(category)}`}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
