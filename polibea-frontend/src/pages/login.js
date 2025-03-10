// src/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan Bootstrap diimpor
import styled from 'styled-components';

// Styled Components
const Background = styled.div`
  background-image: url('/assets/img/hero-bg-light.webp'); 
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Logo = styled.img`
  width: 200px; 
  height: 100px;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/admin'); // Redirect to admin page after successful login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Your App</title>
        <link href="/assets/img/favicon.png" rel="icon" />
      </Head>
      <Background className="d-flex align-items-center justify-content-center">
        <div className="card shadow" style={{ width: '4 00px' }}>
          <div className="card-body">
            <div className="text-center mb-4">
            <h2 className="mt-3">Login</h2>
              <Logo src="/assets/img/logo.png" alt="Logo" />
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </Background>
    </>
  );
};

export default LoginPage;