import React from 'react';
import { ContractDetail } from "./ContractDetail";
import { RootScreens } from '@/Constants/RootScreen';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/Constants/RootStackParam';

export type ContractDetailRouteProp = StackScreenProps<
    RootStackParamList,
    RootScreens.CONTRACT_DETAIL
>;


export const ContractDetailContainer =({route,navigation}: ContractDetailRouteProp) =>{
    return <ContractDetail navigation = {navigation} route = {route}/>
};