import React from "react";

import { Badge, Card } from "react-bootstrap";

import "./ProductCard.css";

function ProductCard({item}){
    if(!item){
        return null;
    }

    return(
        <Card className="mb-3 shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="product-card-title">
                    {item.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted product-card-subtitle">
                    類別：{item.category}
                </Card.Subtitle>
                <Card.Text as="div" className="mt-auto product-card-text">
                    價格：<strong><span className="product-price">${item.price.toFixed(2)}</span></strong>
                    <div>
                        庫存：{
                            item.inStock
                            ? <Badge className="bg-success">有庫存</Badge>
                            : <Badge className="bg-danger">無庫存</Badge>
                        }
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;