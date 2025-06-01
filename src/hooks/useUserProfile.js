import { useState, useEffect } from 'react';

export function useUserProfile() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // to manage loading state

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true; // Flag to prevent state update on unmounted component

    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          if (isMounted && userData && userData.name) {
            setUserName(userData.name);
          } else if (isMounted) {
            console.warn('Name not found in userData from localStorage or component unmounted.');
          }
        } catch (error) {
          if (isMounted) {
            console.error('Failed to parse userData from localStorage:', error);
          }
        }
      } else if (isMounted) {
        console.warn('No userData found in localStorage.');
      }
    }
    if (isMounted) {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { userName, isLoading };
}
