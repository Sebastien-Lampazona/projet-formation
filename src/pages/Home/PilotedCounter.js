import React from 'react';
import PropType from 'prop-types';

function PilotedCounter({ value, increment }) {
  return (
    <div className="counter-container">
      <p>Le compteur piloté est de {value}</p>
      <button type="button" onClick={increment}>
        Incrémenter le compteur
      </button>
    </div>
  );
}

PilotedCounter.propTypes = {
  value: PropType.number,
  increment: PropType.func,
};

export default PilotedCounter;
