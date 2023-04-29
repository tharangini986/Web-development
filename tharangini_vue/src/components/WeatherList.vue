<template>
  <div class="weather-tile-container" v-if="weather">
    <div class="weather-tile">
      <div class="weather-tile-header">{{ weather.city }}, {{ weather.country }}</div>
      <div class="weather-tile-body">
        <div class="weather-tile-row">
          <div class="weather-tile-label"><i class="fa fa-thermometer-half"></i>&nbsp; Temperature:</div>
          <div class="weather-tile-value">{{ weather.temperature }} °C</div>
        </div>
        <div class="weather-tile-row">
          <div class="weather-tile-label"><i class="fa fa-tint"></i>&nbsp; Humidity:</div>
          <div class="weather-tile-value">{{ weather.humidity }}%</div>
        </div>
        <div class="weather-tile-row">
          <div class="weather-tile-label"><i class="fa fa-wind"></i>&nbsp; Wind Speed:</div>
          <div class="weather-tile-value">{{ weather.wind_speed }} km/h</div>
        </div>
        <div class="weather-tile-row">
          <div class="weather-tile-label"><i class="fa fa-location-arrow"></i>&nbsp; Wind Direction:</div>
          <div class="weather-tile-value">{{ weather.wind_direction }}</div>
        </div>
        <div class="weather-tile-row">
          <div class="weather-tile-label"><i class="fa fa-cloud"></i>&nbsp; Description:</div>
          <div class="weather-tile-value">{{ weather.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherList',
  props: {
    weather: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style>
.weather-tile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}

.weather-tile {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 600px;
}

.weather-tile-header {
  font-size: 2.5rem;
  font-weight: bold;
  padding: 1rem;
  background-color: #333;
  color: #fff;
}

.weather-tile-body {
  padding: 1rem;
}

.weather-tile-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}

.weather-tile-label {
  font-size: 1.5rem;
  font-weight: bold;
  flex: 1;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}

.weather-tile-value {
  font-size: 1.5rem;
  flex: 1;
  text-align: right;
}
</style>