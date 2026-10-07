import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Filter from './Filter';
import { useProducts } from '../../../utlis/useProducts';
import { coverImage, money, unitPrice } from '../../../utlis/product';
import fallback from '../../../assets/img/cloth1.png';

const BATCH = 10;

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [draft, setDraft] = useState(searchParams.get('search') || '');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const search = searchParams.get('search') || '';
    const gender = searchParams.get('gender') || '';
    const season = searchParams.get('season') || '';
    const size = searchParams.get('size') || '';
    const stock = searchParams.get('stock') || '';
    const collection = searchParams.get('collection') || '';

    const { products, loading, error } = useProducts({
        search,
        gender,
        type: season,
        size,
    });
    const { products: catalog } = useProducts();

    const seasons = useMemo(() => {
        const found = new Set(
            catalog.map((product) => product.type?.trim().toLowerCase()).filter(Boolean)
        );
        return [...found];
    }, [catalog]);

    const collections = useMemo(() => {
        const found = new Set(catalog.map((product) => product.collection).filter(Boolean));
        return [...found];
    }, [catalog]);

    const visible = products.filter((product) => {
        const price = unitPrice(product);
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        const matchesCollection = !collection || product.collection === collection;
        const matchesStock = !stock || (stock === 'in' ? product.inStock : !product.inStock);
        return matchesPrice && matchesCollection && matchesStock;
    });
    const filterKey = [search, gender, season, size, stock, collection, priceRange[0], priceRange[1]].join('|');
    const [shown, setShown] = useState(BATCH);
    const [seenFilter, setSeenFilter] = useState(filterKey);
    const [loadingMore, setLoadingMore] = useState(false);
    const sentinelRef = useRef(null);
    const loadingMoreRef = useRef(false);

    if (seenFilter !== filterKey) {
        setSeenFilter(filterKey);
        setShown(BATCH);
        setLoadingMore(false);
        loadingMoreRef.current = false;
    }

    const rows = visible.slice(0, shown);
    const hasMore = !loading && rows.length < visible.length;

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || !hasMore) return undefined;

        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting) || loadingMoreRef.current) return;
            loadingMoreRef.current = true;
            setLoadingMore(true);
            window.setTimeout(() => {
                setShown((count) => count + BATCH);
                setLoadingMore(false);
                loadingMoreRef.current = false;
            }, 450);
        }, { rootMargin: '160px' });

        observer.observe(node);
        return () => observer.disconnect();
    }, [hasMore, shown]);

    const setParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set(key, value);
        else next.delete(key);
        next.delete('page');
        setSearchParams(next);
    };

    return (
        <div className="products shop-page pt-[65px] pr-[52px]">
            <div className="shop-main">
                <div className="product-nav">
                    <div className="right">
                        <div className="path">
                            <Link to="/" className="text-[#6F6F6F] text-[12px] tracking-[2px]">Home</Link> /
                            <span className="text-[12px] tracking-[2px]"> Products</span>
                        </div>
                        <form
                            className="action"
                            onSubmit={(event) => {
                                event.preventDefault();
                                setParam('search', draft.trim());
                            }}
                        >
                            <h6 className="text-[20px] py-[8px] font-bold">
                                {gender ? gender.toUpperCase() : 'PRODUCTS'}
                            </h6>
                            <input
                                type="text"
                                placeholder="Search"
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                            />
                            <i></i>
                        </form>
                    </div>
                    <div className="left">
                        <button
                            type="button"
                            className={!collection ? 'active' : ''}
                            onClick={() => setParam('collection', '')}
                        >
                            ALL
                        </button>
                        {collections.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={collection === item ? 'active' : ''}
                                onClick={() => setParam('collection', collection === item ? '' : item)}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="shop-grid">
                    {loading ? <p className="shop-note">Loading products...</p> : null}
                    {error ? <p className="shop-note">{error}</p> : null}
                    {!loading && !error && visible.length === 0 ? <p className="shop-note">No products match this list.</p> : null}
                    {rows.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="product shop-card">
                            <div className="img">
                                <img
                                    src={coverImage(product) || fallback}
                                    alt={product.name}
                                />
                            </div>
                            <div className="details pt-[14px]">
                                <span className="type text-[#525252] text-[12px]">{product.collection || product.type}</span>
                                <div className="detail flex justify-between">
                                    <span className="text-[14px]">{product.name}</span>
                                    <span className="price text-[14px]">{money(unitPrice(product))}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {hasMore ? (
                    <div className="shop-more" ref={sentinelRef} aria-live="polite">
                        <span className="shop-more-spinner" />
                        <span>{loadingMore ? 'Loading more' : 'More products'}</span>
                    </div>
                ) : null}
            </div>
            <div className='product-sidebar'>
                <Filter
                    seasons={seasons}
                    season={season}
                    size={size}
                    stock={stock}
                    priceRange={priceRange}
                    onSeason={(value) => setParam('season', value)}
                    onSize={(value) => setParam('size', value)}
                    onStock={(value) => setParam('stock', value)}
                    onPrice={setPriceRange}
                />
            </div>
        </div>
    );
}
