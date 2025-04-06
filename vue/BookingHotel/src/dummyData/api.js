import { catalogItems } from './catalog';
import { bookings } from './bookings';

// カタログ関連のAPI
export const getCatalog = () => {
  return Promise.resolve({ data: catalogItems });
};

// 予約関連のAPI
export const getBookings = () => {
  return Promise.resolve({ data: bookings });
};

export const createBooking = (bookingData) => {
  const newBooking = {
    id: bookings.length + 1,
    ...bookingData,
    status: 'pending'
  };
  bookings.push(newBooking);
  return Promise.resolve({ data: newBooking });
};

export const updateBooking = (id, bookingData) => {
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Booking not found'));
  }
  bookings[index] = { ...bookings[index], ...bookingData };
  return Promise.resolve({ data: bookings[index] });
};

export const deleteBooking = (id) => {
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Booking not found'));
  }
  bookings.splice(index, 1);
  return Promise.resolve({ data: { id } });
}; 