<template>
  <!-- <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/add-photo-form">Add Photo</router-link>
      </li>
      <li>
        <router-link to="/search">Search Photos</router-link>
      </li>
    </ul>
  </nav> -->

  <div class="header-wrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <div class="d-flex align-items-center">
          <a class="navbar-brand" href="#">
            <div class="brand-title">
              <i class="fas fa-camera-retro"></i>
              <span>Photo Gallery</span>
            </div>
            <div class="brand-subtitle">あなたの思い出を美しく保存</div>
          </a>
        </div>


        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="fas fa-home me-1"></i>Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-photo-form">
                <i class="fas fa-plus me-1"></i>Add Photo
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/search">
                <i class="fas fa-search me-1"></i>Search Photos
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header-wrapper {
  background: linear-gradient(135deg, #2196F3, #00BCD4);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.navbar {
  background: transparent;
  padding: 0.8rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-subtitle {
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 0.2rem;
}

.navbar-brand:hover {
  color: #ffffff;
  transform: translateY(-2px);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.nav-link {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
  border-radius: 8px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover {
  color: #ffffff;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
  transition: all 0.3s ease;
  color: #ffffff;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.6rem 0;
  }
  
  .navbar-brand {
    font-size: 1.2rem;
  }
  
  .brand-subtitle {
    font-size: 0.7rem;
  }
  
  .nav-link {
    padding: 0.8rem 1rem !important;
  }
}
</style>
