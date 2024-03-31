import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { RoomItem,RoomItemProps } from './RoomItem';
import { ListRoom } from '../../Services/rooms/type';

export const RoomList = ({data}: any) => {
return (
        <FlatList
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          horizontal={false}
          data={data}
          renderItem={({ item }: { item: any }) => (
          <RoomItem
            room_id={item.room_id}
            room_name={item.room_name}
            num_of_device={item.number_of_devices}
            cost={item.room_cost}
            num_of_tenant={item.number_of_tenants}
            ></RoomItem>)}
          />
);
};