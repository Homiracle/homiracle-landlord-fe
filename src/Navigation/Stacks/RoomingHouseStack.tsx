import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RoomingHouseContainer,
  CreateRoomingHouseContainer,
  RoomingHouseDetailContainer,
  CreateFloorContainer,
  CreateRoomContainer,
  FloorDetailContainer,
} from '../../Screens';
import { RoomDetailContainer } from '../../Screens/RoomDetail';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the RoomingHouseStack component
export const RoomingHouseStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootScreens.ROOMING_HOUSE_LIST}
        component={RoomingHouseContainer}
      />
      <Stack.Screen
        name={RootScreens.ROOMING_HOUSED_DETAIL}
        component={RoomingHouseDetailContainer}
      />
      <Stack.Screen
        name={RootScreens.CREATE_ROOMING_HOUSE}
        component={CreateRoomingHouseContainer}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
