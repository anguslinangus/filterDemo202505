import React from "react";

import "./ProductCard.css";

function ProductCard({ item }) {
    if (!item) {
        return null;
    }

    return (
        <div className="card mb-3 shadow-sm h-100">
            <div className="card-body d-flex flex-column"> 
                <h5 className="card-title product-card-title"> 
                    {item.name}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted product-card-subtitle"> 
                    類別：{item.category}
                </h6>
                <div className="mt-auto product-card-text"> 
                    價格：<strong><span className="product-price">${item.price && typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}</span></strong>
                    <div className="mt-1">
                        庫存：{
                            item.inStock
                                ? <span className="badge text-bg-success">有庫存</span>
                                : <span className="badge text-bg-danger">無庫存</span> 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;