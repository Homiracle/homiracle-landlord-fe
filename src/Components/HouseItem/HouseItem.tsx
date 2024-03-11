import { theme } from 'native-base';
import { useAppTheme } from '../../Theme';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Icon } from 'react-native-paper';
import { RootScreens } from '../../Constants/RootScreen';


export interface HouseItemProps {
    house_id: string,
    house_name: string,
    address: string,
    num_of_room: number,
    num_of_tenant: number,
}

export type RootStackParamList = {
    RoomingHouseDetail: { house_id: string } | undefined;
  };

export const HouseItem = ({
    house_id,
    house_name,
    address,
    num_of_room,
    num_of_tenant,
}:HouseItemProps) => {
    const homiralceTheme = useAppTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
                navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL, {house_id});
            }}
        >
            <Image
                style={{
                    width: 146,
                    height: 90,
                    position: 'absolute',
                    left: 6,
                    top: 10,
                    borderRadius: 10,
                }}
                source={{
                    uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg'
                }}
                alt='this is a image of rooming-house'>

            </Image>
            <Text
                style={[{
                    textAlign: 'left',
                    position: 'absolute',
                    left: 175,
                    top: 10,
                }, homiralceTheme.fonts.titleMedium]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{house_name}</Text>

            <Text
                style={[{
                    textAlign: 'left',
                    width: 149,
                    height: 41,
                    position: 'absolute',
                    left: 175,
                    top: 38,
                }, homiralceTheme.fonts.bodyMedium]}
                numberOfLines={2}
                ellipsizeMode='tail'
            >{address}</Text>

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
                {num_of_room}
            </Text>

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
                {num_of_tenant}
            </Text>


        </TouchableOpacity>
    );
};