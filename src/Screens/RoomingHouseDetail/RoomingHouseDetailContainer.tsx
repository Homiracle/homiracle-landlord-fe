import React from 'react';
import { RoomingHouseDetail } from './RoomingHouseDetail';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackHouseParamList } from '@/Components';
import { RootScreens } from '@/Constants/RootScreen';
import { StyleSheetProperties } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

type RoomingHouseDetailsRouteProp = RouteProp<
  RootStackHouseParamList,
  RootScreens.ROOMING_HOUSED_DETAIL
>;
export type RoomingHouseDetailsNavigationProp = StackNavigationProp<
  RootStackHouseParamList,
  RootScreens.ROOMING_HOUSED_DETAIL
>;

type Props = {
  route: RoomingHouseDetailsRouteProp;
  navigation: RoomingHouseDetailsNavigationProp;
};

export const RoomingHouseDetailContainer = ({ route, navigation }: Props) => {
  return <RoomingHouseDetail navigation={navigation} />;
};
