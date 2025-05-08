<template>
  <div class="catalog">
    <div class="catalog-container">
      <Header />
      <div class="cards-container">
        <Card v-for="c of catalogItems" :key="c.id">
          <template #header>
            <img :alt="c.description" :src="c.imageUrl" />
          </template>
          <template #title> {{ c.name }} </template>
          <template #content>
            {{ c.description }}
          </template>
          <template #footer>
            <Button
              :label="bookingStore.isBooked(c.id) ? 'Booked' : 'Book'"
              :class="[
                'p-button-primary',
                { 'p-button-secondary p-button-disabled': bookingStore.isBooked(c.id) }
              ]"
              :disabled="bookingStore.isBooked(c.id)"
              @click="showBookingForm(c.id)"
            />
          </template>
        </Card>
      </div>
    </div>

    <Dialog 
      header="Create Booking" 
      v-model:visible="showForm"
      :style="{ width: '90vw' }"
    >
      <BookingForm
        @booking-form-close="closeBookingForm"
        @booking-success="handleBookingSuccess"
        :selectedCatalogId="selectedCatalogId"
      />
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BookingForm from "@/components/BookingForm.vue";
import { getCatalog } from "@/dummyData/api";
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useBookingStore } from '@/stores/booking';
import Header from '@/components/Header.vue';

const catalogItems = ref([]);
const showForm = ref(false);
const selectedCatalogId = ref(undefined);
const bookingStore = useBookingStore();

const showBookingForm = (catalogItemId) => {
  selectedCatalogId.value = catalogItemId;
  showForm.value = true;
}; 

const closeBookingForm = () => {
  showForm.value = false;
  selectedCatalogId.value = undefined;
};

const handleBookingSuccess = () => {
  closeBookingForm();
};

const loadData = async () => {
  try {
    const catalogResponse = await getCatalog();
    catalogItems.value = catalogResponse.data;
    await bookingStore.fetchBookings();
  } catch (error) {
    console.error('Error loading catalog:', error);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.catalog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.catalog-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
}

:deep(.header) {
  max-width: 100%;
  margin: 0;
  border-radius: 6px;
  flex-shrink: 0;
}

:deep(.p-card) {
  margin-bottom: 1rem;
  width: 100%;
}

:deep(.p-card-header) {
  padding: 0;
}

:deep(.p-card-header img) {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
  height: calc(100vh - 100px);
}

.cards-container::-webkit-scrollbar {
  width: 6px;
}

.cards-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.cards-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.cards-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
