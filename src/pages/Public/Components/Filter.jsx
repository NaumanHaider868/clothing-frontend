import React from 'react';
import { IoClose } from 'react-icons/io5';
import { getTrackBackground, Range } from 'react-range';
import { money } from '../../../utlis/product';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2X'];
const PRICE_MIN = 0;
const PRICE_MAX = 1000;

export default function Filter({
    seasons,
    season,
    size,
    stock,
    priceRange,
    sale,
    onSeason,
    onSize,
    onStock,
    onPrice,
    onSale,
    onClear,
    onClose,
}) {
    const priceOn = priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX;
    const active = [season, size, stock, sale, priceOn ? 'price' : ''].filter(Boolean).length;

    return (
        <div className="shop-filter">
            <div className="shop-filter-bar">
                <span>Filter</span>
                <button type="button" className="shop-filter-close" onClick={onClose} aria-label="Close filters">
                    <IoClose />
                </button>
            </div>

            <section>
                <span className="shop-filter-label">Sale</span>
                <button
                    type="button"
                    className={`shop-filter-sale ${sale ? 'is-on' : ''}`}
                    onClick={() => onSale(sale ? '' : '1')}
                    aria-pressed={Boolean(sale)}
                >
                    <span>On sale</span>
                    <i />
                </button>
            </section>

            <section>
                <span className="shop-filter-label">Size</span>
                <div className="shop-filter-sizes">
                    {SIZES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={size === item ? 'is-on' : ''}
                            onClick={() => onSize(size === item ? '' : item)}
                            aria-pressed={size === item}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <span className="shop-filter-label">Availability</span>
                <div className="shop-filter-list">
                    {[
                        { label: 'In stock', value: 'in' },
                        { label: 'Out of stock', value: 'out' },
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={stock === option.value ? 'is-on' : ''}
                            onClick={() => onStock(stock === option.value ? '' : option.value)}
                            aria-pressed={stock === option.value}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <div className="shop-filter-price-head">
                    <span className="shop-filter-label">Price</span>
                    <span>{money(priceRange[0])} – {money(priceRange[1])}</span>
                </div>
                <Range
                    values={priceRange}
                    step={10}
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    onChange={onPrice}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            className="shop-filter-track"
                            style={props.style}
                        >
                            <div
                                ref={props.ref}
                                className="shop-filter-track-bar"
                                style={{
                                    background: getTrackBackground({
                                        values: priceRange,
                                        colors: ['#d9d9d9', '#111111', '#d9d9d9'],
                                        min: PRICE_MIN,
                                        max: PRICE_MAX,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props }) => {
                        const { key, ...thumb } = props;
                        return <div key={key} {...thumb} className="shop-filter-thumb" />;
                    }}
                />
            </section>

            <section>
                <span className="shop-filter-label">Season</span>
                <div className="shop-filter-list">
                    {seasons.length === 0 ? <p className="shop-filter-empty">No seasons yet</p> : null}
                    {seasons.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={season === item ? 'is-on' : ''}
                            onClick={() => onSeason(season === item ? '' : item)}
                            aria-pressed={season === item}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                </div>
            </section>

            <div className="shop-filter-actions">
                <button type="button" className="shop-filter-clear" onClick={onClear} disabled={!active}>
                    Clear filters
                </button>
                <button type="button" className="shop-filter-done" onClick={onClose}>
                    View products
                </button>
            </div>
        </div>
    );
}
