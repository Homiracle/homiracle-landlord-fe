import { useAppTheme } from "../../Theme"
import React from "react";
import { Text, View } from "react-native";

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
                width: 334,
                height: 68,
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
                        top:41,
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
                        top:41,
                        left: 18,
                    }, homiralceTheme.fonts.bodySmall
                ]}
                >Người ở</Text>
            </View>
        </View>
        
    )
} 