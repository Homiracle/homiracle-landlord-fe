import React from "react";
import { RoomingHouseDetail} from './RoomingHouseDetail';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackHouseParamList } from "@/Components";
import { RootScreens } from "@/Constants/RootScreen";

type RoomingHouseDetailsRouteProp = RouteProp<RootStackHouseParamList, RootScreens.ROOMING_HOUSED_DETAIL>;
type RoomingHouseDetailsNavigationProp = StackNavigationProp<RootStackHouseParamList, RootScreens.ROOMING_HOUSED_DETAIL>;

type Props = {
  route: RoomingHouseDetailsRouteProp;
  navigation: RoomingHouseDetailsNavigationProp;
}

export const RoomingHouseDetailContainer = ({route, navigation}: Props) => {
  return <RoomingHouseDetail house_id={route.params?.house_id} />;
};