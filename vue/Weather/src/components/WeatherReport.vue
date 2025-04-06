<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from 'vue'
import DailyWeather from './DailyWeather.vue';
import { ElMessage } from 'element-plus'
import { Search, Location } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// Nominatim APIのレスポンス型定義 (必要な部分のみ)
type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
}[];

// OpenWeatherMap APIのレスポンス型定義
type OpenWeatherMapForecastData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

// 日ごとの天気予報データを整形するための型
type DailyForecast = {
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
};

const dailyForecast = ref<DailyForecast[]>();
const currentPlace = ref<{ name: string, region: string, country: string } | null>(null);
const searchQuery = ref('');
const isLoading = ref(false);
const error = ref('');

const OWM_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Nominatim APIで地名から緯度経度を取得する関数
const getCoordinates = async (query: string): Promise<{ lat: string, lon: string, name: string }> => {
  console.log('Geocoding Query:', query);
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&accept-language=ja&limit=1&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error('地名の検索に失敗しました');
    }

    const results: any = await response.json();

    if (results.length === 0 || !results[0].lat || !results[0].lon) {
      throw new Error('指定された地名が見つかりませんでした。');
    }

    const { lat, lon, address } = results[0];
    const name = address?.city || address?.town || address?.village || address?.county || query;
    const region = address?.state || "";
    const country = address?.country || "";

    console.log('Coordinates:', `${lat},${lon}`, 'Name:', name);
    return { lat, lon, name: `${name}, ${region ? region + ', ' : ''}${country}` };

  } catch (error) {
    console.error('ジオコーディングエラー:', error);
    throw error instanceof Error ? error : new Error('地名の検索中にエラーが発生しました。');
  }
};

// OpenWeatherMap 5 Day Forecastで天気予報を取得
const fetchWeatherForecast = async (lat: string, lon: string): Promise<DailyForecast[]> => {
  console.log('Weather API Query:', `lat=${lat}, lon=${lon}`);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric&lang=ja`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('APIキーが無効です。設定を確認してください。');
      }
      throw new Error(`天気予報の取得に失敗しました (ステータス: ${response.status})`);
    }

    const data: OpenWeatherMapForecastData = await response.json();
    
    // 日付ごとにデータを整理
    const dailyData = new Map<string, DailyForecast>();
    
    data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, {
          date: forecast.dt,
          temp_max: forecast.main.temp_max,
          temp_min: forecast.main.temp_min,
          weather: forecast.weather[0],
          pop: forecast.pop
        });
      } else {
        const existing = dailyData.get(dateKey)!;
        existing.temp_max = Math.max(existing.temp_max, forecast.main.temp_max);
        existing.temp_min = Math.min(existing.temp_min, forecast.main.temp_min);
        existing.pop = Math.max(existing.pop, forecast.pop);
      }
    });

    return Array.from(dailyData.values());
  } catch (error) {
    console.error('天気予報の取得エラー:', error);
    throw error instanceof Error ? error : new Error('天気予報の取得中にエラーが発生しました。');
  }
};

const handleSearch = async () => {
  if (!searchQuery.value) {
    error.value = '検索する地名を入力してください';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  dailyForecast.value = undefined;
  currentPlace.value = null;
  
  try {
    const { lat, lon, name } = await getCoordinates(searchQuery.value);
    currentPlace.value = { name, region: "", country: "" };

    const forecastData = await fetchWeatherForecast(lat, lon);
    dailyForecast.value = forecastData;

  } catch (e) {
    error.value = e instanceof Error ? e.message : '検索中にエラーが発生しました';
    console.error('検索処理エラー:', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  searchQuery.value = "横浜";
  await handleSearch();
  searchQuery.value = "";
});
</script>

<template>
  <div class="weather-app">
    <!-- ヘッダー -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">天気予報</h1>
        <p class="header-subtitle">素敵な旅のために、目的地の天気をチェックしよう！</p>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="main-content">
      <!-- 検索フォーム -->
      <el-card class="search-card">
        <div class="search-container">
          <div class="search-form">
            <el-input
              v-model="searchQuery"
              placeholder="地名を入力（例：横浜、新宿、etc...）複数入力可"
              :prefix-icon="Search"
              @keyup.enter="handleSearch"
              class="search-input"
            />
            <el-button
              type="primary"
              :loading="isLoading"
              @click="handleSearch"
              class="search-button"
            >
              検索
            </el-button>
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>
      </el-card>

      <!-- ローディング表示 -->
      <el-card v-if="isLoading" class="loading-card">
        <div class="loading-container">
          <el-icon class="is-loading loading-icon"><Loading /></el-icon>
          <span>天気情報を取得中...</span>
        </div>
      </el-card>

      <!-- 天気予報の表示 -->
      <el-card v-if="dailyForecast && currentPlace && !isLoading" class="forecast-card">
        <div class="forecast-container">
          <h2 class="location-title">
            <el-icon><Location /></el-icon>
            {{ currentPlace.name }}の天気予報
          </h2>
          
          <div class="forecast-cards">
            <DailyWeather
              v-for="day in dailyForecast"
              :key="day.date"
              v-bind="day"
            />
          </div>
        </div>
      </el-card>
    </main>
  </div>
</template>

<style scoped>
.weather-app {
  min-height: 100vh;
  background: var(--el-bg-color-page);
}

.header {
  background: var(--el-color-primary);
  padding: 2rem 0;
  border-bottom: none;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-title {
  color: var(--el-color-white);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.header-subtitle {
  color: var(--el-color-white-light-3);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-card {
  border: none;
  border-radius: 12px;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
}

.search-card :deep(.el-card__body) {
  padding: 1.25rem;
}

.search-container {
  max-width: 600px;
  margin: 0;
  padding: 0 1rem;
}

.search-form {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.search-input :deep(.el-input__wrapper) {
  box-shadow: none !important;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  transition: all 0.2s ease;
}

.search-input :deep(.el-input__wrapper:hover) {
  border-color: var(--el-border-color-hover);
}

.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 2px var(--el-color-primary-light-8) !important;
}

.search-input :deep(.el-input__inner) {
  height: 44px;
}

.search-button {
  height: 44px;
  padding: 0 1.25rem;
  white-space: nowrap;
}

.error-message {
  color: var(--el-color-danger);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

.loading-card {
  border: none;
  border-radius: 12px;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
}

.loading-card :deep(.el-card__body) {
  padding: 2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.loading-icon {
  font-size: 1.5rem;
  color: var(--el-color-primary);
}

.forecast-card {
  border: none;
  border-radius: 12px;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
}

.forecast-card :deep(.el-card__body) {
  padding: 1.5rem;
}

.forecast-container {
  background: transparent;
}

.location-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-title .el-icon {
  color: var(--el-color-primary);
}

.forecast-cards {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .header {
    padding: 1.25rem 0;
  }

  .header-title {
    font-size: 1.5rem;
  }

  .main-content {
    padding: 1rem;
    gap: 1rem;
  }

  .search-card :deep(.el-card__body),
  .loading-card :deep(.el-card__body),
  .forecast-card :deep(.el-card__body) {
    padding: 1rem;
  }

  .location-title {
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }
}
</style>
