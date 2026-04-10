export interface Query {
  id: string;
  user: string;
  text: string;
  status: 'pending' | 'resolved';
  time: string;
}

const STORAGE_KEY = 'nexora_queries';

export function getQueries(): Query[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  
  const defaultQueries: Query[] = [
    { id: '1', user: 'Alex Carter', text: 'ID Card Replacement', status: 'pending', time: '2 hours ago' },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQueries));
  return defaultQueries;
}

export function addQuery(query: Omit<Query, 'id' | 'status' | 'time'>): Query {
  const queries = getQueries();
  const newQuery: Query = { 
    ...query, 
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
    time: 'Just now'
  };
  queries.unshift(newQuery);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  return newQuery;
}

export function resolveQuery(id: string): void {
  const queries = getQueries();
  const index = queries.findIndex(q => q.id === id);
  if (index !== -1) {
    queries[index].status = 'resolved';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  }
}

export function markQueryPending(id: string): void {
  const queries = getQueries();
  const index = queries.findIndex(q => q.id === id);
  if (index !== -1) {
    queries[index].status = 'pending';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  }
}
