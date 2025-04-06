<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from 'vue'
import WindDirection from "./WindDirection.vue";

// Nominatim APIのレスポンス型定義 (必要な部分のみ)
type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
}[];

// WeatherAPIの型定義
type WeatherAPIData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

const data: Ref<WeatherAPIData | undefined> = ref();
const searchQuery = ref('');
const isLoading = ref(false);
const error = ref('');

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

// Nominatim APIで地名から緯度経度を取得する関数
const getCoordinates = async (query: string): Promise<string> => {
  console.log('Geocoding Query:', query);
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&accept-language=ja&limit=1`
    );

    if (!response.ok) {
      throw new Error('地名の検索に失敗しました');
    }

    const results: NominatimResult = await response.json();

    if (results.length === 0 || !results[0].lat || !results[0].lon) {
      throw new Error('指定された地名が見つかりませんでした。');
    }

    const coordinates = `${results[0].lat},${results[0].lon}`;
    console.log('Coordinates:', coordinates);
    return coordinates;

  } catch (error) {
    console.error('ジオコーディングエラー:', error);
    throw error instanceof Error ? error : new Error('地名の検索中にエラーが発生しました。');
  }
};

// WeatherAPIで天気情報を取得する関数 (引数は地名または緯度経度)
const fetchWeather = async (query: string): Promise<WeatherAPIData> => {
  console.log('Weather API Query:', query);
  try {
    // クエリが緯度経度の形式か簡易的にチェック
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(query);
    const encodedQuery = isCoordinates ? query : encodeURIComponent(query);

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodedQuery}&lang=ja`
    );

    if (!response.ok) {
      if (response.status === 400) {
        // Nominatimで変換後の緯度経度で失敗することは少ないはずだが、念のため
        throw new Error('指定された場所の天気情報が見つかりませんでした。');
      } else {
        throw new Error(`天気情報の取得に失敗しました (ステータス: ${response.status})`);
      }
    }

    const weatherData = await response.json();
    return weatherData as WeatherAPIData;
  } catch (error) {
    console.error('天気情報の取得エラー:', error);
    throw error instanceof Error ? error : new Error('天気情報の取得中にエラーが発生しました。');
  }
};

const formatDate = (dateString: string): string => {
  try {
    // Yahoo天気APIの日付形式（202403071200）をパースする
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);

    const date = new Date(
      Number(year),
      Number(month) - 1, // 月は0から始まるため-1
      Number(day),
      Number(hour),
      Number(minute)
    );

    return new Intl.DateTimeFormat("ja-JP", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24時間表示
    }).format(date);
  } catch (e) {
    console.error('日付のパースに失敗:', e);
    return '日付情報なし';
  }
};

const handleSearch = async () => {
  if (!searchQuery.value) {
    error.value = '検索する地名を入力してください'; // メッセージをシンプルに
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  data.value = undefined;
  
  try {
    // 1. 地名を緯度経度に変換
    const coordinates = await getCoordinates(searchQuery.value);
    
    // 2. 緯度経度で天気情報を取得
    const weatherResponse = await fetchWeather(coordinates);
    data.value = weatherResponse;

  } catch (e) {
    error.value = e instanceof Error ? e.message : '検索中にエラーが発生しました';
    console.error('検索処理エラー:', e);
  } finally {
    isLoading.value = false;
  }
};

const getWeatherIcon = (iconUrl: string): string => {
  // WeatherAPIのアイコンURLから、対応する絵文字を返す
  if (iconUrl.includes('113.png')) return '☀️';
  if (iconUrl.includes('116.png')) return '⛅️';
  if (iconUrl.includes('119.png')) return '☁️';
  if (iconUrl.includes('122.png')) return '☁️';
  if (iconUrl.includes('143.png')) return '🌫️';
  if (iconUrl.includes('176.png')) return '🌧️';
  if (iconUrl.includes('179.png')) return '🌧️';
  if (iconUrl.includes('182.png')) return '🌧️';
  if (iconUrl.includes('185.png')) return '🌧️';
  if (iconUrl.includes('200.png')) return '⛈️';
  if (iconUrl.includes('227.png')) return '🌨️';
  if (iconUrl.includes('230.png')) return '❄️';
  if (iconUrl.includes('248.png')) return '🌫️';
  if (iconUrl.includes('260.png')) return '🌫️';
  if (iconUrl.includes('263.png')) return '🌧️';
  if (iconUrl.includes('266.png')) return '🌧️';
  if (iconUrl.includes('281.png')) return '🌧️';
  if (iconUrl.includes('284.png')) return '🌧️';
  if (iconUrl.includes('293.png')) return '🌧️';
  if (iconUrl.includes('296.png')) return '🌧️';
  if (iconUrl.includes('299.png')) return '🌧️';
  if (iconUrl.includes('302.png')) return '🌧️';
  if (iconUrl.includes('305.png')) return '🌧️';
  if (iconUrl.includes('308.png')) return '🌧️';
  if (iconUrl.includes('311.png')) return '🌧️';
  if (iconUrl.includes('314.png')) return '🌧️';
  if (iconUrl.includes('317.png')) return '🌧️';
  if (iconUrl.includes('320.png')) return '🌨️';
  if (iconUrl.includes('323.png')) return '🌨️';
  if (iconUrl.includes('326.png')) return '🌨️';
  if (iconUrl.includes('329.png')) return '❄️';
  if (iconUrl.includes('332.png')) return '❄️';
  if (iconUrl.includes('335.png')) return '❄️';
  if (iconUrl.includes('338.png')) return '❄️';
  if (iconUrl.includes('350.png')) return '🌧️';
  if (iconUrl.includes('353.png')) return '🌧️';
  if (iconUrl.includes('356.png')) return '🌧️';
  if (iconUrl.includes('359.png')) return '🌧️';
  if (iconUrl.includes('362.png')) return '🌧️';
  if (iconUrl.includes('365.png')) return '🌧️';
  if (iconUrl.includes('368.png')) return '🌨️';
  if (iconUrl.includes('371.png')) return '❄️';
  if (iconUrl.includes('374.png')) return '🌧️';
  if (iconUrl.includes('377.png')) return '🌧️';
  if (iconUrl.includes('386.png')) return '⛈️';
  if (iconUrl.includes('389.png')) return '⛈️';
  if (iconUrl.includes('392.png')) return '⛈️';
  if (iconUrl.includes('395.png')) return '❄️';
  return '❓';
};

onMounted(async () => {
  searchQuery.value = "Tokyo"; // デフォルト検索地をセット
  await handleSearch(); // handleSearch を呼び出す
  searchQuery.value = ""; // 必要であれば検索ボックスをクリア
});
</script>

<template>
  <div class="weather-report">
    <div class="search-container mb-4">
      <h1 class="text-2xl font-bold text-center mb-4">天気検索</h1>
      <div class="flex gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="地名を入力 (例: 東京, 大阪)"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :disabled="isLoading"
        >
          {{ isLoading ? '検索中...' : '検索' }}
        </button>
      </div>
      <p class="text-sm text-gray-500 mt-2">
        <!-- 例を削除または更新 -->
      </p>
      <p v-if="error" class="mt-2 text-red-600">{{ error }}</p>
    </div>

    <article
      v-if="data"
      class="max-w-md w-96 rounded-lg shadow-lg p-4 flex bg-white text-black"
    >
      <div class="basis-1/4 text-left">
        <div class="weather-icon h-16 w-16 flex items-center justify-center text-2xl">
          {{ getWeatherIcon(data.current.condition.icon) }}
        </div>
      </div>
      <div class="basis-3/4 text-left">
        <h1 class="text-3xl font-bold">
          {{ data.current.condition.text }}
          <span class="text-2xl block">
            {{ data.current.temp_c }}&#8451;
          </span>
        </h1>
        <!-- Nominatimのレスポンスには詳細な地域名がない場合があるので、WeatherAPIの結果を表示 -->
        <p>{{ data.location.name }}, {{ data.location.region ? data.location.region + ", " : "" }}{{ data.location.country }}</p>
        <p>湿度: {{ data.current.humidity }}%</p>
        <p data-testid="localtime">{{ formatDate(data.location.localtime) }}</p>
        <p>
          風速: {{ data.current.wind_kph }} km/h
          <wind-direction :degrees="data.current.wind_degree" />
        </p>
      </div>
    </article>
    <div v-else-if="isLoading" class="loading text-center mt-4">
      <p class="text-gray-600">天気情報を取得中...</p>
    </div>
  </div>
</template>

<style scoped>
.weather-report {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1rem;
}

.search-container {
  width: 100%;
}

.weather-icon {
  font-size: 2.5rem;
}
</style>
