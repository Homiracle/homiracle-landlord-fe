import React from "react";
import {FloorDetail} from "./FloorDetail";
import { RootStackParamList } from "../../Constants/RootStackParam";
import { RootScreens } from "../../Constants/RootScreen";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type FloorDetailsNavigationProp = StackScreenProps<
  RootStackParamList,
  RootScreens.FLOORDETAIL
>;

export const FloorDetailContainer = ({ route, navigation }: FloorDetailsNavigationProp) => {
  return <FloorDetail route={route} navigation={navigation} />;
};