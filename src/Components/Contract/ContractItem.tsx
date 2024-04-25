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
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
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
    room_cost

}:ContractItemProps) => {
    const homiralceTheme = useAppTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackContractList>>();
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
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}
            onPress={() => {
              navigation.navigate(RootScreens.CONTRACT_DETAIL,{contract_id});
            }}
        >   
            <View style={[{ flexDirection: 'row', gap: wp(2),

            }]}>
                <View style={{ flex: 1 }}>
                    <Text
                    style={[{
                    
                    }, homiralceTheme.fonts.titleMedium]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{'Giá phòng '+ room_cost}</Text>
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
            <View style={[{ flexDirection: 'row', gap: wp(2),

            }]}>
                <View style={{ flex: 1 }}>
                    <Text
                    style={[{
                    
                    }, homiralceTheme.fonts.titleMedium]}
                    numberOfLines={2}
                >{'Tầng' + floor_id}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                    style={[{
                        textAlign: 'right',
                    
                    }, homiralceTheme.fonts.titleMedium]}
                    numberOfLines={1}
                    ellipsizeMode='head'
                >{'Phòng ' + room_id}</Text>
                </View>
                
            </View>
            
        </TouchableOpacity>
    );
};