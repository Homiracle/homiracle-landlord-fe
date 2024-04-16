import React from "react";
import {RoomDetail} from "./RoomDetail";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackHouseParamList } from '@/Components';
import { RootScreens } from '@/Constants/RootScreen';
import { RouteProp } from '@react-navigation/native';

type RoomDetailsRouteProp = RouteProp<
  RootStackHouseParamList,
  RootScreens.ROOMING_HOUSED_DETAIL
>;
export type RoomDetailsNavigationProp = StackNavigationProp<
  RootStackHouseParamList,
  RootScreens.ROOMING_HOUSED_DETAIL
>;

type Props = {
  route: RoomDetailsRouteProp;
  navigation: RoomDetailsNavigationProp;
};
export const RoomDetailContainer = ({navigation}:Props) => {
  return <RoomDetail navigation = {navigation}/>;
};