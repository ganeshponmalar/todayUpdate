import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      console.log(data);
      setSignupSuccess(true);
      // Optionally, you can navigate here or handle the navigation in a useEffect
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    // If signup was successful, you might want to navigate here or show a success message
    // Use the navigate function outside the JSX return statement
    navigate('/signIn');
    return (
      <div>
        <p>Signup Successful! Redirecting to Sign In...</p>
      </div>
    );
  }

  // Rest of your JSX
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ... Your input fields ... */}
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signIn">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

