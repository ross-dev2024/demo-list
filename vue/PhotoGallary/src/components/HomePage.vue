<template>
  <div>
    <header class="header-section mb-3">
     
    </header>

    <div class="container">
      <div class="row g-4">
        <div v-for="p of photos" :key="p.id" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm hover-shadow">
            <img :src="p.photoFile" class="card-img-top photo-image" :alt="p.name">
            <div class="card-body">
              <h5 class="card-title">{{p.name}}</h5>
              <p class="card-text text-muted">{{p.description}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button class="btn btn-outline-primary" @click="edit(p.id)">
                    <i class="fas fa-edit me-1"></i>Edit
                  </button>
                  <button class="btn btn-outline-danger" @click="deletePhoto(p.id)">
                    <i class="fas fa-trash me-1"></i>Delete
                  </button>
                </div>
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-light:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.photo-image {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
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

.card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
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
