import React, { useState, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigation';
import { AuthStack, OnboardingStack } from './Stacks';
import { RootStackParamList } from '../Constants/RootStackParam';
import { useAppTheme } from '../Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import {
  AuthContext,
  AuthContextProps,
  AuthProvider,
} from '../Hooks/AuthContext';
import { OnboardingContext } from '../Hooks/OnboardingContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  const theme = useAppTheme();
  const authContext = useContext<AuthContextProps>(
    AuthContext as React.Context<AuthContextProps>,
  ); // Update the type of AuthContext
  const onboardingContext = useContext(OnboardingContext);

  if (!authContext || !onboardingContext) {
    throw new Error('Contexts must be used within their respective providers');
  }

  const { isGuest, isLoading, checkAuthToken } = authContext;
  const { isShowOnboarding } = onboardingContext;

  useEffect(() => {
    const intervalId = setInterval(checkAuthToken, 3000);
    return () => clearInterval(intervalId);
  }, [checkAuthToken]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    ); // or a loading spinner
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isShowOnboarding ? (
          <RootStack.Screen
            name='OnboardingStack'
            component={OnboardingStack}
          />
        ) : isGuest ? (
          <RootStack.Screen name='AuthStack' component={AuthStack} />
        ) : (
          <RootStack.Screen name='TabNavigator' component={TabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
