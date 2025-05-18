import React from "react";

import "./ProductTableRow.css"

function ProductTableRow({item}){
    if(!item){
        return(
            <tr>
                <td colSpan={4} className="text-center">無商品資料</td>
            </tr>
        )
    }

    return (
        <tr > 
            <td className="p-2">{item.name}</td>
            <td className="py-2">{item.category}</td>
            <td className="table-price-cell text-success py-2">${item.price && typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}</td>
            <td className="py-2">
                {item.inStock
                    ? <span className="badge text-bg-success">是</span> 
                    : <span className="badge text-bg-danger">否</span>  
                }
            </td>
        </tr>
    );
}

export default ProductTableRow;