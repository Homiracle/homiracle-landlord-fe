import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { RoomItem,RoomItemProps } from './RoomItem';
type Props = {
    floor_id?: string,
  }
export const RoomList : React.FC<Props> = ({floor_id}) =>{
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
return (
    <View>
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
);
};