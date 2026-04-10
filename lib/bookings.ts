export interface Booking {
  id: string;
  resource: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  duration: string;
  userId: string;
}

const STORAGE_KEY = 'nexora_bookings';

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  
  // Default mock data if empty
  const defaultBookings: Booking[] = [
    { id: '1', resource: 'Advanced AI Lab', date: 'Today, 10:00 AM', time: '10:00 AM - 12:00 PM', status: 'completed', duration: '2h', userId: 'Student' },
    { id: '2', resource: 'Gym - Cardio Zone', date: 'Yesterday, 05:30 PM', time: '05:30 PM - 07:00 PM', status: 'completed', duration: '1.5h', userId: 'Student' },
    { id: '3', resource: 'Library Study Pod', date: 'Oct 12, 02:00 PM', time: '02:00 PM - 03:00 PM', status: 'cancelled', duration: '-', userId: 'Student' },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBookings));
  return defaultBookings;
}

export function addBooking(booking: Omit<Booking, 'id'>): Booking {
  const bookings = getBookings();
  const newBooking = { ...booking, id: Math.random().toString(36).substr(2, 9) };
  bookings.unshift(newBooking); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking['status']): void {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}
