<template>
  <div >
  <label for="city-select" class="search-label">Select a city:</label>
    <select class="search-select" v-model="selectedLocation" @change="handleSelect">
      <option disabled value="" class="wh">Please select a city</option>
      <option v-for="location in locations" :key="location._id" :value="location">
        {{ location.city }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    locations: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedLocation: null,
    };
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.selectedLocation);
    },
  },
};
</script>

<style>
.search-select {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 2px solid #ccc;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* add box-shadow */
  transition: box-shadow 0.2s ease-in-out; /* add transition */
}

.search-select:focus {
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* add box-shadow on focus */
}

.search-label {
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: black;
}

.wh{
  color: #FFFFFF;
}
</style>
