import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

function Home() {
  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="title-home">Home Page</h1>
      </nav>

      <main>
        <h2>Hello Home</h2>
        <NavLink to="/example">Go to Example Page</NavLink>
      </main>
    </div>
  );
}
export default Home;
