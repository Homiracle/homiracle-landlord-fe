import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header,TabView, RoomAndTenant,TenantList, DeviceList } from '../../Components';
import { RoomItem, RoomItemProps,RoomList} from '../../Components/Room';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton, TabButtonProps } from '../../Components/TabView/TabButton';
import {useLazyGetRoomsQuery} from '../../Services';
type Props = {
  floor_id?: string,
}
export const FloorDetail : React.FC<Props> = ({floor_id})  => {
  const navigation = useNavigation();
  const [getRoomList,{data}] = useLazyGetRoomsQuery();
  const [status, setStatus] = React.useState('info');
  const setStatusFilter = (status: string) => {
    setStatus(status)
  }
   const [focus, setFocus] = React.useState(<RoomList floor_id={floor_id} />);
  // let data: RoomItemProps [] = [
  //   {room_id: '1',
  //    room_name: 'Room 101',
  //    num_of_device: 3,
  //    num_of_tenant: 2,
  //    cost: 1200000,
  //   },
  //   {room_id: '2',
  //    room_name: 'Room 101',
  //    num_of_device: 3,
  //    num_of_tenant: 2,
  //    cost: 1200000,
  //   },
  //   {room_id: '3',
  //    room_name: 'Room 101',
  //    num_of_device: 3,
  //    num_of_tenant: 2,
  //    cost: 1200000,
  //   },
  // ];
  return(
    <View>
      <Header 
      title = {'Tầng ' + floor_id}
      height={20}
      mode = 'center-aligned'
      onBack={() => {
        navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL as never);
     }}>
      <RoomAndTenant
        num_of_room={data?.length}
        num_of_tenant = {12}/>
      

      </Header>
      <TabView >
          <TabButton
            isClicked={status === 'info'}
            name='Thong tin'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('info'); setFocus(<RoomList floor_id={floor_id}/>)}}
          />
          <TabButton
            isClicked={status === 'device'}
            name='thiet bi'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('device'); setFocus(<DeviceList floor_id={floor_id}/>)}}
          />
          <TabButton
            isClicked={status === 'tenant'}  
            name='Khach thue'
            number={12}
            displayNumber = {true}
            onFocus={() => {setStatusFilter('tenant'); setFocus(<TenantList floor_id={floor_id}/>)}}
          />
        </TabView>

        <FlatList
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          horizontal={false}
          data={data}
          renderItem={({item}) => (
          <RoomItem
            room_id={item.room_id}
            room_name={item.room_name}
            num_of_device={item.num_of_device}
            cost={item.cost}
            num_of_tenant={item.num_of_tenant}
            ></RoomItem>)}
          />
          
    </View>
  )
};