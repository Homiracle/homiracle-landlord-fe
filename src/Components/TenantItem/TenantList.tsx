import { FlatList } from 'native-base';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { TenantItem } from './TenantItem';

export interface TenantListProps {
  house_id?: string;
  floor_id?: string;
  room_id?: string;
}

export const TenantList = ({
  house_id,
  floor_id,
  room_id,
}: TenantListProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const tenantdata = [
    {
      tenant_id: '1',
      tenant_name: 'Phan Hai Ha',
      phone: '0xxxxxxxxx',
      room_name: '301',
      role: 'thanh vien',
    },
    {
      tenant_id: '1',
      tenant_name: 'Phan Hai Ha',
      phone: '0xxxxxxxxx',
      room_name: '301',
      role: 'truong phong',
    },
    {
      tenant_id: '1',
      tenant_name: 'Phan Hai Ha',
      phone: '0xxxxxxxxx',
      room_name: '301',
      role: 'thanh vien',
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
        data={tenantdata}
        renderItem={({ item }) => (
          <TenantItem
            tenant_id={item.tenant_id}
            tenant_name={item.tenant_name}
            phone={item.phone}
            role={item.role}
            room_name={item.room_name}
          />
        )}
      />
    </View>
  );
};
