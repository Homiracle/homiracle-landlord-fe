import { theme } from 'native-base';
import { useAppTheme } from '../../Theme';
import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from '../../Store/hook';
import { storeId } from '../../Store/reducers';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { useGetRoomingHousesQuery } from '../../Services';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '@/Constants/RootStackParam';


export interface ContractItemProps{
    floor_id :string,
    room_id: string,
    contract_id: string,
    room_cost:   number,
}


export const ContractItem = ({
    contract_id,
    room_id,
    floor_id,
    room_cost,
}:ContractItemProps) => {
    const homiralceTheme = useAppTheme();
    const styles = StyleSheet.create({

    })
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity
            style={{
                width: wp(90),
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: homiralceTheme.colors.surfaceBright,
                shadowOpacity: 31,
                
                marginVertical: 8,
                marginHorizontal: 16,
            }}
            onPress={() => {
              navigation.navigate(RootScreens.CONTRACT_DETAIL,{contract_id});
            }}
        >   
            <View style = {{
                flex:1,
                padding: 10,
                backgroundColor: homiralceTheme.colors.primary,
                borderRadius: 10}}>
                <Text variant='titleLarge' style = {{color: 'white'}} >Hợp đồng</Text>
                <View style={[{ flexDirection: 'row', gap: wp(2), marginTop:10}]}>
                    <View style={{ flex: 1 }}>
                        <Text
                        style={[{
                        color:'white',
                        }, homiralceTheme.fonts.titleMedium]}
                        numberOfLines={2}
                    >{'Tầng ' + floor_id}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                        style={[{
                            textAlign: 'right',
                            color:'white',
                        }, homiralceTheme.fonts.titleMedium]}
                        numberOfLines={1}
                        ellipsizeMode='head'
                    >{'Phòng ' + room_id }</Text>
                    </View>
    
            </View>
            </View>
            <View style={[{ flexDirection: 'row', gap: wp(2), padding:20,

            }]}>
                <View style={{ flex: 1 }}>
                    <Text
                    style={[{
                    
                    }, homiralceTheme.fonts.titleMedium]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{'Giá phòng '}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                    style={[{
                        textAlign: 'right',
                    
                    }, homiralceTheme.fonts.titleMedium]}
                    numberOfLines={1}
                    ellipsizeMode='head'
                >{room_cost}</Text>
                </View>
                
            </View>
           
            
        </TouchableOpacity>
    );
};