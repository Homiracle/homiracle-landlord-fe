import { RouteProp } from '@react-navigation/native';
import { CreateDevice } from './CreateDevice';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackHouseParamList } from '@/Components';

type RoomingHouseDetailsRouteProp = RouteProp<
  RootStackHouseParamList,
  RootScreens.CREATE_DEVICE
>;
type RoomingHouseDetailsNavigationProp = StackNavigationProp<
  RootStackHouseParamList,
  RootScreens.CREATE_DEVICE
>;

export type Props = {
  route: RoomingHouseDetailsRouteProp;
  navigation: RoomingHouseDetailsNavigationProp;
};

export const CreateDeviceContainer = ({ route, navigation }: Props) => {
  return <CreateDevice route={route} navigation={navigation} />;
};
