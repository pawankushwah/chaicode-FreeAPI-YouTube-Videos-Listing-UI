import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'ADMIN' // Default role as per API requirement
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin 
      ? 'https://api.freeapi.app/api/v1/users/login' 
      : 'https://api.freeapi.app/api/v1/users/register';

    const body = isLogin 
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await response.json();

      if (json.success) {
        if (isLogin) {
          login(json.data.user, json.data.accessToken);
          onClose();
        } else {
          // After register, switch to login
          setIsLogin(true);
          setError('Registration successful! Please login.');
        }
      } else {
        setError(json.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-bg border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-text-secondary text-sm">
            to continue to ChaiTube
          </p>
        </div>

        {error && (
          <div className={`p-3 rounded-lg text-sm mb-6 ${error.includes('successful') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-border rounded-xl outline-none focus:border-brand text-white transition-colors"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full px-4 py-3 bg-[#121212] border border-border rounded-xl outline-none focus:border-brand text-white transition-colors"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-[#121212] border border-border rounded-xl outline-none focus:border-brand text-white transition-colors"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand text-white rounded-full font-bold hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          {isLogin ? (
            <p>
              New to ChaiTube?{' '}
              <button onClick={() => setIsLogin(false)} className="text-accent font-medium hover:underline">
                Create account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-accent font-medium hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
