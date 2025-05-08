import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getBookings, createBooking } from '@/dummyData/api';

export const useBookingStore = defineStore('booking', () => {
  const bookedItems = ref(new Set());
  const bookings = ref([]);

  async function fetchBookings() {
    const { data } = await getBookings();
    bookings.value = data;
    bookedItems.value = new Set(data.map(booking => booking.catalogItemId));
  }

  async function addBooking(bookingData) {
    const { data } = await createBooking(bookingData);
    bookings.value.push(data);
    bookedItems.value.add(data.catalogItemId);
    return data;
  }

  function isBooked(catalogItemId) {
    return bookedItems.value.has(catalogItemId);
  }

  return {
    bookedItems,
    bookings,
    fetchBookings,
    addBooking,
    isBooked
  };
}); 