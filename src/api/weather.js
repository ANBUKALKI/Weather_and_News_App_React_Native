import axios from 'axios';
import { setWeather, setForecast, setLoading, setError } from '../store/slice';

const API_KEY = '2f8ee461ca604525c91251c000038e92';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = (lat, lon, units) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      
      dispatch(setWeather(weatherResponse.data));
      dispatch(setForecast(forecastResponse.data.list));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};