import { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  const itemsPerPage = 12; // Number of items per page

  // Sort items based on orderStatus
  const sortedItems = useMemo(() => {
    const itemsSort = [...filteredItems];
    return itemsSort.sort((a, b) =>
      orderStatus === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredItems, orderStatus]);

  // Calculate paginated items and total pages
  const { paginatedItems, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = sortedItems.slice(startIndex, endIndex);
    const total = Math.ceil(sortedItems.length / itemsPerPage);
    return { paginatedItems: paginated, totalPages: total };
  }, [sortedItems, currentPage, itemsPerPage]);

  // Fetch items from JSON
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems]);

  // Handle page navigation
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
    <Container fluid>
      <h1>商品篩選系統</h1>
      <Row className="g-3">
        <Col md={4}>
          <section className="filter-column-list h-100">
            <h5 className="text-nowrap">篩選器區域</h5>
            <ProductFilters
              originItems={originItems}
              setFilteredItems={setFilteredItems}
            />
          </section>
        </Col>
        <Col md={8}>
          <section className="item-list-column h-100">
            <h5>商品區域列表</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div className="flex input-group mb-2 w-50">
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
              <div
                className="btn-group"
                role="group"
                aria-label="Pagination controls"
              >
                {`${currentPage}/${totalPages}`}
                <button
                  type="button"
                  className="btn btn-primary btn-sm ms-3"
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

            <ProductList
              items={paginatedItems} // Use paginated items
              isLoading={isLoading}
              error={error}
            />
          </section>
        </Col>
      </Row>

      <footer className="mt-4">
        <p>© {new Date().getFullYear()} 面試有限公司</p>
      </footer>
    </Container>
  );
}
