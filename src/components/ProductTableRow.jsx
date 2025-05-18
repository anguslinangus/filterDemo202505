import React from "react";

import { Badge } from "react-bootstrap";

import "./ProductTableRow.css"

function ProductTableRow({item}){
    if(!item){
        return(
            <tr>
                <td className="col-12"無商品資料></td>
            </tr>
        )
    }

    return(
        <tr>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td className="text-success table-price-cell">{item.price.toFixed(2)}</td>
            <td>
                {item.inStock
                    ? <Badge className="bg-success">是</Badge>
                    : <Badge className="bg-danger">否</Badge>
                }
            </td>
        </tr>
    )
}

export default ProductTableRow;