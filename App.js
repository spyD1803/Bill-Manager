/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './src/screens/Dashboard';
import CreateBill from './src/screens/CreateBill';
import {store, persistor} from './store';
import Estimate from './src/screens/Estimate';
import Chart from './src/screens/Chart';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="BillModify" component={CreateBill} />
            <Stack.Screen name="Estimate" component={Estimate} />
            <Stack.Screen name="Chart" component={Chart} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
