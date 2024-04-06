import React from 'react';
import { ContractDetail } from "./ContractDetail";
import { RootScreens } from '@/Constants/RootScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
export type RootStackContractList = {
    ContractDetail: { contract_id: string } | undefined;
}
type ContractDetailRouteProp = RouteProp<
    RootStackContractList,
    RootScreens.CONTRACT_DETAIL
>;
export type ContractDetailsNavigationProp = StackNavigationProp<
  RootStackContractList,
  RootScreens.CONTRACT_DETAIL
>;
type Props = {
    navigation: ContractDetailsNavigationProp;
    route: ContractDetailRouteProp ;
}

export const ContractDetailContainer =({route,navigation}: Props) =>{
    return <ContractDetail navigation = {navigation} />
};