<template>
  <div id="app" :style="getBackgroundStyle">
    <h1>Weather </h1>
    <SearchBar :locations="locations" @select="selectLocation" />
    <WeatherList :weather="selectedWeather" />
  </div>
</template>
<script>
import SearchBar from './components/SearchBar.vue';
import WeatherList from './components/WeatherList.vue';
import lightRainImage from '@/assets/light-rain.avif';
import sunnyImage from '@/assets/sunny.avif';
import partlyCloudyImage from '@/assets/partly-cloudy.avif';
import clearSkyImage from '@/assets/clear-sky.avif';
import defaultImage from '@/assets/background.png';

export default {
  name: 'App',
  components: {
    SearchBar,
    WeatherList,
  },
  data() {
    return {
      locations: [],
      selectedWeather: null,
    };
  },
  async created() {
    await this.fetchWeather();
  },
  methods: {
    async fetchWeather() {
      const apiUrl = 'https://tharangini-node.onrender.com/api';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.locations = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectLocation(location) {
      this.selectedWeather = location;
    },
  },
  computed: {
    getBackgroundStyle() {
      let bgImage = '';
      
      if (!this.selectedWeather) {
        bgImage = defaultImage;
        return `background-image: url(${bgImage}); background-size: cover; background-position: center; position: fixed; width: 100%; height: 100%;`;
      }

      const description = this.selectedWeather.description.toLowerCase();
      

      if (description.includes('rain')) {
        bgImage = lightRainImage;
      } else if (description.includes('sunny')) {
        bgImage = sunnyImage;
      } else if (description.includes('cloudy')) {
        bgImage = partlyCloudyImage;
      } else if (description.includes('clear sky')) {
        bgImage = clearSkyImage;
      }

      return `background-image: url(${bgImage}); background-size: cover; background-position: center; position: fixed; width: 100%; height: 100%;`;
    },
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: black;

}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
</style>
