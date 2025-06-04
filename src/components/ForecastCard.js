import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { convertTemp, getTempUnitSymbol } from '../utils/unitConverter';

const ForecastCard = () => {
  const { forecast, unit } = useSelector((state) => state.app);
  
  if (!forecast || forecast.length === 0) return null;

  const dailyForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const simplifiedForecast = Object.keys(dailyForecast).map(date => {
    const dayForecasts = dailyForecast[date];
    const noonForecast = dayForecasts.find(f => new Date(f.dt * 1000).getHours() === 12) || dayForecasts[0];
    return {
      date,
      temp: convertTemp(noonForecast.main.temp, unit),
      icon: noonForecast.weather[0].icon,
      condition: noonForecast.weather[0].main,
    };
  }).slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <FlatList
        horizontal
        data={simplifiedForecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString([], { weekday: 'short' })}</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
              style={styles.forecastIcon}
            />
            <Text style={styles.forecastTemp}>{item.temp}{getTempUnitSymbol(unit)}</Text>
            <Text style={styles.forecastCondition}>{item.condition}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 16,
    marginTop: 5,
  },
  forecastCondition: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ForecastCard;