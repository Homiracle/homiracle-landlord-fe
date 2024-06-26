import React, { useEffect } from 'react';
import { FlatList, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { Header, TabView, RoomAndTenant,TenantList, DeviceList, SearchBar } from '../../Components';
import { RoomList } from '../../Components/Room';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TabButton } from '../../Components/TabView/TabButton';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import { getFloorId, getHouseId, storeFloor } from '../../Store/reducers';
import { useGetFloorDetailQuery, useGetRoomsQuery } from '../../Services';
import { AnimatedFAB, Surface} from 'react-native-paper';
import { StyleSheet, NativeScrollEvent} from 'react-native';
import { useAppTheme } from '../../Theme';
import {FloorDetailsNavigationProp} from './FloorDetailContainer';
import { DeviceScope } from '../../Constants/DeviceScope';
import { ListRoom } from '../../Services/rooms/type';

export const FloorDetail = ({route, navigation}: FloorDetailsNavigationProp) => {
  const dispatch = useAppDispatch();
  const house_id = useAppSelector(getHouseId) as string;
  const floor_id = useAppSelector(getFloorId) as string;
  const {
    data: floorData,
    isSuccess: isFloorSuccess,
    isError: isFloorError,
  } = useGetFloorDetailQuery(floor_id);

  useEffect(() => {
    if (isFloorSuccess && floorData) {
      // console.log('Floors Data:', floorData);
      dispatch(storeFloor({ floor: floorData }));
    } else if (isFloorError) {
      console.log('Error fetching floors data');
    }
  }, [isFloorSuccess, isFloorError, floorData]);

  const {
    data: roomData,
    isSuccess: isRoomSuccess,
    isError: isRoomError,
  } = useGetRoomsQuery({ house_id, floor_id });

  useEffect(() => {
    if (isRoomSuccess) {
      // console.log('Floors Data:', roomData);
    } else if (isRoomError) {
      console.log('Error fetching floors data');
    }
  }, [isRoomSuccess, isRoomError, roomData]);
  const [status, setStatus] = React.useState('room');
  const [placeholder, setPlaceholder] = React.useState('Tìm kiếm phòng' as string);
  const [search, setSearch] = React.useState('');
  const [label, setLabel] = React.useState('Thêm phòng');
  const setStatusFilter = (status: string) => {
    if (status === 'room') {
      setPlaceholder('Tìm kiếm phòng');
      setLabel('Thêm phòng');
    } else if (status === 'device') {
      setPlaceholder('Tìm kiếm thiết bị');
      setLabel('Thêm thiết bị');
    } else if (status === 'tenant') {
      setPlaceholder('Tìm kiếm khách thuê');
      setLabel('Thêm khách thuê');
    }
    setStatus(status);
  };
  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    fabStyle: {
      position: 'absolute',
      bottom: hp(2),
      right: wp(4),
      backgroundColor: theme.colors.primary,
    },
  });
  
  return (
    <View style={{flex : 1}}>
      <Header
        title={ 'Tầng ' + (isFloorSuccess ? floorData?.floor_name : '')}
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
          isClicked={status === 'room'}
          name='Phòng'
          displayNumber={true}
          number={floorData?.number_of_rooms}
          onFocus={() => {
            setStatusFilter('room');
          }}
        />
        <TabButton
          isClicked={status === 'device'}
          name='Thiết bị'
          displayNumber={true}
          number={floorData?.number_of_devices}
          onFocus={() => {
            setStatusFilter('device');
          }}
        />
        <TabButton
          isClicked={status === 'tenant'}
          name='Khách thuê'
          displayNumber={true}
          number={floorData?.number_of_tenants}
          onFocus={() => {
            setStatusFilter('tenant');
          }}
        />
      </TabView>
      {/* <SearchBar placeholder={placeholder} value={search} /> */}

      {
        status === 'room' ? (
          <RoomList data={roomData as ListRoom} onScroll={onScroll} />
        ) : status === 'device' ? (
          <DeviceList scope={DeviceScope.FLOOR} scope_id={floor_id} onScroll={onScroll} />
        ) : status === 'tenant' ? (
          <TenantList scope={DeviceScope.FLOOR} onScroll={onScroll} />
        ) : <></>
      }
        

      {status !== 'tenant' && (
        <AnimatedFAB
          icon={'plus'}
          label={label}
          extended={isExtended}
          onPress={() => {
            if (status === 'room')
              navigation.navigate(RootScreens.CREATE_ROOM as never);
            else if (status === 'device')
              navigation.navigate(RootScreens.CREATE_DEVICE, {isFloor: true});
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
