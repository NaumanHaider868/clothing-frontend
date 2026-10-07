import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "../../../utlis/customAPI";
import { apiError } from "../../../utlis/apiError";
import { mediaUrl } from "../../../utlis/product";
import { Price } from "../../../components/Price";
import { useCart } from "../../../context/CartContext";
import { useSaved } from "../../../context/SavedContext";
import fallback from "../../../assets/img/product1.png";

export default function ViewProduct() {
    const { id } = useParams();
    const { addItem } = useCart();
    const { isSaved, toggle } = useSaved();
    const containerRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [variantId, setVariantId] = useState(null);
    const [sizeId, setSizeId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let active = true;
        setProduct(null);
        setError("");
        api
            .get(`/product/fetch/${id}`)
            .then((response) => {
                if (!active) return;
                const next = response.data.data;
                setProduct(next);
                const variant = next.variants?.[0];
                setVariantId(variant?.id ?? null);
                const size = variant?.sizes?.find((item) => item.stockCount > 0) || variant?.sizes?.[0];
                setSizeId(size?.id ?? null);
            })
            .catch((err) => {
                if (active) setError(apiError(err, "Product not found"));
            });
        return () => {
            active = false;
        };
    }, [id]);

    const variant = product?.variants?.find((item) => item.id === variantId) || product?.variants?.[0];
    const images = useMemo(() => {
        const urls = (variant?.images || []).map((image) => mediaUrl(image.imageUrl)).filter(Boolean);
        return urls.length ? urls : [fallback];
    }, [variant]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const updateProgress = () => {
            const progressPercentage = ((container.scrollTop + container.clientHeight) / container.scrollHeight) * 100;
            setProgress(progressPercentage || 0);
        };

        updateProgress();
        container.addEventListener("scroll", updateProgress);
        return () => container.removeEventListener("scroll", updateProgress);
    }, [images]);

    const selectVariant = (next) => {
        setVariantId(next.id);
        setCurrentImageIndex(0);
        const size = next.sizes?.find((item) => item.stockCount > 0) || next.sizes?.[0];
        setSizeId(size?.id ?? null);
    };

    const addToCart = async () => {
        const size = variant?.sizes?.find((item) => item.id === sizeId);
        if (!variant || !size) {
            toast.error("Choose a size");
            return;
        }
        setSaving(true);
        try {
            await addItem({
                productId: product.id,
                variantId: variant.id,
                sizeId: size.id,
                quantity: 1,
                product,
                variant,
                size,
            });
            toast.success("Added to cart");
        } catch (err) {
            toast.error(err?.response ? apiError(err, "Could not add this product") : err.message);
        } finally {
            setSaving(false);
        }
    };

    if (error) {
        return <div className="view-product p-10">{error}</div>;
    }
    if (!product) {
        return <div className="view-product p-10">Loading...</div>;
    }

    return (
        <div className="view-product">
            <div className="relative product-img">
                <div className="left" ref={containerRef}>
                    {images.map((image, index) => (
                        <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={product.name}
                            onClick={() => {
                                setCurrentImageIndex(index);
                                setIsOpen(true);
                            }}
                        />
                    ))}
                </div>
                <div className="progress-bar" style={{ height: `${progress}%` }} />
            </div>
            <div className="right">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className={`like w-[34px] h-[34px] bg-white flex items-center justify-center ${isSaved(product.id) ? "on" : ""}`}
                        onClick={() => toggle(product)}
                        aria-label={isSaved(product.id) ? "Remove from saved" : "Save product"}
                    >
                        {isSaved(product.id) ? <FaHeart className="text-[18px]" /> : <CiHeart className="text-[24px]" />}
                    </button>
                </div>
                <div className="product-detail">
                    <div className="top">
                        <span className="heading">{product.name}</span>
                        <Price product={product} />
                        <span className="tax">MRP incl. of all taxes</span>
                    </div>
                    <div className="desc">
                        <span>{product.description}</span>
                    </div>
                    <div className="bottom">
                        <div className="colors">
                            <span>Color</span>
                            <div className="detail">
                                {(product.variants || []).map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className="color"
                                        onClick={() => selectVariant(item)}
                                        style={{
                                            background: item.color,
                                            outline: item.id === variant?.id ? "2px solid #000" : "none",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="sizes">
                            <span>Size</span>
                            <div className="detail">
                                {(variant?.sizes || []).map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className="size"
                                        disabled={item.stockCount < 1}
                                        onClick={() => setSizeId(item.id)}
                                        style={{
                                            background: item.id === sizeId ? "#000" : undefined,
                                            color: item.id === sizeId ? "#fff" : undefined,
                                            opacity: item.stockCount < 1 ? 0.35 : 1,
                                        }}
                                    >
                                        {item.size}
                                    </button>
                                ))}
                            </div>
                            {product.modelDetail ? <span className="size-text">{product.modelDetail}</span> : null}
                        </div>
                        <button type="button" className="product-add" onClick={addToCart} disabled={saving}>
                            {saving ? "ADDING" : "ADD"}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <Lightbox
                    mainSrc={images[currentImageIndex]}
                    nextSrc={currentImageIndex < images.length - 1 ? images[currentImageIndex + 1] : null}
                    prevSrc={currentImageIndex > 0 ? images[currentImageIndex - 1] : null}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setCurrentImageIndex((index) => Math.max(0, index - 1))}
                    onMoveNextRequest={() => setCurrentImageIndex((index) => Math.min(images.length - 1, index + 1))}
                />
            )}
        </div>
    );
}
