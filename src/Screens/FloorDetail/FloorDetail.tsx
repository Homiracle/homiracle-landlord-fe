import React, { useEffect } from 'react';
import { FlatList, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { Header, TabView, RoomAndTenant,TenantList, DeviceList } from '../../Components';
import { RoomItem, RoomItemProps,RoomList } from '../../Components/Room';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton } from '../../Components/TabView/TabButton';
import { useAppSelector } from '../../Store/hook';
import { getFloorId, getHouseId } from '../../Store/reducers';
import { useGetFloorDetailQuery, useGetRoomsQuery } from '../../Services';

export const FloorDetail = () => {
  const navigation = useNavigation();
  const house_id = useAppSelector(getHouseId) as string;
  const floor_id = useAppSelector(getFloorId) as string;
  const {
    data: floorData,
    isSuccess: isFloorSuccess,
    isError: isFloorError,
  } = useGetFloorDetailQuery(floor_id);

  const {
    data: roomData,
    isSuccess: isRoomSuccess,
    isError: isRoomError,
  } = useGetRoomsQuery({ house_id, floor_id });

  return (
    <View>
      <Header
        title={'Tầng ' + floorData?.floor_name}
        height={20}
        mode='center-aligned'
        onBack={() => {
          navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL as never);
        }}
      >
        <RoomAndTenant
          num_of_room={floorData?.number_of_empty_rooms}
          num_of_tenant={floorData?.number_of_tenants}
        />
      </Header>
      <TabView>
        <TabButton
          isClicked={true}
          name='Phòng'
          number={floorData?.number_of_rooms}
          displayNumber={true}
        />
        <TabButton
          isClicked={false}
          name='Thiết bị'
          number={floorData?.number_of_devices}
          displayNumber={true}
        />
        <TabButton
          isClicked={false}
          name='Khách thuê'
          number={floorData?.number_of_tenants}
          displayNumber={true}
        />
      </TabView>

      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        horizontal={false}
        data={roomData}
        renderItem={({ item }) => (
          <RoomItem
            room_id={item?.room_id}
            room_name={item?.room_name}
            num_of_device={item?.number_of_devices}
            cost={item?.room_cost}
            num_of_tenant={item?.number_of_tenants}
          ></RoomItem>
        )}
      />
    </View>
  );
};
