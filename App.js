import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Components/Registration.js'
import LoginScreen from './Components/Login.js'
import PersonalFormScreen from './Components/PersonalForm.js';
import PersonalFormScreen2 from './Components/PersonalForm2.js';
import PersonalFormScreen3 from './Components/PersonalForm3.js';
import Welcome from './Components/Welcome.js';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="PersonalForm">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={SignUpScreen} />
        <Stack.Screen name="PersonalForm" component={PersonalFormScreen} />
        <Stack.Screen name="PersonalForm2" component={PersonalFormScreen2} />
        <Stack.Screen name="PersonalForm3" component={PersonalFormScreen3} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
