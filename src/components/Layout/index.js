import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from 'src/commons/ThemeProvider';
import './styles.scss';

function Layout() {
  const themeContext = useContext(ThemeContext);
  return (
    <main className={`container theme theme-${themeContext.theme}`}>
       <div className="toggle-switch">
            <label>
                <input type="checkbox" onChange={themeContext.toggleTheme} />
                <span className="slider"></span>
            </label>
        </div>
      <Outlet />
    </main>
  );
}
export default Layout;
