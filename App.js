import { View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <Provider store={store}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
        </View>
        <StatusBar barStyle="light-content" />
      </NavigationContainer>
    </Provider>
  </SafeAreaView>
  );
}

