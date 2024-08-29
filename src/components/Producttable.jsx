import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ onCompare, comparedProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      const updatedProducts = response.data.products.map((product) => ({
        ...product,
        isCompared: comparedProducts.some((compared) => compared.id === product.id),
      }));
      setProducts(updatedProducts);
      setLoading(false);
    });
  }, [comparedProducts]);

  const handleCompareClick = (record) => {
    if (comparedProducts.length >= 4) {
      notification.error({ message: 'You can only compare up to 4 products' });
      return;
    }
    onCompare(record);

    if (comparedProducts.length + 1 >= 2) {
      navigate('/compare');
    } 
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title),},
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price, },
    { title: 'Discount', dataIndex: 'discountPercentage', key: 'discountPercentage' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'image',
      render: (image) => <img src={image} alt="Product" style={{ width: 50 }} />,
    },
    {
      title: 'Compare',
      key: 'compare',
      render: (_, record) => (
        <Button onClick={() => handleCompareClick(record)} disabled={record.isCompared}>
          Compare
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowKey="id"
    />
  );
};

export default ProductTable;
