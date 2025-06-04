import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { convertTemp, getTempUnitSymbol } from '../utils/unitConverter';

const WeatherCard = () => {
  const { weather, unit } = useSelector((state) => state.app);
  
  if (!weather) return null;

  const temp = convertTemp(weather.main.temp, unit);
  const tempUnit = getTempUnitSymbol(unit);
  const weatherIcon = weather.weather[0].icon;

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <View style={styles.weatherInfo}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>
          {temp}{tempUnit}
        </Text>
      </View>
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <View style={styles.details}>
        <Text>Humidity: {weather.main.humidity}%</Text>
        <Text>Wind: {weather.wind.speed} m/s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  condition: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default WeatherCard;