import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog, HouseItem } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Pressable, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useCreateContractMutation } from '../../Services';

import {CreateDevice as CreateDeviceProps } from '../../Services/devices/type/create-device.type';
import { useAppSelector } from '../../Store/hook';
import { getHouseId, selectUserId } from '../../Store/reducers';
// import { contractFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';
import { useCreateDeviceMutation } from '../../Services/devices';

const deviceType = [
    { id: 1, type: 'bóng đèn' },
    { id: 2, type: 'cảm biến nhiệt độ' },
  ];

export const CreateDevice = () => {
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
      marginTop:hp(1),
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
    tenantButton:{
      backgroundColor: theme.colors.primary,
      maxWidth: wp(90),
    }
  });

  // other hooks
  const navigation = useNavigation();
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);
  const [datetimePicker, showDatetimePicker] = React.useState({
    openingHour: false,
    closingHour: false,
    feeDay: false,
  });
  const [deviceData, setDeviceData] =
    React.useState<CreateDeviceProps>({
      name: '',
      type: '',
    });

  const [CreateDevice, { data, error, isSuccess, isLoading, isError }] =
    useCreateDeviceMutation();

  const formik = useFormik({
    initialValues: deviceData,
    // validationSchema: schema,
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
    // console.log(fieldName, text);

    setDeviceData(prevData => ({
        ...prevData,
        [fieldName]: text,
      }));
      formik.handleChange(fieldName)(String(text));
    }

  const handleSubmit = async () => {
    console.log();
    await CreateDevice(deviceData as Partial<CreateDeviceProps>);
  };

  const isTouched = (field: string) => {
      return formik.touched[field] && formik.errors[field];
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
          title='Hủy thêm thiết bị'
          content='Bạn có muốn hủy việc thêm thiết bị không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => {
            showCancelDialog(false);
            navigation.goBack();
          }}
        />
      </Portal>
      <Header
        title='Thêm thiết bị '
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
                  onChangeText={text => handleInputChange('name', text)}
                  onBlur={() => onBlur('name')}
                />
                {isTouched('name') ? (
                  <Text style={styles.badText}>{formik.errors.name}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.subTitle}>Tên thiết bị</Text>
                <TextInput
                  placeholder='Nhập tên thiết bị'
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
                  data={deviceType}
                  labelField='type'
                  valueField='id'
                  onChange={item =>
                    handleInputChange('type', item.type)
                  }
                  placeholder='Chọn loại thiết bị'
                  search
                  searchPlaceholder='Tìm loại thiết bị'
                  onBlur={() => onBlur('type')}
                />
                {isTouched('type') ? (
                  <Text style={styles.badText}>
                    {formik.errors.type}
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
            disabled={!formik.isValid}
          >
            Thêm thiết bị
          </Button>
        </View>
      </Header>
    </View>
  );
};
