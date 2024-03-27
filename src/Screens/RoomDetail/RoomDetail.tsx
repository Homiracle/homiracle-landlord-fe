import React, { useEffect } from 'react';
import { View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import {
  TabView,
  Header,
  TabButton,
  DeviceList,
  TenantList,
} from '../../Components';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RoomDetailComponent } from '../../Components/Room/RoomDetailComponent';
import { Room as RoomProps, useGetRoomQuery } from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getRoomId } from '../../Store/reducers';

export const RoomDetail = () => {
  const navigation = useNavigation();
  //hooks
  const [status, setStatus] = React.useState('info');
  const setStatusFilter = (status: string) => {
    setStatus(status);
  };
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      marginTop: hp(5),
      flexDirection: 'column',
      gap: hp(2),
      position: 'relative',
    },
  });
  const [focus, setFocus] = React.useState(<RoomDetailComponent data={[]}/>);
  const room_id = useAppSelector(getRoomId) as string;
  const { data: roomData, isSuccess: isRoomSuccess } = useGetRoomQuery(room_id);

  useEffect(() => {
    if (isRoomSuccess) {
      setFocus(<RoomDetailComponent data={roomData} />);
      console.log('Room Data:', roomData);
    }
  }, [isRoomSuccess, roomData]);

  return (
    <View style={styles.container}>
      <Header
        title={'Chi tiết phòng ' + room_id}
        height={8}
        scroll='vertical'
        mode='center-aligned'
        onBack={() => navigation.navigate(RootScreens.FLOORDETAIL as never)}
      >
        <View style={styles.content}>
          <TabView>
            <TabButton
              isClicked={status === 'info'}
              name='Thông tin'
              displayNumber={false}
              onFocus={() => {
                setStatusFilter('info');
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
                setFocus(<DeviceList />);
              }}
            />
            <TabButton
              isClicked={status === 'tenant'}
              name='Khách thuê'
              number={roomData?.number_of_tenants}
              displayNumber={true}
              onFocus={() => {
                setStatusFilter('tenant');
                setFocus(<TenantList />);
              }}
            />
          </TabView>
        </View>
        {focus}
      </Header>
    </View>
  );
};
