import { useState, useEffect } from "react";

export default function ProductFilters({ originItems, setFilteredItems }) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectCategories: [],
    minPrice: "",
    maxPrice: "",
    stockStatus: "", // "", "in", "out"
  });

  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    if (originItems.length === 0) return;

    const categorySet = new Set(
      originItems.map((item) => item.category || "未分類")
    );

    const sortedCategories = Array.from(categorySet).sort();

    const categoryObjects = sortedCategories.map((category) => ({
      value: category,
      checked: true,
    }));

    setUniqueCategories(categoryObjects);
  }, [originItems]);

  const applyFilters = () => {
    let result = [...originItems];

    const { searchTerm, selectCategories, minPrice, maxPrice, stockStatus } =
      filters;

    if (searchTerm.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectCategories.length > 0) {
      result = result.filter((item) =>
        selectCategories.includes(item.category || "未分類")
      );
    }

    if (minPrice !== "") {
      result = result.filter((item) => item.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((item) => item.price <= Number(maxPrice));
    }

    if (stockStatus === "in") {
      result = result.filter((item) => item.inStock);
    } else if (stockStatus === "out") {
      result = result.filter((item) => !item.inStock);
    }

    setFilteredItems(result);
  };

  const resetFilters = () => {
    const resetCats = uniqueCategories.map((c) => ({
      ...c,
      checked: true,
    }));
    setUniqueCategories(resetCats);

    setFilters({
      searchTerm: "",
      selectCategories: resetCats.map((c) => c.value),
      minPrice: "",
      maxPrice: "",
      stockStatus: "",
    });

    // 重設回全部
    setFilteredItems(originItems);
  };

  return (
    <section>
      <div className="d-flex align-items-center">
        <label htmlFor="searchinput" className="form-label m-0">
          搜尋：
        </label>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            id="searchinput"
            value={filters.searchTerm}
            placeholder="請輸入商品名稱"
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
          />
        </div>
      </div>

      <div className="input-group mt-3">
        類別：
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {uniqueCategories.map((categoryObj, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`category-${index}`}
                value={categoryObj.value}
                checked={categoryObj.checked}
                onChange={() => {
                  const updated = [...uniqueCategories];
                  updated[index].checked = !updated[index].checked;
                  setUniqueCategories(updated);

                  const selected = updated
                    .filter((item) => item.checked)
                    .map((item) => item.value);
                  setFilters({ ...filters, selectCategories: selected });
                }}
              />
              <label className="form-check-label" htmlFor={`category-${index}`}>
                {categoryObj.value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="text-start mt-3">
        <label className="form-label">價格：</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="最低價"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <span className="input-group-text">~</span>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="最高價"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>
      </div>
      <div className="d-flex align-items-center mt-3">
        <label className="form-label m-0">庫存量：</label>
        <div className="d-flex align-items-center gap-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="stockIn"
              checked={filters.stockStatus === "in"}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  stockStatus: prev.stockStatus === "in" ? "" : "in",
                }))
              }
            />
            <label className="form-check-label" htmlFor="stockIn">
              有庫存
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="stockOut"
              checked={filters.stockStatus === "out"}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  stockStatus: prev.stockStatus === "out" ? "" : "out",
                }))
              }
            />
            <label className="form-check-label" htmlFor="stockOut">
              無庫存
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
        <button
          className="btn btn-primary btn-sm text-nowrap"
          onClick={applyFilters}
        >
          套用
        </button>
        <button
          className="btn btn-outline-primary btn-sm text-nowrap"
          onClick={resetFilters}
        >
          重設
        </button>
      </div>
    </section>
  );
}
