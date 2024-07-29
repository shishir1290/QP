// components/Layout.js
import React from 'react';
import Header from './header';
import Navbar from './navbar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="layout-container">
    <Header />
    <Navbar />
    <main>{children}</main>
  </div>
);

export default Layout;
