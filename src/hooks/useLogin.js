import { useState } from 'react';
import { useRouter } from 'next/router';

// Access the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Username and password are required.');
      setIsLoading(false);
      return;
    }

    if (!API_BASE_URL) {
      setError('API configuration error. Please contact support.');
      setIsLoading(false);
      return;
    }

    try {
      // Use the environment variable to construct the full API endpoint
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setSuccessMessage(data.message || 'Login successful!');
        console.log('Login successful:', data);
        console.log('Token:', data.result.token);

        localStorage.setItem('authToken', data.result.token);
        localStorage.setItem('userData', JSON.stringify(data.result.user));

        setTimeout(() => {
          router.push('/dashboard'); // Or your desired route
        }, 1500);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login API error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    successMessage,
    isLoading,
    handleSubmit,
  };
}
