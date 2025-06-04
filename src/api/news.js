import axios from 'axios';
import { setNews, setLoading, setError } from '../store/slice';
import { filterNewsByWeather } from '../utils/weatherFilter';


const API_KEY = '977022cd0f1b40c6affb0e1965fea1ca';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = (categories, weather) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const promises = categories.map(category => 
        axios.get(`${BASE_URL}/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`)
      );
      
      const responses = await Promise.all(promises);
      let allArticles = [];
      
      responses.forEach(response => {
        allArticles = [...allArticles, ...response.data.articles];
      });
      
      const filteredNews = filterNewsByWeather(allArticles, weather);
      dispatch(setNews(filteredNews));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};