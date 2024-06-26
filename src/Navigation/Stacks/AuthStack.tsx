import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RoomingHouseContainer, SignInContainer } from '../../Screens';
import { SignUpContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { TabNavigator } from '../TabNavigation';

const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.SIGNIN} component={SignInContainer} />
      <Stack.Screen name={RootScreens.SIGNUP} component={SignUpContainer} />
    </Stack.Navigator>
  );
};
