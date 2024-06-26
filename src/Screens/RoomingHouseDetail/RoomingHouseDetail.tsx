import React, { useEffect, useState } from 'react';
import { View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import {
  DeviceList,
  FloorList,
  Header,
  RoomAndTenant,
  SearchBar,
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
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import { getHouseId, storeHouse } from '../../Store/reducers';
import { NativeScrollEvent, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { RoomingHouseDetailsNavigationProp } from './RoomingHouseDetailContainer';
import { useAppTheme } from '../../Theme';
import { DeviceScope } from '../../Constants/DeviceScope';

export const RoomingHouseDetail = ({
  navigation,
}: {
  navigation: RoomingHouseDetailsNavigationProp;
}) => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const styles = StyleSheet.create({
    fabStyle: {
      position: 'absolute',
      bottom: hp(2),
      right: wp(4),
      backgroundColor: theme.colors.primary,
    },
  });
  const house_id = useAppSelector(getHouseId);
  // Gọi useQuery cho rooming house
  const {
    data: roomingHouseData,
    isSuccess: isRoomingHouseSuccess,
    isError: isRoomingHouseError,
  } = useGetRoomingHouseDetailsQuery(house_id);

  useEffect(() => {
    if (isRoomingHouseSuccess && roomingHouseData) {
      // console.log('Rooming House Data:', roomingHouseData);
      dispatch(storeHouse({ house: roomingHouseData }));
    } else if (isRoomingHouseError) {
      console.log('Error fetching rooming house data');
    }
  }, [isRoomingHouseSuccess, isRoomingHouseError, roomingHouseData]);

  // Gọi useQuery cho floors
  const {
    data: floorsData,
    isSuccess: isFloorsSuccess,
    isError: isFloorsError,
  } = useGetFloorsQuery(house_id);

  // Xử lý thành công và lỗi cho floors
  // useEffect(() => {
  //   if (isFloorsSuccess) {
  //     console.log('Floors Data:', floorsData);
  //     setFocus(<FloorList data={floorsData} />);
  //   } else if (isFloorsError) {
  //     console.log('Error fetching floors data');
  //   }
  // }, [isFloorsSuccess, isFloorsError, floorsData]);

  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('Tìm kiếm tầng' as string);
  const [label, setLabel] = useState('Thêm tầng');
  const [screen, setScreen] = useState(RootScreens.CREATE_FLOOR as string);
  const [status, setStatus] = useState('floor');
  const setStatusFilter = (status: string) => {
    if (status === 'floor') {
      setPlaceholder('Tìm kiếm tầng');
      setLabel('Thêm tầng');
      setScreen(RootScreens.CREATE_FLOOR as string);
    } else if (status === 'device') {
      setPlaceholder('Tìm kiếm thiết bị');
      setLabel('Thêm thiết bị');
      setScreen(RootScreens.CREATE_DEVICE as string);
    } else if (status === 'tenant') {
      setPlaceholder('Tìm kiếm khách thuê');
      setLabel('Thêm khách thuê');
    }
    setStatus(status);
  };
  const [isExtended, setIsExtended] = useState(true);
  const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'Nhà trọ ' + (roomingHouseData?.house_name || '')}
        height={20}
        mode='center-aligned'
        onBack={() => {
          navigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
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
          name='Tầng'
          displayNumber={true}
          number={roomingHouseData?.number_of_floors}
          onFocus={() => {
            setStatusFilter('floor');
          }}
        />
        <TabButton
          isClicked={status === 'device'}
          name='Thiết bị'
          displayNumber={true}
          number={roomingHouseData?.number_of_devices}
          onFocus={() => {
            setStatusFilter('device');
          }}
        />
        <TabButton
          isClicked={status === 'tenant'}
          name='Khách thuê'
          displayNumber={true}
          number={roomingHouseData?.number_of_tenants}
          onFocus={() => {
            setStatusFilter('tenant');
          }}
        />
      </TabView>
      {/* <SearchBar placeholder={placeholder} value={search} /> */}
      {
        status === 'floor' ? (
          <FloorList data={floorsData} onScroll={onScroll} />
        ) : status === 'device' ? (
          <DeviceList scope={DeviceScope.HOUSE} scope_id={house_id} onScroll={onScroll} />
        ) : status === 'tenant' ? (
          <TenantList scope={DeviceScope.HOUSE} onScroll={onScroll} />
        ) : <></>
      }
      {status !== 'tenant' && (
        <AnimatedFAB
          icon={'plus'}
          label={label}
          extended={isExtended}
          onPress={() => {
            if (status === 'device') {
              navigation.navigate(RootScreens.CREATE_DEVICE, { isHouse: true });
            } else {
              navigation.navigate(RootScreens.CREATE_FLOOR as never);
            }
          }}
          visible={true}
          animateFrom={'right'}
          iconMode={'dynamic'}
          style={styles.fabStyle}
          color={theme.colors.onPrimary}
        />
      )}
    </View>
  );
};
