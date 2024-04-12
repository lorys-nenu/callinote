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
      throw new Error(`Fetch request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return authenticatedFetch;
};

export default useAuthenticatedFetch;