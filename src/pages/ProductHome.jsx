import { useState, useEffect, useMemo } from "react";

import "./ProductHome.css";
import ProductList from "../components/ProductList";
import ProductFilters from "../components/ProductFilters";

export default function ProductHome() {
  const [originItems, setOriginItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  const sortedItems = useMemo(() => {
    const itemsSort = [...filteredItems];
    return itemsSort.sort((a, b) =>
      orderStatus === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredItems, orderStatus]);

  const { paginatedItems, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = sortedItems.slice(startIndex, endIndex);
    const total = Math.ceil(sortedItems.length / itemsPerPage);
    return { paginatedItems: paginated, totalPages: total };
  }, [sortedItems, currentPage, itemsPerPage]);

  const fetchItems = async () => {
    try {
      const response = await fetch("/items.json");
      if (!response.ok) {
        throw new Error(`錯誤狀態： ${response.status}`);
      }
      let data = await response.json();
      const dataWithIds = data.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      }));
      setOriginItems(dataWithIds);
      setFilteredItems(dataWithIds);
    } catch (error) {
      console.error("讀取商品失敗", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container-fluid py-3"> 
      <h1 className="text-center my-3 product-home-title">商品篩選系統</h1>
      <div className="row g-3"> 
        <div className="col-lg-3 col-md-4">
          <section className="filter-column-list h-100 p-3 bg-light border rounded">
            <h5 className="text-nowrap mb-3 product-home-subtitle">篩選器區域</h5> 
            <ProductFilters
              originItems={originItems}
              setFilteredItems={setFilteredItems}
            />
          </section>
        </div>
        <div className="col-lg-9 col-md-8">
          <section className="item-list-column h-100 p-3 bg-light border rounded">
            <h5 className="mb-3 product-home-subtitle">商品區域列表</h5>
            <div className="d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between mb-3 gap-2">
              <div className="input-group input-group-sm w-auto mb-2 mb-sm-0 flex-shrink-1 me-sm-auto">
                <label className="input-group-text" htmlFor="price_status">
                  資料順序
                </label>
                <select
                  className="form-select form-select-sm"
                  id="price_status"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="desc">價格由高到低</option>
                  <option value="asc">價格由低到高</option>
                </select>
              </div>
              <div className="d-flex align-items-center flex-shrink-0">
                <span className="me-2 text-nowrap px-2 py-1 bg-light border rounded-pill text-muted small">{`${currentPage}/${totalPages > 0 ? totalPages : 1}`}</span>
                <div
                  className="btn-group btn-group-sm"
                  role="group"
                  aria-label="Pagination controls"
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    上一頁
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    下一頁
                  </button>
                </div>
              </div>
            </div>

            <ProductList
              items={paginatedItems}
              isLoading={isLoading}
              error={error}
            />
          </section>
        </div>
      </div>

      <footer className="mt-4 text-center text-muted small">
        <p>© {new Date().getFullYear()} 面試有限公司</p>
      </footer>
    </div>
  );
}
