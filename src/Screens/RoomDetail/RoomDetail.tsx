import React, { useEffect} from 'react';
import { View,ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import {
  TabView,
  Header,
  TabButton,
  DeviceList,
  TenantList,
  
} from '../../Components';
import { StyleSheet, NativeScrollEvent } from 'react-native';
import { Button, AnimatedFAB } from 'react-native-paper';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RoomDetailComponent } from '../../Components/Room/RoomDetailComponent';
import { Room as RoomProps, useGetRoomQuery, useGetContractListQuery } from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getRoomId, getFloorId, getHouseId } from '../../Store/reducers';
import { ContractList } from '../../Components/Contract/ContractList';
export const RoomDetail = () => {
  const navigation = useNavigation();
  //hooks
  const [status, setStatus] = React.useState('info');
  const [label, setLabel] = React.useState('Thêm hợp đồng');
  const setStatusFilter = (status: string) => {
    setStatus(status);
  };
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
    },
    content: {
    },
    fabStyle: {
      position: 'absolute',
      bottom: hp(2),
      right: wp(4),
      backgroundColor: theme.colors.primary,
    },
  });
  const [focus, setFocus] = React.useState(<RoomDetailComponent data={[]}/>);
  const room_id = useAppSelector(getRoomId) as string;
  const house_id = useAppSelector(getHouseId) as string;
  const floor_id = useAppSelector(getFloorId) as string;
  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const { data: roomData, isSuccess: isRoomSuccess } = useGetRoomQuery(room_id);

  useEffect(() => {
    if (isRoomSuccess) {
      setFocus(<RoomDetailComponent data={roomData} />);
      console.log('Room Data:', roomData);
    }
  }, [isRoomSuccess, roomData]);
  const {
    data: contractsData,
    isSuccess: isFloorsSuccess,
    isError: isFloorsError,
  } = useGetContractListQuery({house_id,floor_id, room_id});
  return (
    <View style={styles.container}>
      <Header
        title={'Chi tiết phòng ' + room_id}
        height={8}
        mode='center-aligned'
        onBack={() => navigation.navigate(RootScreens.FLOORDETAIL as never)}
      />
       <View>
          <TabView>
            <TabButton
              isClicked={status === 'info'}
              name='Thông tin'
              displayNumber={false}
              onFocus={() => {
                setStatusFilter('info');
                setLabel('Thêm hợp đồng');
                setFocus(<RoomDetailComponent data={roomData}/>);
              }}
            />
            <TabButton
              isClicked={status === 'device'}
              name='Thiết bị'
              number={12}
              displayNumber={true}
              onFocus={() => {
                setStatusFilter('device');
                setLabel('Thêm thiết bị');
                setFocus(<DeviceList data={[]} />);
              }}
            />
            <TabButton
              isClicked={status === 'tenant'}
              name='Khách thuê'
              number={roomData?.number_of_tenants}
              displayNumber={true}
              onFocus={() => {
                setStatusFilter('tenant');
                setFocus(<TenantList data={[]} />);
                setLabel('Thêm khách thuê');
              }}
            />
          </TabView>
          </View>
          {focus}
          {status === 'info' && (
            <ContractList data={contractsData} />
          )}
          {status !== 'tenant' && (
        <AnimatedFAB
          icon={'plus'}
          label={label}
          extended={isExtended}
          onPress={() => {
            navigation.navigate(RootScreens.CREATE_CONTRACT as never);
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
