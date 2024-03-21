import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header,TabView, RoomAndTenant } from '../../Components';
import { RoomItem, RoomItemProps} from '../../Components/Room';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton, TabButtonProps } from '../../Components/TabView/TabButton';
export const FloorDetail = ()   => {
  const navigation = useNavigation();
  let data: RoomItemProps [] = [
    {room_id: '1',
     room_name: 'Room 101',
     num_of_device: 3,
     num_of_tenant: 2,
     cost: 1200000,
    },
    {room_id: '2',
     room_name: 'Room 101',
     num_of_device: 3,
     num_of_tenant: 2,
     cost: 1200000,
    },
    {room_id: '3',
     room_name: 'Room 101',
     num_of_device: 3,
     num_of_tenant: 2,
     cost: 1200000,
    },
];
  return(
    <View>
      <Header 
      title = {'Tầng'}
      height={20}
      mode = 'center-aligned'
      onBack={() => {
        navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL as never);
     }}>
      <RoomAndTenant
        num_of_room={data.length}
        num_of_tenant = {12}/>
      

      </Header>
      <TabView default='Phong'>
          <TabButton
            isClicked={true}
            name='Phong'
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
            name='khach thue'
            number={12}
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