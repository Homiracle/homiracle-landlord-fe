import { FlatList } from 'native-base';
import React from 'react';
import { NativeScrollEvent, View } from 'react-native';
import { ContractItem} from './ContractItem'
import { FlatListProps } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface ContractListProps {
  data: any;
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}

export const ContractList = ({ data, onScroll }: ContractListProps) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          paddingBottom: hp(10)
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <ContractItem
            room_id={item.room_id}
            floor_id={item.floor_id}
            address={item.address}
            contract_id={item.contract_id}
            room_cost={item.room_cost}
          />
        )}
        onScroll={onScroll}
      />
    </View>
  );
};
