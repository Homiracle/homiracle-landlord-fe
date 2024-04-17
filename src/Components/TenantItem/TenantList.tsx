import { FlatList } from 'native-base';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { NativeScrollEvent, View } from 'react-native';
import { TenantItem } from './TenantItem';
import { DeviceScope as Scope } from '../../Constants/DeviceScope';
import { useAppSelector } from '../../Store/hook';
import { getFloorId, getHouseId, getRoomId } from '../../Store/reducers';
import { useGetListTenantQuery } from '../../Services';

export interface TenantListProps {
  scope: string;
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}

export const TenantList = ({ onScroll, scope }: TenantListProps) => {
  const house_id = useAppSelector(getHouseId) as string;
  const floor_id = useAppSelector(getFloorId) as string;
  const room_id = useAppSelector(getRoomId) as string;

  const { data: tenantData } = useGetListTenantQuery({
    house_id,
    floor_id,
    room_id,
  });

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 10,
        paddingBottom: scope === Scope.ROOM ? hp(10) : hp(2),
      }}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      data={tenantData || []}
      renderItem={({ item }) => (
        <TenantItem
          tenant_id={item.tenant?.user_id}
          tenant_name={item.tenant?.user_name}
          phone={item.tenant?.phone || '033xxxxxxx'}
          role={'Thành viên'}
          room_name={'Phòng 101'}
        />
      )}
      onScroll={onScroll}
    />
  );
};
