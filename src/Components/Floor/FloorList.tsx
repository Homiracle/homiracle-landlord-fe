import { FlatList } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { FloorItem } from './FloorItem';

export const FloorList = ({ data }: any) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <FloorItem
            floor_id={item.floor_id}
            floor_name={item.floor_name}
            num_of_room={item.number_of_rooms}
          />
        )}
      />
    </View>
  );
};
