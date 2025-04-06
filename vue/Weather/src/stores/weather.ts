import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface WeatherForecast {
  place: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    date: number;
    temp_max: number;
    temp_min: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    pop: number;
  }[];
}

export const useWeatherStore = defineStore('weather', () => {
  const forecasts = ref<WeatherForecast[]>([])
  const isLoading = ref(false)
  const error = ref('')

  const addForecast = (forecast: WeatherForecast) => {
    // 同じ地名の天気予報が既に存在するかチェック
    const exists = forecasts.value.some(f => f.place.name === forecast.place.name)
    if (exists) {
      throw new Error(`${forecast.place.name}の天気予報は既に表示されています。`)
    }
    forecasts.value.push(forecast)
  }

  const removeForecast = (placeName: string) => {
    forecasts.value = forecasts.value.filter(f => f.place.name !== placeName)
  }

  const clearAllForecasts = () => {
    forecasts.value = []
  }

  return {
    forecasts,
    isLoading,
    error,
    addForecast,
    removeForecast,
    clearAllForecasts
  }
}) 