import { FlatList } from 'native-base';
import React from 'react';
import { DeviceItem } from './DeviceItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { NativeScrollEvent, View } from 'react-native';

export interface DeviceListProps {
  data: any[];
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}

export const DeviceList = ({ data, onScroll }: DeviceListProps) => {
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
          paddingBottom: hp(10),
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
        onScroll={onScroll}
      />
    </View>
  );
};
