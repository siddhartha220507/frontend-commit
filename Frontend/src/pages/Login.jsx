import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
  import { login, reset } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthBlobCharacters, { SparklesLogo } from "../components/AuthBlobCharacters";

function Login() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
     const { username, email, password } = formData;
    
    const dispatch = useDispatch();
  const navigate = useNavigate();
    
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
           navigate('/');
        }
        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

   const onChange = (e) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username: email, email: email, password }));
    };

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#e5e7eb' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
               <AuthBlobCharacters isPasswordFocused={isPasswordFocused} />
            </div>

            <div style={{ flex: 1, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)' }}>
                <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', marginBottom: '0.5rem', textAlign: 'center', fontFamily: "'Helvetica Neue', sans-serif" }}>Welcome back!</h2>
                   <p style={{ color: '#666', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Please enter your details</p>
                    
                    {isError && <p style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>{message}</p>}
                    
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                           <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Email or Username</label>
                            <input 
                                type="text" name="email" value={email} onChange={onChange} 
                               placeholder="Enter your email" required
                                style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #ddd', background: 'transparent', color: '#111', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} 
                                onFocus={(e) => e.target.style.borderBottomColor = '#111'}
                                onBlur={(e) => e.target.style.borderBottomColor = '#ddd'}
                            />
                        </div>

                      <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>Password</label>
                            <input 
                                type="password" name="password" value={password} onChange={onChange} 
                                placeholder="••••••••" required 
                               onFocus={(e) => { setIsPasswordFocused(true); e.target.style.borderBottomColor = '#111'; }}
                                onBlur={(e) => { setIsPasswordFocused(false); e.target.style.borderBottomColor = '#ddd'; }}
                                style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #ddd', background: 'transparent', color: '#111', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} 
                            />
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                               <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember for 30 days
                            </label>
                            <span style={{ fontSize: '0.85rem', color: '#999', cursor: 'not-allowed' }}>Forgot password?</span>
                        </div>

                        <button type="submit" disabled={isLoading} style={{ padding: '14px', background: '#111', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', marginTop: '1rem', transition: 'all 0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                           onMouseOver={(e) => { e.target.style.background = '#333'; e.target.style.transform = 'translateY(-2px)' }}
                            onMouseOut={(e) => { e.target.style.background = '#111'; e.target.style.transform = 'translateY(0)' }}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    
                   <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#111', fontWeight: 'bold', textDecoration: 'none' }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
