import React from 'react';
import { Table, Button, notification } from 'antd';
import AddProductModal from '../components/AddProductModal';

const CompareProductsPage = ({ comparedProducts, setComparedProducts }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddMore = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddProducts = (newProducts) => {
    const uniqueProducts = newProducts.filter(
      (product) => !comparedProducts.some((p) => p.id === product.id)
    );
    if (uniqueProducts.length > 4 - comparedProducts.length) {
      notification.error({
        message: 'You can only compare up to 4 products in total.',
      });
      return;
    }
    setComparedProducts([...comparedProducts, ...uniqueProducts]);
    notification.success({ message: 'Products added for comparison' });
  };

  const handleRemoveProduct = (productId) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== productId));
    notification.success({ message: 'Product removed from comparison' });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'image',
      render: (image) => <img src={image} alt="Product" style={{ width: 50 }} />,
    },
    {
      title: 'Remove',
      key: 'remove',
      render: (_, record) => (
        <Button onClick={() => handleRemoveProduct(record.id)}>Remove</Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddMore}
        disabled={comparedProducts.length >= 4}
      >
        Add More
      </Button>
      <Table
        dataSource={comparedProducts}
        columns={columns}
        rowKey="id"
      />
      <AddProductModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onAdd={handleAddProducts}
        comparedProducts={comparedProducts}
      />
    </div>
  );
};

export default CompareProductsPage;
