import React from 'react';
import ProductTable from '../components/Producttable';
import { notification } from 'antd';

const ProductDetailsPage = ({ comparedProducts, setComparedProducts }) => {
  const handleCompare = (product) => {
    if (comparedProducts.length < 4) {
      setComparedProducts([...comparedProducts, product]);
      notification.success({ message: 'Product added for comparison' });
    } else {
      notification.error({ message: 'You can only compare up to 4 products' });
    }
  };

  return (
    <div>
      <ProductTable onCompare={handleCompare} comparedProducts={comparedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
