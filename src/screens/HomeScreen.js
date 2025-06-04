import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../api/weather';
import { fetchNews } from '../api/news';
import WeatherCard from '../components/weatherCard';
import ForecastCard from '../components/ForecastCard';
import NewsCard from '../components/NewsCard';
import Settings from '../assets/svg/Settings.svg';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    weather,
    forecast,
    news,
    loading,
    error,
    unit,
    newsCategories,
    location,
  } = useSelector((state) => state.app);

  useEffect(() => {
    if (location) {
      dispatch(fetchWeather(location.latitude, location.longitude, unit));
    }
  }, [location, unit]);

  useEffect(() => {
    if (weather) {
      dispatch(fetchNews(newsCategories, weather));
    }
  }, [weather, newsCategories]);

  const refreshData = () => {
    if (location) {
      dispatch(fetchWeather(location.latitude, location.longitude, unit));
    }
  };

  if (loading && !weather) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={refreshData} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity style={{padding:10,}} onPress={() => navigation.navigate('Settings')}>
          <Settings />
        </TouchableOpacity>
      </View>


      {weather && <WeatherCard />}
      {forecast.length > 0 && <ForecastCard />}

      <Text style={styles.newsTitle}>News</Text>
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}

      {loading && <ActivityIndicator size="small" style={styles.loading} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
  },
  loading: {
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop:10,

  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default HomeScreen;