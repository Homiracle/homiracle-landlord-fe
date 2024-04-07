import React from "react";
import {FloorDetail} from "./FloorDetail";
import { RouteProp } from "@react-navigation/native";
import { RootStackFloorParamList } from "@/Components";
import { RootScreens } from "@/Constants/RootScreen";

import { StackNavigationProp } from '@react-navigation/stack';

type FloorDetailsRouteProp = RouteProp<RootStackFloorParamList, RootScreens.FLOORDETAIL>;
export type FloorDetailsNavigationProp = StackNavigationProp<
  RootStackFloorParamList,
  RootScreens.FLOORDETAIL, 
  RootScreens.CREATE_ROOM
>;

type Props = {
  route: FloorDetailsRouteProp;
  navigation: FloorDetailsNavigationProp;
}
export const FloorDetailContainer = ({route, navigation}:Props) => {
  return <FloorDetail navigation={navigation} />;
};