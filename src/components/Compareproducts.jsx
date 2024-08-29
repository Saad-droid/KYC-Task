import React from 'react';
import { Button } from 'antd';

const CompareProducts = ({ products, onRemove }) => {
  const comparisonKeys = ['title', 'brand', 'category', 'price', 'discountPercentage'];

  return (
    <div>
      <h2>Compare Products</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}>
        {products.map((product) => (
          <div key={product.id} style={{ margin: '0 10px', textAlign: 'center' }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: 100 }} />
            <h3>{product.title}</h3>
            {comparisonKeys.map((key) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {product[key]}
              </p>
            ))}
            <Button onClick={() => onRemove(product)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareProducts;
