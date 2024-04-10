import React from "react";
import {RoomDetail} from "./RoomDetail";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackHouseParamList } from '@/Components';
import { RootScreens } from '@/Constants/RootScreen';
import { RouteProp } from '@react-navigation/native';

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
export const RoomDetailContainer = ({navigation}:Props) => {
  return <RoomDetail navigation = {navigation}/>;
};