import { useViewport } from "../hooks/useViewport";
import ProductCard from "./ProductCard";
import ProductTableRow from "./ProductTableRow";

import "./ProductList.css";

function ProductList({ items, isLoading, error }) {
  const { isMobile: isMobileView } = useViewport();

  if (isLoading) {
    return <p className="text-center">正在載入商品資料...</p>;
  }
  if (error) {
    return <p className="text-center text-danger">載入資料發生錯誤： {error}</p>;
  }
  if (!items || items.length === 0) {
    return <p className="text-center">沒有找到商品資料</p>;
  }

  const itemsToDisplay = items; // 使用已分頁的 items

  if (isMobileView) {
    return (
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 g-3"> 
          {itemsToDisplay.map((item) => (
            <div className="col" key={item.id}> 
              <ProductCard item={item}></ProductCard>
            </div>
          ))}
        </div>
      </div>
    );
  } else { // 桌面版
    return (
      <main className="w-100 table-responsive">
        <table 
          id="productTable"
          className="table table-striped table-hover text-start table-sm " 
        >
          <thead className="table-primary text-nowrap">
            <tr>
              <th className="p-2">商品名稱</th>
              <th className="py-2">類別</th>
              <th className="py-2">價格</th>
              <th className="py-2">庫存量</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map(function (item) {
              return <ProductTableRow key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      </main>
    );
  }
}

export default ProductList;
