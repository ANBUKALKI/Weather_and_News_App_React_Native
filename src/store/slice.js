import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: null,
  forecast: [],
  news: [],
  loading: false,
  error: null,
  unit: 'metric',
  newsCategories: ['general'],
  location: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setWeather(state, action) {
      state.weather = action.payload;
    },
    setForecast(state, action) {
      state.forecast = action.payload;
    },
    setNews(state, action) {
      state.news = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUnit(state, action) {
      state.unit = action.payload;
    },
    setNewsCategories(state, action) {
      state.newsCategories = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const {
  setWeather,
  setForecast,
  setNews,
  setLoading,
  setError,
  setUnit,
  setNewsCategories,
  setLocation,
} = appSlice.actions;

export default appSlice.reducer;