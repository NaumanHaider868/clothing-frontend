import menImage from "../assets/img/men3.png";
import womenImage from "../assets/img/cloth1.png";
import kidsImage from "../assets/img/kid1.png";

const SEASONS = ["summer", "winter", "spring", "autumn"];

// Change image on a gender to swap the homepage photo. These files are not loaded from the database.
const GENDERS = [
    {
        label: "Men",
        value: "men",
        image: menImage,
        categories: ["Shirts", "Pants", "Footwear", "Accessories", "Underwear", "Outerwear"],
    },
    {
        label: "Women",
        value: "women",
        image: womenImage,
        categories: ["Shirts", "Pants", "Dresses", "Skirts", "Footwear", "Accessories", "Underwear", "Outerwear"],
    },
    {
        label: "Kids",
        value: "kids",
        image: kidsImage,
        categories: ["Shirts", "Pants", "Footwear", "Accessories", "Outerwear"],
    },
];

export { GENDERS, SEASONS };
