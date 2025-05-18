import { useState, useEffect, useMemo } from "react";
import { useViewport } from "../hooks/useViewport";
import ProductCard from "./ProductCard";
import ProductTableRow from "./ProductTableRow";

import "./ProductList.css";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProductList({ items, isLoading, error }) {
  // 預設為降冪（高到低）

  const { isMobile: isMobileView } = useViewport();

  if (isLoading) {
    return <p className="text-center">正在載入商品資料...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-danger">載入資料發生錯誤： {error}</p>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-center">沒有找到商品資料</p>;
  }

  const itemsToDisplay = items.slice(0, 15);

  if (isMobileView) {
    return (
      <Container fluid>
        <Row xs={1} sm={2} className="g-3">
          {itemsToDisplay.map((item) => (
            <Col key={item.id}>
              <ProductCard item={item}></ProductCard>
            </Col>
          ))}
        </Row>
        {items.length > itemsToDisplay.length && (
          <p className="text-center mt-3">...還有更多商品</p>
        )}
      </Container>
    );
  } else {
    return (
      <main className="w-100">
        <table
          id="productTable"
          className="table table-striped table-hover text-start"
        >
          <thead className="table-primary text-nowrap">
            <tr>
              <th>商品名稱</th>
              <th>類別</th>
              <th>價格</th>
              <th>庫存量</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map(function (item) {
              return <ProductTableRow key={item.id} item={item} />;
            })}
          </tbody>
        </table>
        {items.length > itemsToDisplay.length && (
          <p className="text-center mt-3">...還有更多商品</p>
        )}
      </main>
    );
  }
}

export default ProductList;
