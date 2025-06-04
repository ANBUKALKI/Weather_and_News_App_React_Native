import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, ScrollView, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import BackArrow from '../assets/svg/BackArrow.svg';
import {
  setUnit,
  setNewsCategories,
  setLocation,
} from '../store/slice';

const categories = [
  { id: 'general', name: 'General' },
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' },
];

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { unit, newsCategories } = useSelector((state) => state.app);
  const [tempUnit, setTempUnit] = useState(unit === 'metric' ? true : false);
  const [selectedCategories, setSelectedCategories] = useState(newsCategories);

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const handleUnitChange = (value) => {
    setTempUnit(value);
    dispatch(setUnit(value ? 'imperial' : 'metric'));
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const saveSettings = () => {
    dispatch(setNewsCategories(selectedCategories));
    navigation.goBack();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.header}>
        <TouchableOpacity style={{padding:10,}} onPress={()=>navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
          <Text style={styles.sectionTitle}>Temperature Unit</Text>
        </View>
        <View style={styles.switchContainer}>
          <Text>°C</Text>
          <Switch
            value={tempUnit}
            onValueChange={handleUnitChange}
          />
          <Text>°F</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News Categories</Text>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <Text>{category.name}</Text>
            <Switch
              value={selectedCategories.includes(category.id)}
              onValueChange={() => toggleCategory(category.id)}
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity style={styles.btn} onPress={requestLocationPermission}>
          <Text style={styles.btnText}>Update My Location</Text>
        </TouchableOpacity>
      </View>

       <TouchableOpacity style={styles.btn} onPress={saveSettings} >
          <Text style={styles.btnText}>Save Settings</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap:30,
    alignItems: 'center',
    // paddingHorizontal: 16,
    marginBottom: 20,
  },
  btn:{
    height:50,
    borderRadius:8,
    backgroundColor:'#0494FC',
    justifyContent:'center',
    alignItems:'center',
  },
    btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#fff'
  }
});

export default SettingsScreen;