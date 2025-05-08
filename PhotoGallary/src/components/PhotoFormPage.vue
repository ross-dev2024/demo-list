<!-- 
 * @author ross.dev
  -->
<template>
  <div class="form-container">
    <div class="form-card">
      <h1 class="form-title">
        <i class="fas fa-camera-retro me-2"></i>
        {{ $route.params.id ? "写真を編集" : "写真を追加" }}
      </h1>
      <form @submit.prevent="submit" class="photo-form">
        <div class="form-group">
          <label for="name" class="form-label">
            <i class="fas fa-tag me-2"></i>タイトル
          </label>
          <input
            type="text"
            v-model="form.name"
            name="name"
            id="name"
            class="form-control"
            placeholder="写真のタイトルを入力"
          />
        </div>
        <div class="form-group">
          <label for="description" class="form-label">
            <i class="fas fa-align-left me-2"></i>説明
          </label>
          <textarea
            v-model="form.description"
            name="description"
            id="description"
            class="form-control"
            rows="3"
            placeholder="写真の説明を入力"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="dateTaken" class="form-label">
            <i class="fas fa-calendar-alt me-2"></i>撮影日時
          </label>
          <input
            type="datetime-local"
            name="dateTaken"
            id="dateTaken"
            v-model="form.dateTaken"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="photoFile" class="form-label">
            <i class="fas fa-image me-2"></i>写真
          </label>
          <div class="photo-upload-container">
            <input
              type="file"
              name="photoFile"
              id="photoFile"
              @change="onChange"
              class="form-control"
              accept="image/*"
            />
            <div v-if="form.photoFile" class="photo-preview-container">
              <img :src="form.photoFile.preview" class="photo-preview" />
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save me-2"></i>
            {{ $route.params.id ? "更新" : "保存" }}
          </button>
          <router-link to="/" class="btn btn-outline-secondary">
            <i class="fas fa-times me-2"></i>キャンセル
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import photosData from '../data/db.json';

export default {
  name: "PhotoForm",
  data() {
    return {
      form: {
        name: "",
        description: "",
        dateTaken: "",
        photoFile: undefined,
      },
    };
  },
  methods: {
    submit() {
      if (this.$route.params.id) {
        // 編集モード
        const index = photosData.photos.findIndex(p => p.id === this.$route.params.id);
        if (index !== -1) {
          photosData.photos[index] = {
            ...this.form,
            id: this.$route.params.id,
            photoFile: `/images/${this.form.photoFile.file.name}`
          };
        }
      } else {
        // 新規追加モード
        const newId = Math.max(...photosData.photos.map(p => parseInt(p.id))) + 1;
        photosData.photos.push({
          ...this.form,
          id: newId.toString(),
          photoFile: `/images/${this.form.photoFile.file.name}`
        });
      }
      this.$router.push('/');
    },
    onChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.photoFile = {
          file: file,
          preview: URL.createObjectURL(file)
        };
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      const photo = photosData.photos.find(p => p.id === this.$route.params.id);
      if (photo) {
        this.form = { ...photo };
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background: #ffffff;
}

.form-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
}

.photo-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 0.8rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #2196F3;
  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
}

.photo-upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.photo-preview-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.photo-preview {
  max-width: 300px;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #2196F3, #00BCD4);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.btn-outline-secondary {
  border: 2px solid #6c757d;
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-card {
    margin: 1rem;
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
