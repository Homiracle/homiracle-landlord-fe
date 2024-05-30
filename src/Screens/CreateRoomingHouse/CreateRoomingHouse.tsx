import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Pressable, StyleSheet, TextInput, TextStyle, Alert } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useCreateRoomingHouseMutation, useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from '../../Services';
import { RoomingHouse as RoomingHouseProps } from '../../Services/rooming-houses/interface';
import { useAppSelector } from '../../Store/hook';
import { selectUserId } from '../../Store/reducers';
import { roomingHouseFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';

export const CreateRoomingHouse = () => {
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
  });

  // other hooks
  const navigation = useNavigation();
  const [province, setProvince] = React.useState<{id: string, name: string}[]>([]);
  const [district, setDistrict] = React.useState<{id: string, name: string}[]>([]);
  const [commune, setCommune] = React.useState<{id: string, name: string}[]>([]);
  const [currentProvince, setCurrentProvince] = React.useState<string>('');
  const [currentDistrict, setCurrentDistrict] = React.useState<string>('');
  const [currentCommune, setCurrentCommune] = React.useState<string>('');
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);
  const [datetimePicker, showDatetimePicker] = React.useState({
    openingHour: false,
    closingHour: false,
  });
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
        room_cost: 0,
        water_cost: 0,
        power_cost: 0,
        // cost_per_person: 0,
        // cost_per_room: 0,
      },
    });

  const { data: provinceData } = useGetProvincesQuery({});
  const { data: districtData } = useGetDistrictsQuery(currentProvince);
  const { data: communeData } = useGetWardsQuery(currentDistrict);

  useEffect(() => {
    if (provinceData) {
      setProvince(provinceData);
    }
  }, [provinceData]);

  useEffect(() => {
    if (districtData) {
      setDistrict(districtData);
    }
  }, [districtData]);

  useEffect(() => {
    if (communeData) {
      setCommune(communeData);
    }
  }, [communeData]);

  const [createRoomingHouse, { data, error, isSuccess, isLoading, isError: isCreateError }] =
    useCreateRoomingHouseMutation();

  const formik = useFormik({
    initialValues: roomingHouseData,
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const onBack = () => {
    showBackDialog(true);
    console.log('back');
  };

  // console.log(useAppSelector(state => state.user));

  const handleInputChange = (
    fieldName: string,
    text: string | number,
    nestedField?: string,
    id?: string,
  ) => {
    // console.log(fieldName, text);
    if (nestedField) {
      setRoomingHouseData(prevData => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedField]: text,
        },
      }));
      if (nestedField === 'province') {
        setCurrentProvince(id as string);
      } else if (nestedField === 'district') {
        setCurrentDistrict(id as string);
      } else if (nestedField === 'commune') {
        setCurrentCommune(id as string);
      }
      formik.handleChange(`${fieldName}.${nestedField}`)(String(text));
    } else {
      setRoomingHouseData(prevData => ({
        ...prevData,
        [fieldName]: text,
      }));
      formik.handleChange(fieldName)(String(text));
    }
  };

  const handleSubmit = async () => {
    console.log(roomingHouseData);
    await createRoomingHouse(roomingHouseData as Partial<RoomingHouseProps>);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('Create rooming house success');
      Alert.alert('Tạo nhà trọ thành công');
      navigation.goBack();
    } else if (isCreateError) {
      Alert.alert("Lỗi", error as string)
      console.log(error);
    }
  }, [isSuccess, isCreateError]);
  const isTouched = (field: string, nestedField?: string) => {
    if (nestedField) {
      return (
        formik.touched[field as keyof typeof formik.touched]?.[
          nestedField as keyof (typeof formik.touched)[typeof field]
        ] &&
        formik.errors[field as keyof typeof formik.errors]?.[
          nestedField as keyof (typeof formik.errors)[typeof field]
        ]
      );
    } else {
      return formik.touched[field] && formik.errors[field];
    }
  };

  const onBlur = (field: string, nestedField?: string) => {
    if (nestedField) {
      return formik.setFieldTouched(field, {
        ...(formik.touched[field] as any),
        [nestedField]: true,
      });
    } else {
      return formik.setFieldTouched(field, true);
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
                  onBlur={() => onBlur('name')}
                />
                {isTouched('name') ? (
                  <Text style={styles.badText}>{formik.errors.name}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.subTitle}>Tỉnh/Thành phố</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  data={province}
                  labelField='name'
                  valueField='id'
                  onChange={item =>
                    handleInputChange('address', item.name, 'province', item.id)
                  }
                  placeholder='Chọn tỉnh/thành phố'
                  search
                  searchPlaceholder='Tìm tỉnh/thành phố'
                  onBlur={() => onBlur('address', 'province')}
                />
                {isTouched('address', 'province') ? (
                  <Text style={styles.badText}>
                    {formik.errors.address?.province}
                  </Text>
                ) : null}
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Quận/Huyện</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    data={district}
                    labelField='name'
                    valueField='id'
                    onChange={item =>
                      handleInputChange('address', item.name, 'district', item.id)
                    }
                    placeholder='Chọn quận/huyện'
                    search
                    searchPlaceholder='Tìm quận/huyện'
                    onBlur={() => onBlur('address', 'district')}
                  />
                  {isTouched('address', 'district') ? (
                    <Text style={styles.badText}>
                      {formik.errors.address?.district}
                    </Text>
                  ) : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Phường/Xã</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    data={commune}
                    labelField='name'
                    valueField='id'
                    onChange={item =>
                      handleInputChange('address', item.name, 'commune', item.id)
                    }
                    placeholder='Chọn phường/xã'
                    search
                    searchPlaceholder='Tìm phường/xã'
                    onBlur={() => onBlur('address', 'commune')}
                  />
                  {isTouched('address', 'commune') ? (
                    <Text style={styles.badText}>
                      {formik.errors.address?.commune}
                    </Text>
                  ) : null}
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
                  onBlur={() => onBlur('address', 'street')}
                />
                {isTouched('address', 'street') ? (
                  <Text style={styles.badText}>
                    {formik.errors.address?.street}
                  </Text>
                ) : null}
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
                  onBlur={() => onBlur('reference_cost', 'deposit')}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá phòng tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá phòng tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('reference_cost', text, 'room_cost')
                  }
                  keyboardType='numeric'
                  onBlur={() => onBlur('reference_cost', 'room_cost')}
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
                  onBlur={() => onBlur('reference_cost', 'power_cost')}
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
                  onBlur={() => onBlur('reference_cost', 'water_cost')}
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
                      onBlur={() => onBlur('opening_hour')}
                    />
                  </Pressable>
                  {isTouched('opening_hour') ? (
                    <Text style={styles.badText}>
                      {formik.errors.opening_hour}
                    </Text>
                  ) : null}
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
                      onBlur={() => onBlur('closing_hour')}
                    />
                  </Pressable>
                  {isTouched('closing_hour') ? (
                    <Text style={styles.badText}>
                      {formik.errors.closing_hour}
                    </Text>
                  ) : null}
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
                    onBlur={() => onBlur('closing_money_date')}
                  />
                  {isTouched('closing_money_date') ? (
                    <Text style={styles.badText}>
                      {formik.errors.closing_money_date}
                    </Text>
                  ) : null}
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
                    onBlur={() => onBlur('number_of_period_days')}
                  />
                  {isTouched('number_of_period_days') ? (
                    <Text style={styles.badText}>
                      {formik.errors.number_of_period_days}
                    </Text>
                  ) : null}
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
                    onBlur={() => onBlur('start_receiving_money_date')}
                  />
                  {isTouched('start_receiving_money_date') ? (
                    <Text style={styles.badText}>
                      {formik.errors.start_receiving_money_date}
                    </Text>
                  ) : null}
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
                    onBlur={() => onBlur('end_receiving_money_date')}
                  />
                  {isTouched('end_receiving_money_date') ? (
                    <Text style={styles.badText}>
                      {formik.errors.end_receiving_money_date}
                    </Text>
                  ) : null}
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
            disabled={!formik.isValid}
          >
            Tạo nhà trọ
          </Button>
        </View>
      </Header>
    </View>
  );
};
