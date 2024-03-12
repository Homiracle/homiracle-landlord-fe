import { useAppTheme } from "../../Theme"
import React from "react";
import { Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
            }}
            >
                <View
                    style={{
                        paddingLeft: 18,
                        width: 90
                    }}>
                <Text 
                style={[
                    homiralceTheme.fonts.titleMedium
                ]}
                >{num_of_tenant}</Text>

                <Text
                style={[
                   homiralceTheme.fonts.bodySmall
                ]}
                >Phòng trống</Text>
                </View>
                

                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#6FFBBE',
                    }}>
                    <Icon 
                        name='home-variant'
                        size={24}
                        color='white'
                    />
                </View>
            </View>
        
            <View
            style={{
                width: 160,
                height: 68,
                borderRadius: 10,
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
            }}>
                <View
                    style={{
                        paddingLeft: 18,
                        width: 90,
                    }}>
                <Text 
                style={[
                    homiralceTheme.fonts.titleMedium
                ]}
                >{num_of_room}</Text>

                <Text
                style={[
                    homiralceTheme.fonts.bodySmall
                ]}
                >Người ở</Text>
                </View>

                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#FFDBCB',
                    }}>
                    <Icon 
                        name='account'
                        size={24}
                        color='white'
                    />
                </View>
                
            </View>
        </View>
        
    )
} 