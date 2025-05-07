<template>
  <img :src="imageSrc" :alt="alt" :class="className" />
</template>

<script>
export default {
  name: 'LocalImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageSrc: ''
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(newSrc) {
        this.loadImage(newSrc);
      }
    }
  },
  methods: {
    loadImage(src) {
      // Check if this is a local path that might have cached data
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const cachedImage = localStorage.getItem(`image_data_${src}`);
        if (cachedImage) {
          console.log(`Using cached data URL for ${src}`);
          this.imageSrc = cachedImage;
          return;
        }
      }
      
      // If no cached data or it's a remote URL, use the original src
      this.imageSrc = src;
    }
  }
};
</script>