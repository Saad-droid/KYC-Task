import React, { useState, useEffect } from 'react';
import { Modal, Table, Checkbox, Button, notification } from 'antd';
import axios from 'axios';

const AddProductModal = ({ visible, onClose, onAdd, comparedProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      setProducts(response.data.products);
    });
  }, []);

  const handleProductSelect = (product, checked) => {
    if (checked) {
      if (selectedProducts.length + comparedProducts.length >= 4) {
        notification.error({
          message: 'You can only compare up to 4 products.',
        });
        return;
      }

      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    }
  };


  const handleAddClick = () => {
    onAdd(selectedProducts);
    setSelectedProducts([]);
    onClose();
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedProducts.some((p) => p.id === record.id)}
          onChange={(e) => handleProductSelect(record, e.target.checked)}
          disabled={
            comparedProducts.some((p) => p.id === record.id) || // Disable if product is already in comparison
            (selectedProducts.length + comparedProducts.length >= 4 && !selectedProducts.some((p) => p.id === record.id)) // Disable if max limit reached
          }
        />
      ),
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
  ];

  return (
    <Modal
      title="Add More Products for Comparison"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddClick} disabled={selectedProducts.length === 0}>
          Add
        </Button>,
      ]}
    >
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ y: 240 }}
      />
    </Modal>
  );
};

export default AddProductModal;
