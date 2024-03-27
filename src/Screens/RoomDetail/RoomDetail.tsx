import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Surface} from 'react-native-paper';
import { RootScreens } from '../../Constants/RootScreen';
import {TabView, Header, TabButton,DeviceList,TenantList} from'../../Components';
import {TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RoomingHouse as RoomingHouseProps } from '../../Services/rooming-houses/interface';
import { RoomDetailComponent } from '../../Components/Room/RoomDetailComponent';
//import { Room as RoomProps, useCreateRoomMutation } from '../../Services';

type RoomProps = {
  room_id: string,
}
export const RoomDetail:React.FC<RoomProps> = ({room_id}) =>{
    const navigation = useNavigation();
    //hooks
    const [focus, setFocus] = React.useState(<RoomDetailComponent room_id={room_id}/>);
    const [status, setStatus] = React.useState('info');
    const setStatusFilter = (status: string) => {
      setStatus(status)
    }
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        content:{
          flex: 1,
          marginTop: hp(5),
          flexDirection: 'column',
          gap: hp(2),
          position: 'relative',
        }
      });
    return(
      <View style = {styles.container}>
          <Header
            title={'Chi tiet phong ' + room_id}
            height = {8}
            scroll='vertical'
            mode = 'center-aligned'
            onBack={()=>navigation.navigate(RootScreens.FLOORDETAIL as never)}>
        <View style ={styles.content}>

        <TabView>
          <TabButton
            isClicked={status === 'info'}
            name='Thong tin'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('info'); setFocus(<RoomDetailComponent room_id={room_id}/>)}}
          />
          <TabButton
            isClicked={status === 'device'}
            name='thiet bi'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('device'); setFocus(<DeviceList room_id={room_id}/>)}}
          />
          <TabButton
            isClicked={status === 'tenant'}  
            name='Khach thue'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('tenant'); setFocus(<TenantList room_id={room_id}/>)}}
          />
        </TabView>
        </View>
        {focus}
        </Header>
        </View>
    );
};
