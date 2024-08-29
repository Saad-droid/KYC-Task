import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CompareProductsPage from './pages/CompareDetails';
import ProductDetailsPage from './pages/ProductDetails';


const { Content } = Layout;

const App = () => {
  const [comparedProducts, setComparedProducts] = useState([]);
  

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Layout style={{ marginTop: 64 }}> {/* Adjust marginTop for Navbar height */}
          <Sidebar />
          <Layout style={{ marginLeft: 200, padding: '24px' }}>
            <Content>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProductDetailsPage
                      comparedProducts={comparedProducts}
                      setComparedProducts={setComparedProducts}
                    />
                  }
                />
                <Route
                  path="/compare"
                  element={
                    <CompareProductsPage
                      comparedProducts={comparedProducts}
                      setComparedProducts={setComparedProducts}
                    />
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
