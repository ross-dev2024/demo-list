<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const toggleLanguage = () => {
  const newLocale = locale.value === 'ja' ? 'en' : 'ja'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}
</script>

<template>
  <v-btn @click="toggleLanguage" color="primary">
    {{ locale === 'ja' ? t('common.english') : t('common.japanese') }}
  </v-btn>
</template>