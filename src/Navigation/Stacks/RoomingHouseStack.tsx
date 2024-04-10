import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RoomingHouseContainer,
  CreateRoomingHouseContainer,
  RoomingHouseDetailContainer,
  CreateFloorContainer,
  CreateRoomContainer,
  FloorDetailContainer,
  AddTenantContainer,
} from '../../Screens';
import { CreateContractContainer } from '../../Screens/CreateContract';
import { RoomDetailContainer } from '../../Screens/RoomDetail';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { CreateDeviceContainer } from '../../Screens/CreateDevice';


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
      <Stack.Screen
        name={RootScreens.CREATE_FLOOR}
        component={CreateFloorContainer}
      />
      <Stack.Screen
        name={RootScreens.CREATE_ROOM}
        component={CreateRoomContainer}
      />
      <Stack.Screen
        name={RootScreens.FLOORDETAIL}
        component={FloorDetailContainer}
      />
      <Stack.Screen
        name={RootScreens.ROOMDETAIL}
        component={RoomDetailContainer}
      />
      <Stack.Screen
        name={RootScreens.CREATE_CONTRACT}
        component={CreateContractContainer}
      />
      <Stack.Screen
        name={RootScreens.CREATE_DEVICE}
        component={CreateDeviceContainer}
      />
      <Stack.Screen
        name={RootScreens.ADD_TENANT}
        component={AddTenantContainer}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
