<script lang="ts" setup>
interface DailyWeatherProps {
  date: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  temp_max: number;
  temp_min: number;
  pop: number;
}

const props = defineProps<DailyWeatherProps>();

const formatDate = (timestamp: number, options: Intl.DateTimeFormatOptions): string => {
  try {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("ja-JP", options).format(date);
  } catch (e) {
    console.error('日付のパースに失敗:', e);
    return '日付情報なし';
  }
};

const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
};

const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅️', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '❓';
};
</script>

<template>
  <div class="flex-1 bg-gray-50 rounded-lg p-3 flex flex-col items-center shadow min-w-[140px]">
    <!-- 日付 -->
    <div class="text-base font-semibold">
      {{ formatDate(date, { month: 'numeric', day: 'numeric' }) }}
      <span class="text-gray-600">({{ getDayOfWeek(date) }})</span>
    </div>
    
    <!-- 天気アイコンと説明 -->
    <div class="weather-icon text-4xl my-2">{{ getWeatherIcon(weather.icon) }}</div>
    <div class="text-xs text-gray-600 mb-2">{{ weather.description }}</div>
    
    <!-- 気温 -->
    <div class="text-base mb-1">
      <span class="text-red-600 font-bold">{{ Math.round(temp_max) }}°</span>
      <span class="text-gray-400 mx-1">/</span>
      <span class="text-blue-600 font-bold">{{ Math.round(temp_min) }}°</span>
    </div>
    
    <!-- 降水確率 -->
    <div class="text-xs text-gray-600">
      {{ Math.round(pop * 100) }}%
    </div>
  </div>
</template>

<style scoped>
.weather-icon {
  line-height: 1;
}
</style> 