import { FlatList } from 'native-base';
import React from 'react';
import { DeviceItem } from './DeviceItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';

export interface DeviceListProps {
  house_id?: string;
  floor_id?: string;
  room_id?: string;
}

export const DeviceList = ({
  house_id,
  floor_id,
  room_id,
}: DeviceListProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const devicedata = [
    {
      device_id: '1',
      device_name: 'cam bien abc',
      type: 'cam bien',
      status: 'connected',
    },
    {
      device_id: '1',
      device_name: 'cam bien abc',
      type: 'cam bien',
      status: 'connected',
    },
    {
      device_id: '1',
      device_name: 'cam bien abcxyaysyas',
      type: 'cam bien',
      status: 'connected',
    },
  ];

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          gap: 10,
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={devicedata}
        renderItem={({ item }) => (
          <DeviceItem
            device_id={item.device_id}
            device_name={item.device_name}
            type={item.type}
            status={item.status}
          />
        )}
      />
    </View>
  );
};
