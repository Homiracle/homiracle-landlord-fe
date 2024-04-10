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
import { useAppSelector } from '../../Store/hook';
import { getFloorId, getHouseId } from '../../Store/reducers';
import { useGetFloorDetailQuery, useGetRoomsQuery } from '../../Services';
import { AnimatedFAB, Surface} from 'react-native-paper';
import { StyleSheet, NativeScrollEvent} from 'react-native';
import { useAppTheme } from '../../Theme';
import {FloorDetailsNavigationProp} from './FloorDetailContainer';
import { DeviceScope } from '../../Constants/DeviceScope';
export const FloorDetail = (
  {
    navigation,
  }: {
    navigation: FloorDetailsNavigationProp;
  }
) => {

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

  useEffect(() => {
    if (isRoomSuccess) {
      console.log('Floors Data:', roomData);
      setFocus(<RoomList data={roomData} />);
    } else if (isRoomError) {
      console.log('Error fetching floors data');
    }
  }, [isRoomSuccess, isRoomError, roomData]);
  const [focus, setFocus] = React.useState(<RoomList data = {roomData}/>)
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
          isClicked={status === 'room'}
          name='Phòng'
          displayNumber={true}
          number={floorData?.number_of_rooms}
          onFocus={() => {
            setStatusFilter('room');
            setFocus(<RoomList data={roomData} onScroll={onScroll} />);
          }}
        />
        <TabButton
          isClicked={status === 'device'}
          name='Thiết bị'
          displayNumber={true}
          number={floorData?.number_of_devices}
          onFocus={() => {
            setStatusFilter('device');
            setFocus(<DeviceList scope={DeviceScope.FLOOR} scope_id={floor_id} onScroll={onScroll} />);
          }}
        />
        <TabButton
          isClicked={status === 'tenant'}
          name='Khách thuê'
          displayNumber={true}
          number={floorData?.number_of_tenants}
          onFocus={() => {
            setStatusFilter('tenant');
            setFocus(<TenantList data={[]} onScroll={onScroll} />);
          }}
        />
      </TabView>
      <SearchBar placeholder={placeholder} value={search} />

        {focus}
        

      {status === 'room' && (
        <AnimatedFAB
          icon={'plus'}
          label={label}
          extended={isExtended}
          onPress={() => {
            navigation.navigate(RootScreens.CREATE_ROOM as never);
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
