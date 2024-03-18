import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  RoomingHouse as RoomingHouseProps,
  useCreateRoomingHouseMutation,
} from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { selectUserId } from '../../Store/reducers';

const province = [
  { id: 1, name: 'Hà Nội' },
  { id: 2, name: 'TP. Hồ Chí Minh' },
];
const district = [
  { id: 1, name: 'Quận Ba Đình' },
  { id: 2, name: 'Quận 10' },
];
const commune = [
  { id: 1, name: 'Phường A' },
  { id: 2, name: 'Phường B' },
];

export const CreateRoomingHouse = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);
  const [datetimePicker, showDatetimePicker] = React.useState({
    openingHour: false,
    closingHour: false,
  });
  const pickerRef = React.useRef(null);
  const [roomingHouseData, setRoomingHouseData] =
    React.useState<RoomingHouseProps>({
      name: '',
      opening_hour: '',
      closing_hour: '',
      number_of_period_days: 0,
      closing_money_date: 0,
      start_receiving_money_date: 0,
      end_receiving_money_date: 0,
      landlord: {
        user_id: useAppSelector(selectUserId) as unknown as string | '',
      },
      address: {
        province: '',
        district: '',
        commune: '',
        street: '',
      },
      reference_cost: {
        deposit: 0,
        water_cost: 0,
        power_cost: 0,
        cost_per_person: 0,
        cost_per_room: 0,
      },
    });

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
    },
    textInput: {
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 1,
      paddingVertical: hp(0.5),
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
  });

  // const pickerOpen = () => {
  //   (pickerRef.current as any)?.focus();
  // };
  // const pickerClose = () => {
  //   (pickerRef.current as any)?.blur();
  // };

  const onBack = () => {
    showBackDialog(true);
    console.log('back');
  };

  // console.log(useAppSelector(state => state.user));

  const handleInputChange = (
    fieldName: string,
    text: string | number,
    nestedField?: string,
  ) => {
    // console.log(fieldName, text);
    setRoomingHouseData(prevData => {
      if (nestedField) {
        return {
          ...prevData,
          [fieldName]: {
            ...prevData[fieldName],
            [nestedField]: text,
          },
        };
      }
      return {
        ...prevData,
        [fieldName]: text,
      };
    });
  };

  const [createRoomingHouse, { data, error, isSuccess, isLoading, isError }] =
    useCreateRoomingHouseMutation();

  const handleSubmit = async () => {
    console.log(roomingHouseData);
    await createRoomingHouse(roomingHouseData as Partial<RoomingHouseProps>);
    if (isSuccess) {
      console.log(error);
    } else if (isError) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      {(datetimePicker.closingHour || datetimePicker.openingHour) && (
        <DateTimePicker
          value={new Date()}
          mode='time'
          is24Hour={true}
          display='spinner'
          // onTouchCancel={}
          onChange={(event, selectedDate) => {
            if (datetimePicker.closingHour) {
              showDatetimePicker({ ...datetimePicker, closingHour: false });
              if (selectedDate) {
                handleInputChange(
                  'closing_hour',
                  moment(selectedDate).format('HH:mm'),
                );
              }
            } else if (datetimePicker.openingHour) {
              showDatetimePicker({ ...datetimePicker, openingHour: false });
              if (selectedDate) {
                handleInputChange(
                  'opening_hour',
                  moment(selectedDate).format('HH:mm'),
                );
              }
            }
          }}
        />
      )}
      <Portal>
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
          title='Hủy tạo nhà trọ'
          content='Bạn có muốn hủy tạo nhà trọ không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => {
            showCancelDialog(false);
            navigation.goBack();
          }}
        />
      </Portal>
      <Header
        title='Tạo nhà trọ'
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
                <Text style={styles.subTitle}>Tên tòa nhà</Text>
                <TextInput
                  placeholder='Nhập tên tòa nhà'
                  style={styles.textInput}
                  onChangeText={text => handleInputChange('name', text)}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Tỉnh/Thành phố</Text>
                <Picker
                  ref={pickerRef}
                  selectedValue={
                    province.find(
                      province =>
                        province.name === roomingHouseData.address.province,
                    )?.id || province[0].id
                  }
                  onValueChange={itemValue =>
                    handleInputChange(
                      'address',
                      province[itemValue - 1].name,
                      'province',
                    )
                  }
                  mode='dialog'
                >
                  {province.map(item => {
                    return (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Quận/Huyện</Text>
                  <Picker
                    ref={pickerRef}
                    selectedValue={
                      district.find(
                        district =>
                          district.name === roomingHouseData.address.district,
                      )?.id || district[0].id
                    }
                    onValueChange={(itemValue: number) =>
                      handleInputChange(
                        'address',
                        district[itemValue - 1].name,
                        'district',
                      )
                    }
                    mode='dialog'
                  >
                    {district.map(item => {
                      return (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Phường/Xã</Text>
                  <Picker
                    ref={pickerRef}
                    selectedValue={
                      commune.find(
                        commune =>
                          commune.name === roomingHouseData.address.commune,
                      )?.id || commune[0].id
                    }
                    onValueChange={itemValue =>
                      handleInputChange(
                        'address',
                        commune[itemValue - 1].name,
                        'commune',
                      )
                    }
                    mode='dialog'
                  >
                    {commune.map(item => {
                      return (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Địa chỉ</Text>
                <TextInput
                  placeholder='Nhập địa chỉ'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('address', text, 'street')
                  }
                />
              </View>
            </View>
          </Surface>
          <Surface style={styles.surface}>
            <Text style={[theme.fonts.titleMedium, styles.title]}>
              Chi phí tham khảo
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
                <Text style={styles.subTitle}>Tiền cọc tham khảo</Text>
                <TextInput
                  placeholder='Nhập tiền cọc tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('reference_cost', text, 'deposit')
                  }
                  keyboardType='numeric'
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá phòng tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá phòng tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('reference_cost', text, 'cost_per_room')
                  }
                  keyboardType='numeric'
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá điện tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá điện tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('reference_cost', text, 'power_cost')
                  }
                  keyboardType='numeric'
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá nước tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá nước tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('reference_cost', text, 'water_cost')
                  }
                  keyboardType='numeric'
                />
              </View>
              {/* <View>
                <Text style={styles.subTitle}>Phí dịch vụ chung cho phòng</Text>
              </View>
              <View>
                <Text style={styles.subTitle}>Phí dịch vụ theo đầu người</Text>
              </View> */}
            </View>
          </Surface>
          <Surface style={styles.surface}>
            <Text style={[theme.fonts.titleMedium, styles.title]}>
              Thông tin quản lý
            </Text>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                gap: hp(2),
                marginTop: hp(1),
              }}
            >
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Giờ mở cửa</Text>
                  <Pressable
                    onPress={() =>
                      showDatetimePicker({
                        ...datetimePicker,
                        openingHour: true,
                      })
                    }
                  >
                    <TextInput
                      placeholder='05:00'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('opening_hour', text)
                      }
                      showSoftInputOnFocus
                      value={roomingHouseData.opening_hour}
                      editable={false}
                    />
                  </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Giờ đóng cửa</Text>
                  <Pressable
                    onPress={() =>
                      showDatetimePicker({
                        ...datetimePicker,
                        closingHour: true,
                      })
                    }
                  >
                    <TextInput
                      placeholder='23:00'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('closing_hour', text)
                      }
                      showSoftInputOnFocus
                      value={roomingHouseData.closing_hour}
                      editable={false}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày chốt tiền</Text>
                  <TextInput
                    placeholder='31'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('closing_money_date', text)
                    }
                    keyboardType='numeric'
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Số ngày báo trước</Text>
                  <TextInput
                    placeholder='5'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('number_of_period_days', text)
                    }
                    keyboardType='numeric'
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày bắt đầu nộp tiền</Text>
                  <TextInput
                    placeholder='1'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('start_receiving_money_date', text)
                    }
                    keyboardType='numeric'
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày hết hạn nộp tiền</Text>
                  <TextInput
                    placeholder='10'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('end_receiving_money_date', text)
                    }
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>
          </Surface>
          {/* <Surface style={styles.surface}>
            <Text style={[theme.fonts.titleMedium, styles.title]}>
              Quy định chung của nhà trọ
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
                <Text style={styles.subTitle}>Điều 1</Text>
                <TextInput
                  placeholder='Không nuôi thú cưng'
                  style={styles.textInput}
                />
              </View>
            </View>
          </Surface> */}
        </View>
        <View style={styles.buttonContainer}>
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
          >
            Tạo nhà trọ
          </Button>
        </View>
      </Header>
    </View>
  );
};
