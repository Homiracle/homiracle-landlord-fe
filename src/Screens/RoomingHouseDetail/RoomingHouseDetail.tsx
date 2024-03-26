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
import { useGetRoomingHouseDetailsQuery } from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getHouseId } from '../../Store/reducers';

export const RoomingHouseDetail = () => {
  const house_id = useAppSelector(getHouseId);
  const HomiracleNavigation = useNavigation();
  const [focus, setFocus] = useState(<FloorList house_id={house_id} />);
  const updateRenderFocus = (newRender: React.JSX.Element) => {
    setFocus(newRender);
  };
  const { data, isSuccess, isLoading, isError } =
    useGetRoomingHouseDetailsQuery(house_id);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    } else if (isError) {
      console.log('error');
    }
  }, [isSuccess, isError, data]);

  const listTab = [
    {
      status: 'floor',
    },
    {
      status: 'device',
    },
    {
      status: 'room',
    },
  ];
  const [status, setStatus] = useState('floor');
  const setStatusFilter = (status: string) => {
    setStatus(status);
  };

  return (
    <View>
      <Header
        title={'Nhà trọ ' + (data?.house_name || '')}
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
          num_of_room={data?.number_of_empty_rooms}
          num_of_tenant={data?.number_of_tenants}
        />
      </Header>

      <TabView>
        <TabButton
          isClicked={status === 'floor'}
          name='tầng'
          displayNumber={true}
          number={data?.number_of_floors}
          onFocus={() => {
            setStatusFilter('floor');
            setFocus(<FloorList house_id={house_id} />);
          }}
        />
        <TabButton
          isClicked={status === 'device'}
          name='thiết bị'
          displayNumber={true}
          number={data?.number_of_devices}
          onFocus={() => {
            setStatusFilter('device');
            setFocus(<DeviceList house_id={house_id} />);
          }}
        />
        <TabButton
          isClicked={status === 'tenant'}
          name='khách thuê'
          displayNumber={true}
          number={data?.number_of_tenants}
          onFocus={() => {
            setStatusFilter('tenant');
            setFocus(<TenantList house_id={house_id} />);
          }}
        />
      </TabView>
      {focus}
    </View>
  );
};
