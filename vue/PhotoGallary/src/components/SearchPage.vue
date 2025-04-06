<template>
  <div class="search-container">
    <div class="search-card">
      <h1 class="search-title">
        <i class="fas fa-search me-2"></i>写真を検索
      </h1>
      <form @submit.prevent="submit" class="search-form">
        <div class="search-input-group">
          <input
            type="text"
            v-model="keyword"
            name="keyword"
            id="keyword"
            class="form-control"
            placeholder="キーワードを入力して検索"
          />
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-search me-2"></i>検索
          </button>
        </div>
      </form>

      <div v-if="photos.length > 0" class="search-results">
        <div class="row g-4">
          <div v-for="p in photos" :key="p.id" class="col-md-6 col-lg-4">
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
                <h5 class="card-title">{{ p.name }}</h5>
                <p class="card-text text-muted">{{ p.description }}</p>
                <div class="photo-date">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ new Date(p.dateTaken).toLocaleString('ja-JP') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="keyword" class="no-results">
        <i class="fas fa-search fa-3x mb-3"></i>
        <p>「{{ keyword }}」に一致する写真が見つかりませんでした。</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";

export default {
  name: "SearchPage",
  data() {
    return {
      keyword: "",
      photos: [],
    };
  },
  methods: {
    async search() {
      const { data } = await axios.get(
        `${APIURL}/photos?name_like=${this.$route.query.q}`
      );
      this.photos = data;
    },
    submit() {
      this.$router.push({ path: "/search", query: { q: this.keyword } });
    },
    edit(id) {
      this.$router.push({ path: `/edit-photo-form/${id}` });
    },
    async deletePhoto(id) {
      if (confirm('この写真を削除してもよろしいですか？')) {
        await axios.delete(`${APIURL}/photos/${id}`);
        this.search();
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.keyword = this.$route.query.q;
        this.search();
      },
    },
  },
};
</script>

<style scoped>
.search-container {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background: #ffffff;
}

.search-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.search-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
}

.search-form {
  margin-bottom: 2rem;
}

.search-input-group {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0;
}

.form-control {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 0.8rem;
  transition: all 0.3s ease;
  flex: 1;
  background-color: #ffffff;
}

.form-control:focus {
  border-color: #2196F3;
  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #2196F3, #00BCD4);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
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

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .search-card {
    margin: 1rem;
    padding: 1.5rem;
  }

  .search-title {
    font-size: 1.5rem;
  }

  .search-input-group {
    flex-direction: column;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
