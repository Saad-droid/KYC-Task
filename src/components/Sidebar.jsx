import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider style={{ position: 'fixed', width: '100%', height:"100%", backgroundColor:"lightgray"}}>
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item key="1">
        <Link to="/">Product Details</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/compare">Compare Products</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
