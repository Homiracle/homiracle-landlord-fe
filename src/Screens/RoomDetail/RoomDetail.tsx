import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import {TabView, Header, TabButton} from'../../Components';
import { StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper'
import { useAppTheme } from '../../Theme';

export type RoomProps = {
  room_id: string;
}
export const RoomDetail:React.FC<RoomProps> = ({room_id}) =>{
    const navigation = useNavigation();
    return(
        <View>
            <Header
            title={'Chi tiet phong' + {room_id}}
            height = {10}
            mode = 'center-aligned'
            onBack={()=>navigation.navigate(RootScreens.FLOORDETAIL as never)}>
            </Header>
        <TabView default='Thong tin'>
          <TabButton
            isClicked={true}
            name='Thong tin'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='thiet bi'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='dich vu'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='Khach thue'
            number={12}
          />
          </TabView>
            <View style={styles.container}>
                <Text style={styles.tittle}>Thông tin chung</Text>
                <View >
                    <Text>Số phòng ngủ</Text>
                    <TextInput></TextInput>
                </View>
            </View>
        </View>
    );
};
const homiracleTheme = useAppTheme();
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    tittle:{
        color: homiracleTheme.colors.primary,
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
      fontSize: 30,
      color: '#000',
    },
  });