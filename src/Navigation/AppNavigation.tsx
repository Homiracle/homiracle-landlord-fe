import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigation';
import { AuthStack, OnboardingStack } from './Stacks';
import { RootStackParamList } from '../Constants/RootStackParam';
import { useAppTheme } from '../Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  const theme = useAppTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(true);
  const [isShowOnboarding, setIsShowOnboarding] = useState(true);

  const getAuthToken = async () => {
    try {
      const persistedState = await AsyncStorage.getItem('persist:root');
      if (persistedState !== null) {
        const parsedState = JSON.parse(persistedState);
        const authData = JSON.parse(parsedState.auth); // parse the auth data
        return authData.accessToken;
      }
      return null;
    } catch (error) {
      console.error('Error fetching auth data from AsyncStorage', error);
      return null;
    }
  };

  const getOnboardingShow = async () => {
    try {
      const persistedState = await AsyncStorage.getItem('persist:root');
      if (persistedState !== null) {
        const parsedState = JSON.parse(persistedState);
        const onboarding = JSON.parse(parsedState.onboarding); // parse the onboarding data
        return onboarding.isShow;
      }
      return null;
    } catch (error) {
      console.error('Error fetching onboarding data from AsyncStorage', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAuthToken();
      const onboardingShow = await getOnboardingShow();

      setIsGuest(!token); // set isGuest to true if no token
      setIsShowOnboarding(onboardingShow);

      setIsLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

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
