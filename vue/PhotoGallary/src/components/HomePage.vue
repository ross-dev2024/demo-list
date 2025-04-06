<template>
  <div>
    <header class="header-section mb-3">
     
    </header>

    <div class="container">
      <div class="row g-4">
        <div v-for="p of photos" :key="p.id" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm hover-shadow">
            <div class="photo-image-wrapper">
              <img :src="p.photoFile" class="card-img-top photo-image" :alt="p.name">
              <div class="photo-actions">
                <button class="btn btn-light btn-sm" @click="edit(p.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-light btn-sm" @click="deletePhoto(p.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{p.name}}</h5>
              <p class="card-text text-muted">{{p.description}}</p>
              <div class="photo-date">
                <i class="fas fa-calendar-alt me-1"></i>
                {{ new Date(p.dateTaken).toLocaleString('ja-JP') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";

export default {
  data() {
    return {
      photos: [],
    };
  },
  methods: {
    async load() {
      const { data } = await axios.get(`${APIURL}/photos`);
      this.photos = data;
    },
    edit(id) {
      this.$router.push({ path: `/edit-photo-form/${id}` });
    },
    async deletePhoto(id) {
      await axios.delete(`${APIURL}/photos/${id}`);
      this.photos = [];
      this.load();
    },
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #2196F3, #00BCD4);
  padding: 0rem 0;
  position: relative;
  overflow: hidden;
  margin: 0.5rem;
}

.navbar {
  padding: 0.5rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
}

.header-subtitle {
  padding: 0.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.header-subtitle p {
  font-size: 1rem;
  margin: 0;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.btn-light {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #2c3e50;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-light:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-light i {
  font-size: 0.9rem;
}

.photo-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .photo-overlay {
  opacity: 1;
}

.photo-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .photo-actions {
  opacity: 1;
}

.btn-outline-primary,
.btn-outline-danger {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover,
.btn-outline-danger:hover {
  transform: translateY(-2px);
}

.btn-outline-primary {
  color: #2196F3;
  border-color: #2196F3;
}

.btn-outline-primary:hover {
  background-color: #2196F3;
  color: white;
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.photo-date {
  font-size: 0.8rem;
  color: #adb5bd;
  margin-top: 0.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: all 0.3s ease;
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.card:hover .photo-image {
  transform: scale(1.05);
}

.btn-group {
  gap: 0.5rem;
}

.btn {
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

@media (max-width: 768px) {
  .header-subtitle {
    display: none;
  }
  
  .navbar-brand {
    font-size: 1.2rem;
  }
  
  .btn-light {
    margin-top: 0.5rem;
  }
}
</style>
