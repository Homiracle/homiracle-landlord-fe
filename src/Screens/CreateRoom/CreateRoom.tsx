import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Alert, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';
import { Room as RoomProps, useCreateRoomMutation } from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getHouseId, getFloorId, getFloor } from '../../Store/reducers';
import { roomFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';
import { toVietnamCurrency, parseVietnamCurrency } from '../../Utils';
export const CreateRoom = () => {
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
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);
  const [roomData, setroomData] = React.useState<RoomProps>({
    name: '',
    number_of_bathroom: 0,
    number_of_bedroom: 0,
    acreage: 0,
    max_number_of_tenant: 0,
    floor: {
      floor_id: useAppSelector(getFloorId),
    },
    rooming_house: {
      rooming_house_id: useAppSelector(getHouseId)},
    reference_cost: {
      deposit: useAppSelector(getFloor)?.deposit ?? 0,
      room_cost: useAppSelector(getFloor)?.room_cost ?? 0,
      water_cost: useAppSelector(getFloor)?.water_cost ?? 0,
      power_cost: useAppSelector(getFloor)?.power_cost ?? 0,
      // cost_per_person: 0,
      // cost_per_room: 0,
    },

  });
 
  const [createRoom, { data, error, isSuccess, isLoading, isError }] =
    useCreateRoomMutation();

  const formik = useFormik({
    initialValues: roomData,
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
  ) => {
    console.log(fieldName, text);
    if (nestedField) {
      setroomData(prevData => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedField]: text,
        },
      }));
      formik.handleChange(`${fieldName}.${nestedField}`)(String(text));
    } else {
      setroomData(prevData => ({
        ...prevData,
        [fieldName]: text,
      }));
      formik.handleChange(fieldName)(String(text));
    }
  };

  const handleSubmit = async () => {
    console.log(roomData);
    await createRoom(roomData as Partial<RoomProps>);
  };
  useEffect(() => {
    if (isSuccess) {
      Alert.alert('Tạo phòng thành công');
      console.log('Create room success:', data);
      navigation.goBack();
    }
    if (isError) {
      Alert.alert('Lỗi khi tạo phòng', error as string);
      console.log('Create room error:', error);
    }
  }, [isSuccess, isError, data, error]);

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

  console.log(formik.touched);
  console.log(formik.errors);

  // console.log(formik.isValid);
  const [formattedValues, setFormattedValues] = React.useState({
    deposit: toVietnamCurrency(roomData?.reference_cost?.deposit || ''),
    room_cost: toVietnamCurrency(roomData?.reference_cost?.room_cost || ''),
    water_cost: toVietnamCurrency(roomData?.reference_cost?.water_cost || ''),
    power_cost: toVietnamCurrency(roomData?.reference_cost?.power_cost || ''),
  });
  return (
    <View style={styles.container}>
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
          title='Hủy tạo phòng'
          content='Bạn có muốn hủy tạo phòng không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => {
            showCancelDialog(false);
            navigation.goBack();
          }}
        />
      </Portal>
      <Header
        title='Tạo phòng'
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
                <Text style={styles.subTitle}>Tên phòng</Text>
                <TextInput
                  placeholder='Nhập tên phòng'
                  style={styles.textInput}
                  onChangeText={text => handleInputChange('name', text)}
                  onBlur={() => onBlur('name')}
                />
                {isTouched('name') ? (
                  <Text style={styles.badText}>{formik.errors.name}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.subTitle}>Diện tích</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder='2'
                    style={[styles.textInput, { flex: 1 }]}
                    onChangeText={text => handleInputChange('acreage', text)}
                    onBlur={() => onBlur('acreage')}
                    keyboardType='numeric'
                  />
                  <TextInput
                    placeholder='(đơn vị: m2)'
                    style={[styles.textInput]}
                    editable={false}
                  />
                </View>
                {isTouched('acreage') ? (
                  <Text style={styles.badText}>{formik.errors.acreage}</Text>
                ) : null}
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Số phòng ngủ</Text>
                  <TextInput
                    placeholder='1'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('number_of_bedroom', text)
                    }
                    onBlur={() => onBlur('number_of_bedroom')}
                    keyboardType='numeric'
                  />
                  {isTouched('number_of_bedroom') ? (
                    <Text style={styles.badText}>
                      {formik.errors.number_of_bedroom}
                    </Text>
                  ) : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Số phòng tắm</Text>
                  <TextInput
                    placeholder='1'
                    style={styles.textInput}
                    onChangeText={text =>
                      handleInputChange('number_of_bathroom', text)
                    }
                    onBlur={() => onBlur('number_of_bathroom')}
                    keyboardType='numeric'
                  />
                  {isTouched('number_of_bathroom') ? (
                    <Text style={styles.badText}>
                      {formik.errors.number_of_bathroom}
                    </Text>
                  ) : null}
                </View>
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
                <Text style={styles.subTitle}>Tiền cọc tham khảo (Đơn vị VND)</Text>
                <TextInput
                  placeholder='Nhập tiền cọc tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>{
                    const numericValue = parseVietnamCurrency(text);
                    handleInputChange('reference_cost', numericValue, 'deposit')
                    setFormattedValues(prevState => ({
                      ...prevState,
                      deposit: toVietnamCurrency(numericValue)
                    }));
                  }
                  }
                  keyboardType='numeric'
                  onBlur={() => onBlur('reference_cost', 'deposit')}
                  value={String(formattedValues['deposit'])}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá phòng tham khảo (Đơn vị VND)</Text>
                <TextInput
                  placeholder='Nhập giá phòng tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>{
                    const numericValue = parseVietnamCurrency(text);
                    handleInputChange('reference_cost', numericValue, 'room_cost')
                    setFormattedValues(prevState => ({
                      ...prevState,
                      room_cost: toVietnamCurrency(numericValue)
                    }));
                  }
                    
                  }
                  keyboardType='numeric'
                  onBlur={() => onBlur('reference_cost', 'room_cost')}
                  value={String(formattedValues['room_cost'])}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá điện tham khảo (Đơn vị VND/ kWh)</Text>
                <TextInput
                  placeholder='Nhập giá điện tham khảo'
                  style={styles.textInput}
                  onChangeText={text =>{
                    const numericValue = parseVietnamCurrency(text);
                    handleInputChange('reference_cost', numericValue, 'power_cost')
                    setFormattedValues(prevState => ({
                      ...prevState,
                      power_cost: toVietnamCurrency(numericValue)
                    }));
                  }
                  }
                  keyboardType='numeric'
                  onBlur={() => onBlur('reference_cost', 'power_cost')}
                  value={String(formattedValues['power_cost'])}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá nước tham khảo (Đơn vị VND/m{`\u00B3`})</Text>
                <TextInput
                  placeholder='Nhập giá nước tham khảo'
                  style={styles.textInput}
                  onChangeText={text => {
                    const numericValue = parseVietnamCurrency(text);
                    handleInputChange('reference_cost', numericValue, 'water_cost')
                    setFormattedValues(prevState => ({
                      ...prevState,
                      water_cost: toVietnamCurrency(numericValue)
                    }));
                  }
                   
                  }
                  keyboardType='numeric'
                  onBlur={() => onBlur('reference_cost', 'water_cost')}
                  value={String(formattedValues['water_cost'])}
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
                <Text style={styles.subTitle}>Số người ở tối đa</Text>
                <TextInput
                  placeholder='4'
                  style={styles.textInput}
                  onChangeText={text =>
                    handleInputChange('max_number_of_tenant', text)
                  }
                  onBlur={() => onBlur('max_number_of_tenant')}
                  keyboardType='numeric'
                />
                {isTouched('max_number_of_tenant') ? (
                  <Text style={styles.badText}>
                    {formik.errors.max_number_of_tenant}
                  </Text>
                ) : null}
              </View>
            </View>
          </Surface>
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
            loading={isLoading}
            disabled={!formik.isValid || isLoading}
          >
            Tạo phòng
          </Button>
        </View>
      </Header>
    </View>
  );
};
