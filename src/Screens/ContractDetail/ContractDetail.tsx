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
import { ContractDetailsNavigationProp } from './ContractDetailContainer';
import {Contract as ContractProps } from '../../Services/contract/interface';
import { useAppSelector } from '../../Store/hook';
import { getHouseId, selectUserId } from '../../Store/reducers';
import { contractFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';
import { selectUser } from '../../Store/reducers';
import { RootScreens } from '../../Constants/RootScreen';

export const ContractDetail = ({
  navigation,
}:{navigation: ContractDetailsNavigationProp}) => {
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
      borderRadius: wp(2),
      width: wp(96),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // other hooks
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);
  const [datetimePicker, showDatetimePicker] = React.useState({
    startDate: false,
    endDate: false,
    feeDay: false,
  });
  const [contractData, setContractData] =
    React.useState<ContractProps>({
      house_id: Number(useAppSelector(getHouseId)),
      floor_id: Number(useAppSelector(getHouseId)),
      room_id: Number(useAppSelector(getHouseId)),
      start_date: '',
      end_date: '',
      couting_fee_day: '',
      paying_cost_cycle: '',
      maximmum_number_of_people: 4,
      reference_cost: {
          deposit: 0,
          room_cost: 0,
          water_cost: 8,
          power_cost: 0,
          cost_per_person: 0,
          cost_per_room: 0,
        },
        tenant_id: '',
    });

  
  const formik = useFormik({
    initialValues: contractData,
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
    // console.log(fieldName, text);
    if (nestedField) {
      setContractData(prevData => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedField]: text,
        },
      }));
      formik.handleChange(`${fieldName}.${nestedField}`)(String(text));
    } else {
      setContractData(prevData => ({
        ...prevData,
        [fieldName]: text,
      }));
      formik.handleChange(fieldName)(String(text));
    }
  };



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

  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      {(datetimePicker.endDate || datetimePicker.startDate || datetimePicker.feeDay) && (
        <DateTimePicker
          value={new Date()}
          mode='date'
          display='calendar'
          onChange={(event, selectedDate) => {
            
            if (datetimePicker.endDate) {
                showDatetimePicker({ ...datetimePicker, endDate: false });
                if (selectedDate) {
                    handleInputChange(
                        'end_date',
                        moment(selectedDate).format("L"),
                    );
                }
            } else if (datetimePicker.startDate) {
                showDatetimePicker({ ...datetimePicker,startDate: false});
                if (selectedDate) {
                    handleInputChange(
                        'start_date',
                        moment(selectedDate).format("L"),
                    );
                }
            } else if (datetimePicker.feeDay) {
                showDatetimePicker({ ...datetimePicker, feeDay: false });
                if (selectedDate) {
                    handleInputChange(
                        'couting_fee_day',
                        moment(selectedDate).format("L"),
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
          title='Hủy tạo hợp đồng'
          content='Bạn có muốn hủy tạo hợp đồng không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => {
            showCancelDialog(false);
            navigation.goBack();
          }}
        />
      </Portal>
      <Header
        title='Chi tiết hợp đồng'
        height={hp(8)}
        mode='center-aligned'
        onBack={() => {
          navigation.navigate(RootScreens.ROOMDETAIL as never);
        }}
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
            </View>
              <View>
                <Text style={styles.subTitle}>Đại diện bên cho thuê</Text>
                <TextInput
                  placeholder={user.user_name}
                  style={styles.textInput}
                  editable={false}
                />
                <TextInput
                  placeholder={user.CID || ''}
                  style={styles.textInput}
                  editable={false}
                />
                <Text style={styles.subTitle}>Đại diện bên thuê</Text>
                <TextInput
                  placeholder='Ha Huy Bao'
                  style={styles.textInput}
                  editable={false}
                />
                <TextInput
                  placeholder='12345678910'
                  style={styles.textInput}
                  editable={false}
                />  
              </View>
              <View>
              <Text style={styles.subTitle}>Số phòng</Text>
                <TextInput
                  placeholder='Phòng 101'
                  style={styles.textInput}
                  editable={false}
                  onChangeText={text => handleInputChange('room_id', text)}
                  onBlur={() => onBlur('room_id')}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày bắt đầu</Text>
                    <TextInput
                      placeholder='1/1/2024'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('start_date', text)
                      }
                      showSoftInputOnFocus
                      value={contractData.start_date}
                      onBlur={() => onBlur('start_date')}
                      editable = {false}
                    />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày kết thúc</Text>
                    <TextInput
                      placeholder='1/1/2024'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('end_date', text)
                      }
                      showSoftInputOnFocus
                      value={contractData.end_date}
                      onBlur={() => onBlur('end_date')}
                      editable = {false}
                    />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Ngày bắt đầu tính tiền</Text>
                    <TextInput
                      placeholder='1/1/2024'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('couting_fee_day', text)
                      }
                      showSoftInputOnFocus
                      value={contractData.couting_fee_day}
                      onBlur={() => onBlur('couting_fee_day')}
                      editable = {false}
                    />        
              </View>
              <View>
                <Text style={styles.subTitle}>Kì thanh toán tiền phòng</Text>
    
                    <TextInput
                      placeholder='1 tháng'
                      style={styles.textInput}
                      onChangeText={text =>
                        handleInputChange('paying_cost_cycle', text)
                      }
                      showSoftInputOnFocus
                      value={contractData.paying_cost_cycle}
                      onBlur={() => onBlur('paying_cost_cycle')}
                    />
         
              </View>
          </Surface>
          <Surface style={styles.surface}>
            <Text style={[theme.fonts.titleMedium, styles.title]}>
              Chi phí 
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

        </View>
      </Header>
    </View>
  );
};
