import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


interface IProductAttributes {
    product_id: number;
    store_id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    stock_quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Styled components for basic UI
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f4f4f4;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const Products = () => {
  const [products, setProducts] = useState<IProductAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    // Fetch data from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Replace with your backend URL
        setProducts(response.data); // Assuming data is under `data.data`
        console.log(products);
        setLoading(false);
      } catch (error) {
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductTable>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Store ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Category ID</TableHeader>
              <TableHeader>Stock Quantity</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {products.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.store_id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category_id}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </ProductTable>
      )}
    </Container>
  );
};

export default Products;