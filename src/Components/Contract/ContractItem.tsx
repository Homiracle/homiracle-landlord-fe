import { theme } from 'native-base';
import { useAppTheme } from '../../Theme';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from '../../Store/hook';
import { storeId } from '../../Store/reducers';
import { RootStackContractList } from '../../Screens/ContractDetail/ContractDetailContainer';

export interface ContractItemProps{
    floor_id :string,
    room_id: string,
    address: string,
    contract_id: string,
    room_cost:   number,
}


export const ContractItem = ({
    contract_id,
    address,
    room_id,
    floor_id,
    room_cost

}:ContractItemProps) => {
    const homiralceTheme = useAppTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackContractList>>();
    return (
        <TouchableOpacity
            style={{
                width: 335,
                height: 110,
                display: 'flex',
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: homiralceTheme.colors.surfaceBright,
                shadowOpacity: 31,
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}
            onPress={() => {
              navigation.navigate(RootScreens.CONTRACT_DETAIL,{contract_id});
            }}
        >
            <Text
                style={[{
                    textAlign: 'left',
                    position: 'absolute',
                    left: 175,
                    top: 10,
                }, homiralceTheme.fonts.titleMedium]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{room_cost}</Text>

            <Text
                style={[{
                    textAlign: 'left',
                    width: 149,
                    height: 41,
                    position: 'absolute',
                    left: 175,
                    top: 35,
                }, homiralceTheme.fonts.bodySmall]}
                numberOfLines={2}
                ellipsizeMode='tail'
            >{address}</Text>

            
            <Icon 
                style={{
                    right: 138,
                    bottom: 9,
                    position: 'absolute',
                }}
                name='home-variant'size={24} color={homiralceTheme.colors.primary}
            />
            <Text
                style={[
                    {
                        position: 'absolute',
                        right: 123,
                        bottom: 12,
                        color: homiralceTheme.colors.primary,
                    },
                    homiralceTheme.fonts.bodySmall,
                ]}>
                {floor_id}
            </Text>

            <Icon 
                style={{
                    right: 52,
                    bottom: 9,
                    position: 'absolute',
                }}
                name='account-multiple'size={24} color={homiralceTheme.colors.primary}
            />
            <Text
                style={[
                    {
                        position: 'absolute',
                        right: 32,
                        bottom: 12,
                        color: homiralceTheme.colors.primary,
                    },
                    homiralceTheme.fonts.bodySmall
                ]}>
                {room_id}
            </Text>


        </TouchableOpacity>
    );
};