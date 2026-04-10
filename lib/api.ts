export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Utility function to fetch data from the Spring Boot backend.
 * Example usage:
 * 
 * import { fetchFromAPI } from '@/lib/api';
 * 
 * const data = await fetchFromAPI('/users');
 */
export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add authorization headers here if needed
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
