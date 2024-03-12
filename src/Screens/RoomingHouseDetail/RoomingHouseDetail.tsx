import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, RoomAndTenant } from '../../Components';


export const RoomingHouseDetail = () => {
  const navigation = useNavigation();
  let data: {
    house_id: string, 
    house_name: string,
    num_of_room: number,
    num_of_tenant: number,
    floor: {
        floor_id: number,
        floor_name: string,
        num_of_room: number,
    }[],
  };
  data = {
    house_id: '1',
    house_name: 'Nhà trọ abc xyz',
    num_of_room: 1,
    num_of_tenant: 1,
    floor: [{
        floor_id: 1,
        floor_name: '2',
        num_of_room: 1,
        },
        {
            floor_id: 2,
            floor_name: '2',
            num_of_room: 1,
        },
        {
            floor_id: 3,
            floor_name: '2',
            num_of_room: 1,
        },
    ]
  }
  return (
    <View>
        <Header
        title={data.house_name}
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
         }}
        onBack={() => {
           navigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
        }}
        >
            <RoomAndTenant 
                num_of_room={data.num_of_room}
                num_of_tenant={data.num_of_tenant}/>
        </Header>
        <RoomAndTenant 
                num_of_room={data.num_of_room}
                num_of_tenant={data.num_of_tenant}
        />
    </View>
  );
};
