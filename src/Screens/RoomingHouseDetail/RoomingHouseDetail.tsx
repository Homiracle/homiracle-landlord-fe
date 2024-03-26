import React, { useEffect, useState } from 'react';
import { View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import {
  DeviceList,
  FloorList,
  Header,
  RoomAndTenant,
  TabView,
  TenantList,
} from '../../Components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton } from '../../Components/TabView/TabButton';
import {
  useGetFloorsQuery,
  useGetRoomingHouseDetailsQuery,
} from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getHouseId } from '../../Store/reducers';

export const RoomingHouseDetail = () => {
  const house_id = useAppSelector(getHouseId);
  const HomiracleNavigation = useNavigation();
  // Gọi useQuery cho rooming house
  const {
    data: roomingHouseData,
    isSuccess: isRoomingHouseSuccess,
    isError: isRoomingHouseError,
  } = useGetRoomingHouseDetailsQuery(house_id);

  // Gọi useQuery cho floors
  const {
    data: floorsData,
    isSuccess: isFloorsSuccess,
    isError: isFloorsError,
  } = useGetFloorsQuery(house_id);

  // Xử lý thành công và lỗi cho rooming house
  useEffect(() => {
    if (isRoomingHouseSuccess) {
      console.log('Rooming House Data:', roomingHouseData);
    } else if (isRoomingHouseError) {
      console.log('Error fetching rooming house data');
    }
  }, [isRoomingHouseSuccess, isRoomingHouseError, roomingHouseData]);

  // Xử lý thành công và lỗi cho floors
  useEffect(() => {
    if (isFloorsSuccess) {
      console.log('Floors Data:', floorsData);
    } else if (isFloorsError) {
      console.log('Error fetching floors data');
    }
  }, [isFloorsSuccess, isFloorsError, floorsData]);

  const [focus, setFocus] = useState(<FloorList data={floorsData} />);
  const [status, setStatus] = useState('floor');
  const setStatusFilter = (status: string) => {
    setStatus(status);
  };

  return (
    <View>
      <Header
        title={'Nhà trọ ' + (roomingHouseData?.house_name || '')}
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
        }}
        onBack={() => {
          HomiracleNavigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
        }}
      >
        <RoomAndTenant
          num_of_room={roomingHouseData?.number_of_empty_rooms}
          num_of_tenant={roomingHouseData?.number_of_tenants}
        />
      </Header>

      <TabView>
        <TabButton
          isClicked={status === 'floor'}
          name='tầng'
          displayNumber={true}
          number={roomingHouseData?.number_of_floors}
          onFocus={() => {
            setStatusFilter('floor');
            setFocus(<FloorList data={floorsData} />);
          }}
        />
        <TabButton
          isClicked={status === 'device'}
          name='thiết bị'
          displayNumber={true}
          number={roomingHouseData?.number_of_devices}
          onFocus={() => {
            setStatusFilter('device');
            setFocus(<DeviceList house_id={house_id} />);
          }}
        />
        <TabButton
          isClicked={status === 'tenant'}
          name='khách thuê'
          displayNumber={true}
          number={roomingHouseData?.number_of_tenants}
          onFocus={() => {
            setStatusFilter('tenant');
            setFocus(<TenantList house_id={house_id} />);
          }}
        />
      </TabView>
      {isFloorsSuccess && focus}
      {console.log(focus)}
    </View>
  );
};
