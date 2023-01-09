import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSuccess } from 'src/commons/MessagesProvider';
import './styles.scss';

function ExamplePage() {
  const showSuccess = useSuccess();
  return (
    <div className="example-page-container">
      <nav className="example-page-nav">
        <h1 className="title-example-page">Example Page</h1>
      </nav>

      <main>
        <h2>Hello Example Page</h2>
        <nav>
          <NavLink to="/">Go to Home Page</NavLink>
        </nav>
        <div style={{marginTop: 20}}>
          <button type="button" onClick={() => showSuccess('Success message')}>
            Show Success
          </button>
        </div>
      </main>
    </div>
  );
}
export default ExamplePage;
