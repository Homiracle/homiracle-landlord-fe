import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog, HouseItem } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';
import { Dropdown } from 'react-native-searchable-dropdown-kj';

import { CreateDevice as DeviceProps } from '../../Services/devices/type/create-device.type';
import {
  getHouseId,
  getFloorId,
  getRoomId,
  selectUserId,
} from '../../Store/reducers';
// import { contractFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';
import {
  useConnectDeviceMutation,
  useGetDeviceQuery,
} from '../../Services/devices';
import { DeviceType } from '../../Constants/DeviceType';
import { Props as CreateDeviceProps } from './DeviceDetailContainer';

const deviceType = [
  { id: 1, type: DeviceType.CAMERA, name: 'Camera' },
  { id: 2, type: DeviceType.LIGHT, name: 'Đèn' },
  { id: 3, type: DeviceType.FAN, name: 'Quạt' },
  { id: 4, type: DeviceType.HUMIDTY_SENSOR, name: 'Cảm biến độ ẩm' },
  { id: 5, type: DeviceType.TEMPERATURE_SENSOR, name: 'Cảm biến nhiệt độ' },
];

export const DeviceDetail = ({ route, navigation }: CreateDeviceProps) => {
  // styles
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      gap: hp(2),
    },
    surface: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.onPrimary,
      marginHorizontal: wp(2),
      borderRadius: wp(2),
      width: wp(96),
      paddingHorizontal: wp(4),
      paddingTop: hp(1),
      paddingBottom: hp(2),
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    subTitle: {
      fontWeight: 'bold',
      marginTop: hp(1),
    },
    textInput: {
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 1,
      paddingVertical: hp(0.5),
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: wp(2),
      marginVertical: hp(2),
      gap: wp(2),
    },
    button: {
      borderRadius: wp(2),
      flex: 1,
      height: hp(6),
      justifyContent: 'center',
    },
    dropdown: {
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 1,
    },
    placeholderStyle: [
      theme.fonts.bodyMedium,
      {
        opacity: 0.5,
      },
    ] as TextStyle,
    goodText: {
      color: 'green',
    },
    badText: {
      color: 'red',
    },
    tenantButton: {
      backgroundColor: theme.colors.primary,
      maxWidth: wp(90),
    },
    connect: {
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      width: wp(30),
    },
  });

  const device_id = route.params?.device_id || '';

  const { data: deviceData, error } = useGetDeviceQuery(device_id);

  useEffect(() => {
    if (deviceData) console.log(deviceData);
    else if (error) console.log(error);
  }, [deviceData, error]);

  const onBack = () => {
    navigation.goBack();
  };

  const [
    connectDevice,
    {
      isSuccess: connectSuccess,
      isLoading: connectLoading,
      error: connectError,
    },
  ] = useConnectDeviceMutation();

  const handleConnect = () => {
    connectDevice(device_id);
  };

  useEffect(() => {
    if (connectSuccess) {
      navigation.goBack();
    } else if (connectError) {
      console.log(connectError);
    }
  }, [connectSuccess, connectError]);

  return (
    <View style={styles.container}>
      {/* <Portal>
        <CustomDialog
          visible={backDialog}
          title='Thoát'
          content='Bạn có muốn thoát không?'
          onDismiss={() => showBackDialog(false)}
          onConfirm={() => {
            showBackDialog(false);
            navigation.goBack();
          }}
        />
      </Portal>
      <Portal>
        <CustomDialog
          visible={cancelDialog}
          title='Hủy thêm thiết bị'
          content='Bạn có muốn hủy việc thêm thiết bị không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => {
            showCancelDialog(false);
            navigation.goBack();
          }}
        />
      </Portal> */}
      <Header
        title='Thông tin thiết bị'
        height={hp(8)}
        mode='center-aligned'
        onBack={onBack}
        scroll='vertical'
      >
        <View style={styles.content}>
          <Surface style={styles.surface}>
            <Text style={[theme.fonts.titleMedium, styles.title]}>
              Thông tin chung
            </Text>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                gap: hp(2),
                marginTop: hp(1),
              }}
            >
              <View>
                <Text style={styles.subTitle}>Vị trí thiết bị</Text>
                <TextInput
                  placeholder='Nhà test-tầng 1-phòng 2'
                  style={styles.textInput}
                  value='Nhà test-tầng 1-phòng 2'
                  editable={false}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Tên thiết bị</Text>
                <TextInput
                  placeholder='Nhập tên thiết bị'
                  style={styles.textInput}
                  editable={false}
                  value={deviceData?.name || ''}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Loại thiết bị</Text>
                <TextInput
                  placeholder='Loại thiết bị'
                  style={styles.textInput}
                  editable={false}
                  value={deviceData?.type || ''}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Thiết bị được kết nối</Text>
                <TextInput
                  style={styles.textInput}
                  editable={false}
                  value={deviceData?.status || ''}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>ID thiết bị</Text>
                <TextInput
                  style={styles.textInput}
                  editable={false}
                  value={device_id}
                />
              </View>
            </View>
          </Surface>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: wp(10),
              // marginVertical: hp(2),
            }}
          >
            {deviceData?.status === 'connected' && (
              <></>
            )}
            {deviceData?.status === 'disconnected' && (
              <Button
                mode='outlined'
                style={styles.connect}
                onPress={handleConnect}
                loading={connectLoading}
              >
                Kết nối
              </Button>
            )}
          </View>
        </View>
        {/* <View style={styles.buttonContainer}>
          <Button
            buttonColor={theme.colors.error}
            textColor={theme.colors.onPrimary}
            style={styles.button}
            onPress={() => {
              showCancelDialog(true);
            }}
          >
            Hủy
          </Button>
          <Button
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            style={styles.button}
            onPress={handleSubmit}
            disabled={!formik.isValid}
          >
            Thêm thiết bị
          </Button>
        </View> */}
      </Header>
    </View>
  );
};
