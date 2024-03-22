import React from "react";
import {RoomDetail} from "./RoomDetail";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackRoomParamList } from "@/Components";
import { RootScreens } from "@/Constants/RootScreen";


type RoomDetailsRouteProp = RouteProp<RootStackRoomParamList, RootScreens.ROOMDETAIL>;
type RoomDetailsNavigationProp = StackNavigationProp<RootStackRoomParamList, RootScreens.ROOMDETAIL>;

type Props = {
  route: RoomDetailsRouteProp;
  navigation: RoomDetailsNavigationProp;
}
export const RoomDetailContainer = ({route, navigation}: Props) => {
  return <RoomDetail room_id ={route.params?.room_id}/>;
};