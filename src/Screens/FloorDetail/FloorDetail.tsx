import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloorItemProps, FloorItem, Header,TabView } from '../../Components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton, TabButtonProps } from '../../Components/TabView/TabButton';
export const FloorDetail = ()   => {
  const navigation = useNavigation();
  let data: {
    floor_id: string, 
    floor_name: string,
    num_of_room: number,    
    room: {
        room_id: number,
        room_name: string,
        num_of_guest: number,
        num_of_devices: number
    }[],
  };
  data = {
    floor_id: '1',
    floor_name: 'Tầng 1',
    num_of_room: 3,
    room: [{
      room_id: 1,
      room_name:'Phong 101',
      num_of_guest:3,
      num_of_devices:3
    },{  
      room_id: 2,
      room_name:'Phong 102',
      num_of_guest:3,
      num_of_devices:3},
      {  
        room_id: 3,
        room_name:'Phong 103',
        num_of_guest:3,
        num_of_devices:3}
    ]

  };
  return(
    <View>
      <Header 
      title = {data.floor_name}
      height={20}
      mode = 'center-aligned'
      onBack={() => {
        navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL as never);
     }}
      />
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

        {/* <FlatList
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          horizontal={false}
          numColumns={2}
          data={data.room}
          renderItem={({item}) => (<FloorItem
            floor_id={item.room_id}
            floor_name={item.room_name}
            num_of_room={item.num_of_guest}/>)}
          /> */}
          
    </View>
  )
};