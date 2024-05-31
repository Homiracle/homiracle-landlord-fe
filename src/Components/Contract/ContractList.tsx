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
      <FlatList
        contentContainerStyle={{
          marginTop: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <ContractItem
            contract_id={item.contract_id}
            cost={item.cost.room_cost}
            user_name={item.tenant?.user_name?? ''}
            address={item.room?.rooming_house?.address}
            room_name={item.room?.name}
          />
        )}
        keyExtractor={item => item.contract_id}
        onScroll={onScroll}
      />
  );
};
