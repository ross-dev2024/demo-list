<script lang="ts" setup>
import { Umbrella, Close } from '@element-plus/icons-vue'

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
  onDelete?: () => void;
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

const isWeekend = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000);
  const day = date.getDay();
  return day === 0 || day === 6;
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
  <el-card class="weather-card" shadow="hover">
    <div class="delete-button" v-if="onDelete">
      <el-button
        circle
        size="small"
        :icon="Close"
        @click="onDelete"
        class="delete-icon"
      />
    </div>
    <!-- 日付 -->
    <div class="date-container">
      <div class="date">
        {{ formatDate(date, { month: 'numeric', day: 'numeric' }) }}
      </div>
      <div class="day-of-week" :class="{ 'is-weekend': isWeekend(date) }">
        ({{ getDayOfWeek(date) }})
      </div>
    </div>
    
    <!-- 天気アイコンと説明 -->
    <div class="weather-icon">
      {{ getWeatherIcon(weather.icon) }}
    </div>
    <div class="weather-description">
      {{ weather.description }}
    </div>
    
    <!-- 気温 -->
    <div class="temperature">
      <span class="temp-max">{{ Math.round(temp_max) }}°</span>
      <span class="temp-separator">/</span>
      <span class="temp-min">{{ Math.round(temp_min) }}°</span>
    </div>
    
    <!-- 降水確率 -->
    <div class="precipitation">
      <el-tag size="small" effect="light" class="precipitation-tag">
        <el-icon class="precipitation-icon"><Umbrella /></el-icon>
        {{ Math.round(pop * 100) }}%
      </el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  width: 160px;
  transition: all 0.3s ease;
  border: none;
}

.weather-card:hover {
  transform: translateY(-4px);
}

.weather-card :deep(.el-card__body) {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 640px) {
  .weather-card {
    width: 100%;
    border-radius: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
    position: relative;
  }

  .weather-card:last-child {
    border-bottom: none;
  }

  .weather-card :deep(.el-card__body) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
  }

  .date-container {
    margin-bottom: 0;
    text-align: left;
    min-width: 80px;
  }

  .weather-icon {
    margin: 0;
    font-size: 2rem;
  }

  .weather-description {
    display: none;
  }

  .temperature {
    margin-bottom: 0;
  }

  .precipitation {
    width: auto;
  }
}

.date-container {
  text-align: center;
  margin-bottom: 0.75rem;
}

.date {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.day-of-week {
  font-size: 0.875rem;
  color: #6b7280;
}

.day-of-week.is-weekend {
  color: #ef4444;
}

.weather-icon {
  font-size: 2.5rem;
  line-height: 1;
  margin: 0.75rem 0;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));
}

.weather-description {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
  text-align: center;
}

.temperature {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.temp-max {
  color: #ef4444;
  font-weight: 600;
  font-size: 1.25rem;
}

.temp-min {
  color: #3b82f6;
  font-weight: 600;
  font-size: 1.25rem;
}

.temp-separator {
  color: #d1d5db;
}

.precipitation {
  width: 100%;
  display: flex;
  justify-content: center;
}

.precipitation-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #f3f4f6 !important;
  border: none !important;
}

.precipitation-icon {
  font-size: 0.875rem;
  color: #6b7280;
}

.delete-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}

.delete-icon {
  padding: 0.25rem;
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  background: transparent;
  border: none;
  transition: all 0.2s ease;
}

.delete-icon:hover {
  color: var(--el-color-danger);
  background: var(--el-color-danger-light-9);
}
</style> 