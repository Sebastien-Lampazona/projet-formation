import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AutonomousCounter from './AutonomousCounter';
import PilotedCounter from './PilotedCounter';
import './styles.scss';

function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="title-home">Home Page</h1>
      </nav>

      <main>
        <h2>Hello Home</h2>
        <NavLink to="/example">Go to Example Page</NavLink>
      </main>

      <PilotedCounter
        value={counter}
        increment={() => setCounter(counter + 1)}
      />
      <AutonomousCounter />
    </div>
  );
}
export default Home;
