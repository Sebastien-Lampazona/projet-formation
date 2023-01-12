import React, { useState } from 'react';

const ThemeContext = React.createContext(
    'primary' // valeur par défaut
);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('primary');

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme: () => setTheme(theme === 'primary' ? 'secondary' : 'primary')
        }}>
            {children}
        </ThemeContext.Provider>
    );
};
export default ThemeContext;