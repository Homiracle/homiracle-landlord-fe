import React, { useEffect, useState } from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DeviceList, FloorItem, FloorList, Header, RoomAndTenant, TabView, TenantList } from '../../Components';
import { SceneMap } from 'react-native-tab-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabButton, TabButtonProps } from '../../Components/TabView/TabButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLazyGetRoomingHouseDetailsQuery, useLazyGetRoomingHousesQuery } from '../../Services';

type Props = {
  house_id?: string,
}

export const RoomingHouseDetail: React.FC<Props> = ({house_id}) => {

  const HomiracleNavigation = useNavigation();
  const [focus, setFocus] = useState(<FloorList house_id={house_id}/>);
  const updateRenderFocus = (newRender: React.JSX.Element) => {
    setFocus(newRender)
  }

  const [getRoomingHouseDetails, { data, isLoading, isError }] = useLazyGetRoomingHouseDetailsQuery();
  useEffect(
    () => {
      const getHouseDetails = async () => {
        try {
          const result = house_id && getRoomingHouseDetails(house_id);
          console.log(result); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error('Some error in get house details', error);
        }
      };
      getHouseDetails();
    }, [],
  );

  const listTab = [
    {
      status: 'floor'
    },
    {
      status: 'device'
    },
    {
      status: 'room'
    }
  ]
  const [status, setStatus] = useState('floor');
  const setStatusFilter = (status: string) => {
    setStatus(status)
  }

  return (
    <View>
        <Header
        title={'Nhà trọ' + data?.house_name}
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
         }}
        onBack={() => {
          HomiracleNavigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
        }}
        >
          {data && <RoomAndTenant 
            num_of_room={data.num_of_room}
            num_of_tenant={data.num_of_tenant}
          />}
        </Header>

        <TabView>
          <TabButton
            isClicked={status === 'floor'}
            name='tầng'
            number={data?.num_of_floor}
            onFocus={() => {setStatusFilter('floor'); setFocus(<FloorList house_id={house_id}/>)}}
          />
          <TabButton
            isClicked={status === 'device'}
            name='thiết bị'
            number={data?.num_of_device}
            onFocus={() => {setStatusFilter('device'); setFocus(<DeviceList house_id={house_id}/>)}}
          />
          <TabButton
            isClicked={status === 'tenant'}
            name='khách thuê'
            number={data?.num_of_tenant}
            onFocus={() => {setStatusFilter('tenant'); setFocus(<TenantList house_id={house_id}/>)}}
          />
        </TabView>
        {focus}
    </View>
  );
};

