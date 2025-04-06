<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="p-col-12">
      <Field name="name" v-slot="{ field, errorMessage, meta }">
        <div class="p-inputgroup">
          <InputText
            placeholder="Name"
            :class="{ 'p-invalid': meta.touched && errorMessage }"
            v-bind="field"
          />
        </div>
        <small class="p-error" v-if="meta.touched && errorMessage">{{ errorMessage }}</small>
      </Field>
    </div>

    <div class="p-col-12">
      <Field name="address" v-slot="{ field, errorMessage, meta }">
        <div class="p-inputgroup">
          <InputText
            placeholder="Address"
            :class="{ 'p-invalid': meta.touched && errorMessage }"
            v-bind="field"
          />
        </div>
        <small class="p-error" v-if="meta.touched && errorMessage">{{ errorMessage }}</small>
      </Field>
    </div>

    <div class="p-col-12">
      <label>Start Date</label>
      <Field name="startDate" v-slot="{ field, errorMessage, meta }">
        <div class="p-inputgroup">
          <Calendar
            inline
            placeholder="Start Date"
            :class="{ 'p-invalid': meta.touched && errorMessage }"
            :minDate="new Date()"
            v-bind="field"
            v-model="startDate"
          />
        </div>
        <small class="p-error" v-if="meta.touched && errorMessage">{{ errorMessage }}</small>
      </Field>
    </div>

    <div class="p-col-12">
      <label>End Date</label>
      <Field name="endDate" v-slot="{ field, errorMessage, meta }">
        <div class="p-inputgroup">
          <Calendar
            inline
            placeholder="End Date"
            :class="{ 'p-invalid': meta.touched && errorMessage }"
            v-bind="field"
            v-model="endDate"
            :minDate="new Date(+startDate + 24 * 3600 * 1000)"
          />
        </div>
        <small class="p-error" v-if="meta.touched && errorMessage">{{ errorMessage }}</small>
      </Field>
    </div>

    <div class="p-col-12">
      <Button label="Book" type="submit" />
    </div>
  </Form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { useBookingStore } from '@/stores/booking';

const props = defineProps({
  selectedCatalogId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['booking-success', 'booking-form-close']);

const startDate = ref(undefined);
const endDate = ref(undefined);

const bookingStore = useBookingStore();

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  startDate: yup.date().required("Start date is required").min(new Date(), "Start date must be in the future"),
  endDate: yup
    .date()
    .required("End date is required")
    .when(
      "startDate",
      (startDate, schema) => startDate && schema.min(startDate, "End date must be after start date")
    ),
});

const onSubmit = async (values) => {
  const { name, address, startDate, endDate } = values;
  await bookingStore.addBooking({
    name,
    address,
    startDate,
    endDate,
    catalogItemId: props.selectedCatalogId,
  });
  emit("booking-success");
  emit("booking-form-close");
};
</script>
