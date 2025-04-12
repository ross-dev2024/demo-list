import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

const messages = {
  en,
  ja
}

// ローカルストレージから言語設定を取得
const savedLocale = localStorage.getItem('locale')
// ブラウザの言語設定を取得
const browserLocale = navigator.language.split('-')[0]
// 優先順位: 保存された設定 > ブラウザ設定 > デフォルト(日本語)
const defaultLocale = savedLocale || (messages[browserLocale as keyof typeof messages] ? browserLocale : 'ja')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
}) 