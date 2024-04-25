import { RouteProp } from '@react-navigation/native';
import { DeviceDetail } from './DeviceDetail';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackHouseParamList } from '@/Components';

type RoomingHouseDetailsRouteProp = RouteProp<
  RootStackHouseParamList,
  RootScreens.DEVICE_DETAIL
>;
type RoomingHouseDetailsNavigationProp = StackNavigationProp<
  RootStackHouseParamList,
  RootScreens.DEVICE_DETAIL
>;

export type Props = {
  route: RoomingHouseDetailsRouteProp;
  navigation: RoomingHouseDetailsNavigationProp;
};

export const DeviceDetailContainer = ({ route, navigation }: Props) => {
  return <DeviceDetail route={route} navigation={navigation} />;
};
