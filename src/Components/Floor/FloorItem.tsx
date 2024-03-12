import { useAppTheme } from "../../Theme";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface FloorItemProps {
    floor_id: number,
    floor_name: string,
    num_of_room: number,
}

export const FloorItem = ({
    floor_id,
    floor_name,
    num_of_room,
}: FloorItemProps) => {
    const homiralceTheme = useAppTheme();
    return (
        <TouchableOpacity
         style={{
            width: 159,
            height: 155,
            borderRadius: 10,
            backgroundColor: 'white',
            marginHorizontal: 10,
            marginVertical: 10,
         }}>
            <Image
                style={{
                    width: 137,
                    height: 108,
                    position: 'absolute',
                    left: 10,
                    top: 10,
                }}
                source={{
                    uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg'
                }}
                alt='this is a image of floor'
            >
            </Image>
            <Text
                style={[{
                    width: 80,
                    position: 'absolute',
                    left:10,
                    bottom: 7,
                }, homiralceTheme.fonts.titleMedium]}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
            Tầng {floor_name}   
            </Text>

            <Icon 
                style={{
                    right: 24,
                    bottom: 7,
                    position: 'absolute',
                }}
                name='home-variant'size={24} color={homiralceTheme.colors.primary}
            />

            <Text 
                style={[{
                    position: 'absolute',
                    bottom: 9,
                    right: 14,
                    color: homiralceTheme.colors.primary,
                    fontWeight: '500',
                }, homiralceTheme.fonts.bodySmall]}
                ellipsizeMode="tail"
                numberOfLines={1}   
            >
            {num_of_room}
            </Text>
            
        </TouchableOpacity>
    );
};