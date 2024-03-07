import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { InvoiceContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the InvoiceStack component
export const InvoiceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.INVOICE} component={InvoiceContainer} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};