import { useAuth } from '@/stores/auth';

const useAuthenticatedFetch = () => {
  const { token } = useAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return response.json();
  };

  return authenticatedFetch;
};

export default useAuthenticatedFetch;