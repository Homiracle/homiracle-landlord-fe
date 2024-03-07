import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RoomingHouseContainer,
  CreateRoomingHouseContainer,
} from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the RoomingHouseStack component
export const RoomingHouseStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootScreens.ROOMING_HOUSE}
        component={RoomingHouseContainer}
      />
      <Stack.Screen
        name={RootScreens.CREATE_ROOMING_HOUSE}
        component={CreateRoomingHouseContainer}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
