import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign.css';

function SignInPage() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!isLoginMode && !formData.acceptTerms) {
      setErrors(["You must accept the terms of our policy to register."]);
      return;
    }

    setLoading(true);
    const endpoint = isLoginMode ? 'http://localhost:3001/login' : 'http://localhost:3001/signup';
    
    const payload = isLoginMode 
      ? { email: formData.email, password: formData.password }
      : {
          user: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          }
        };

    try {
      const response = await axios.post(endpoint, payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("storage_sync"));
      navigate('/');
    } catch (error) {
      if (error.response && (error.response.data.errors || error.response.data.error)) {
        const backendErrors = error.response.data.errors || [error.response.data.error];
        setErrors(backendErrors);
      } else {
        setErrors(["Connection error. Please ensure your Rails backend is running."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sign'>
      <div className='sign-card'>
        <div className='sing-header'>
          <div className='profile-logo'></div>
          <h2>{isLoginMode ? "Sign In" : "Create Account"}</h2>
        </div>

        {errors.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '20px',
            color: '#f87171',
            fontSize: '14px'
          }}>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className='sign-regster'>
          {!isLoginMode && (
            <>
              <div className='firstname'>
                <h3>First Name</h3>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Enter First Name'
                  required
                />
              </div>
              
              <div className='lastname'>
                <h3>Last Name</h3>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Enter Last Name'
                  required
                />
              </div>
            </>
          )}

          <div className='email'>
            <h3>Email</h3>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='example@gmail.com'
              required
            />
          </div>

          {!isLoginMode && (
            <div className='phone'>
              <h3>Phone Number</h3>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='07xxxxxxxx'
                required
              />
            </div>
          )}

          <div className='password'>
            <h3>Password</h3>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Password'
              required
            />
          </div>

          {!isLoginMode && (
            <div className='accept-check'>
              <input 
                type="checkbox" 
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="acceptTerms">Do You Accept The Terms Of Our Policy</label>
            </div>
          )}

          <div className='submit-btn'>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : (isLoginMode ? "Submit" : "Register")}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {isLoginMode ? "New to Vertex Solutions? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLoginMode(!isLoginMode); setErrors([]); }}
            style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}
          >
            {isLoginMode ? "Create an account" : "Sign in here"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;