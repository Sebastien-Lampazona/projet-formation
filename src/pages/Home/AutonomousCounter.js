import React, { useState } from 'react';

function AutonomousCounter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="counter-container">
      <p>Le compteur autonome est de {counter}</p>
      <button type="button" onClick={() => setCounter(counter + 1)}>Incrémenter le compteur</button>
    </div>
  );
}

export default AutonomousCounter;
