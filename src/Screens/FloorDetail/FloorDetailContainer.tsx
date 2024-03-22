import React from "react";
import {FloorDetail} from "./FloorDetail";
import { RouteProp } from "@react-navigation/native";
import { RootStackFloorParamList } from "@/Components";
import { RootScreens } from "@/Constants/RootScreen";

type FloorDetailsRouteProp = RouteProp<RootStackFloorParamList, RootScreens.FLOORDETAIL>;
type Props = {
  route: FloorDetailsRouteProp;
}
export const FloorDetailContainer = ({route}:Props) => {
  return <FloorDetail floor_id = {route.params?.floor_id} />;
};