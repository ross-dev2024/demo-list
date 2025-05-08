// This file is a bridge to main.ts
// It's needed because the default Vue CLI configuration looks for main.js
import './main.ts';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HomePage from './components/HomePage.vue'
import PhotoFormPage from './components/PhotoFormPage.vue'
import SearchPage from './components/SearchPage.vue'

// Prevent aria-hidden from being added to body
Object.defineProperty(document.body, 'ariaHidden', {
  get: function() { return null; },
  set: function() { return null; }
});

// Remove any existing aria-hidden attribute
document.body.removeAttribute('aria-hidden');

// Create a MutationObserver to prevent aria-hidden from being added
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && 
        mutation.attributeName === 'aria-hidden' && 
        document.body.hasAttribute('aria-hidden')) {
      document.body.removeAttribute('aria-hidden');
    }
  });
});

// Start observing the body element for attribute changes
observer.observe(document.body, { 
  attributes: true,
  attributeFilter: ['aria-hidden']
});

const app = createApp(App)

app.component('HomePage', HomePage)
app.component('PhotoFormPage', PhotoFormPage)
app.component('SearchPage', SearchPage)

app.use(router)
app.mount('#app')