import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './Main';
import { WelcomeContainer } from '../Screens/Welcome';
import { RootScreens } from '../Screens';
import { OnboardingContainer } from '../Screens/Onboarding';
import { SignInContainer } from '../Screens/SignIn';
import { SignUpContainer } from '../Screens/SignUp';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.SIGNIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const SignStack = createNativeStackNavigator<RootStackParamList>();
function SignStackF(){
  return(
        <SignStack.Navigator
         screenOptions={{ headerShown: true, gestureEnabled: false }}
         initialRouteName = {RootScreens.SIGNIN}
        >
            <SignStack.Screen
                name = {RootScreens.SIGNIN}
                component={SignInContainer}
            />
            <SignStack.Screen
                name= {RootScreens.SIGNUP}
                component={SignUpContainer}
            />
        </SignStack.Navigator>
    );
}
// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        initialRouteName={RootScreens.ONBOARDING}
      >
        <RootStack.Screen
          name={RootScreens.ONBOARDING}
          component={OnboardingContainer}
        />
        <RootStack.Screen
          name ={RootScreens.SIGNIN}
          component={SignStackF}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
