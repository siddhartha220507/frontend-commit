import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
  import { logout, reset } from "../redux/authSlice";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function Navbar() {
   const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
  const logoText = "MOVIESTRUNK".split("");

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
   };

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
           dispatch(logout());
            dispatch(reset());
            navigate("/");
            setIsLoggingOut(false);
        }, 1000);
    };

    return (
        <>
            {isLoggingOut && (
               <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader />
                </div>
            )}
        <nav className="navbar">

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--primary-color)', display: 'flex' }}>
                   <Link to="/" style={{ display: 'flex' }}>
                        {logoText.map((char, index) => {
                            const distance = Math.abs(index - 5);
                            const scaleY = 1 + (distance * 0.08);
                           return (
                                <span key={index} style={{ 
                                    display: 'inline-block', 
                                   transform: `scaleY(${scaleY})`, 
                                    transformOrigin: 'top' 
                                }}>
                                    {char}
                               </span>
                            );
                        })}
                    </Link>
                </h2>
            </div>

            <div className="navbar-links">
                
               <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                    <div className={`theme-icon-container ${theme}`}>
                        <div className="sun"></div>
                       <div className="moon"></div>
                    </div>
                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>

                <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
               <NavLink to="/movies" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Movies</NavLink>
                <NavLink to="/search" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Search</NavLink>
                
                {user && (
                    <>
                       <NavLink to="/favorites" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Favorites</NavLink>
                        <NavLink to="/history" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>History</NavLink>
                        {user.role === 'admin' && <NavLink to="/admin" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink>}
                    </>
                )}

                <NavLink to="/celebrity" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Celebrity Personality</NavLink>
                
                <div className="navbar-auth">
                    {user ? (
                       <>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hi, {user.username}</span>
                            <button onClick={onLogout} style={{ background: 'var(--primary-color)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                        </>
                    ) : (
                        <>
                           <NavLink to="/login" className="nav-link">Login</NavLink>
                            <NavLink to="/signup" className="nav-link">Signup</NavLink>
                        </>
                    )}
                </div>

            </div>

        </nav>
        </>
    )

}

export default Navbar;