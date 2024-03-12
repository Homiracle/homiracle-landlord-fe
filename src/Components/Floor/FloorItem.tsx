import { useAppTheme } from "../../Theme";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

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
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                }}
                alt='this is a image of floor'
            >
            </Image>
            <Text
                style={[{
                    width: 80,
                    position: 'absolute',
                    left:10,
                    top: 124,
                }, homiralceTheme.fonts.bodyMedium]}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
            Tầng {floor_name}     
            </Text>

            <Text 
                style={[{
                    position: 'absolute',
                    top: 127,
                    left: 136,
                    color: homiralceTheme.colors.primary,
                }, homiralceTheme.fonts.bodySmall]}
                ellipsizeMode="tail"
                numberOfLines={1}   
            >

                </Text>
            
        </TouchableOpacity>
    );
};