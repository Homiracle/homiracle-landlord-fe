import { useAppTheme } from "../../Theme"
import React from "react";
import { Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export interface RoomAndTenantProps {
    num_of_room: number,
    num_of_tenant: number,
}

export const RoomAndTenant = ({
    num_of_room,
    num_of_tenant,
}: RoomAndTenantProps) => {
    const homiralceTheme = useAppTheme();
    return (
        <View
            style={{
                display: 'flex',
                width: 400,
                height: 68,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 14,
        }}>
            <View 
            style={{
                width: 160,
                height: 68,
                borderRadius: 10,
                backgroundColor: 'white',
            }}
            >
                <Text 
                style={[
                    {
                        top: 15,
                        left: 18,

                    }, homiralceTheme.fonts.titleMedium
                ]}
                >{num_of_tenant}</Text>

                <Text
                style={[
                    {
                        top: 20,
                        left: 18,
                    }, homiralceTheme.fonts.bodySmall
                ]}
                >Phòng trống</Text>
            </View>
        
            <View
            style={{
                width: 160,
                height: 68,
                borderRadius: 10,
                backgroundColor: 'white',
            }}>
                <Text 
                style={[
                    {
                        top: 15,
                        left: 18,

                    }, homiralceTheme.fonts.titleMedium
                ]}
                >{num_of_room}</Text>

                <Text
                style={[
                    {
                        top: 20,
                        left: 18,
                    }, homiralceTheme.fonts.bodySmall
                ]}
                >Người ở</Text>
            </View>
        </View>
        
    )
} 