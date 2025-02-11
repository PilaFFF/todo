import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import Sun from './assets/icons/Sun';
import Moon from './assets/icons/Moon';

function App() {
    const savedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(savedTheme || 'light');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.className =
            theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    return (
        <div className="App">
            <BrowserRouter>
                <div className="change-theme" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                        <Sun size={30} fill="#ffc83d" />
                    ) : (
                        <Moon size={30} />
                    )}
                </div>

                <AppRoutes />
            </BrowserRouter>
        </div>
    );
}

export default App;
