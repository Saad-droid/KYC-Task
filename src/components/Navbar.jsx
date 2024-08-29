import React from 'react';
import { Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => (
  
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor:"lightgray"}}>
    <div className="logo" />
  
    <div style={{ float: 'right' }}>
      <Avatar size="large" icon={<UserOutlined />} />
    </div>
  </Header>
);

export default Navbar;
