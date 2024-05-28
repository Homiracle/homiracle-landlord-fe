import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingContainer, SignInContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { AuthStack } from './AuthStack';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the OnboardingStack component
export const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootScreens.ONBOARDING}
        component={OnboardingContainer}
      />
      <Stack.Screen
        name={'AuthStack'}
        component={AuthStack}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
