<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from 'vue'
import DailyWeather from './DailyWeather.vue';

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
  <div class="min-h-screen bg-gray-100">
    <!-- ヘッダー -->
    <header class="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
      <div class="max-w-[1440px] mx-auto px-6 py-4">
        <h1 class="text-2xl font-bold">天気予報</h1>
        <p class="text-blue-100 text-sm">5日間の天気をチェック</p>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="max-w-[1440px] mx-auto p-6">
      <!-- 検索フォーム -->
      <div class="mb-6 max-w-xl mx-auto">
        <div class="flex gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="地名を入力（例：横浜、新宿、etc...）"
            class="flex-grow p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap"
            :disabled="isLoading"
          >
            <span v-if="isLoading">検索中...</span>
            <span v-else>検索</span>
          </button>
        </div>
        <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
      </div>

      <!-- ローディング表示 -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="text-gray-600">天気情報を取得中...</div>
      </div>

      <!-- 天気予報の表示 -->
      <div v-if="dailyForecast && currentPlace && !isLoading" 
           class="bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-xl font-bold mb-4 text-center text-gray-800">
          {{ currentPlace.name }}の天気予報
        </h2>
        
        <div class="flex justify-center gap-4">
          <DailyWeather
            v-for="day in dailyForecast"
            :key="day.date"
            v-bind="day"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style>
