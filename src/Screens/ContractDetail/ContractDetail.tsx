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
import { useCreateContractMutation, useGetContractQuery } from '../../Services';
import { ContractDetailRouteProp } from './ContractDetailContainer';
import {Contract as ContractProps } from '../../Services/contract/interface';
import { useAppSelector } from '../../Store/hook';
import { getHouseId, getFloorId, getRoomId, selectUserId } from '../../Store/reducers';
import { contractFormValidationSchema as schema } from '../../Utils';
import { useFormik } from 'formik';
import { selectUser } from '../../Store/reducers';
import { RootScreens } from '../../Constants/RootScreen';

export const ContractDetail = ({
  navigation, route
}: ContractDetailRouteProp) => {
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
      house_id: (useAppSelector(getHouseId)),
      floor_id: (useAppSelector(getFloorId)),
      room_id: (useAppSelector(getRoomId)),
      contract_id: 0,
      start_date: '',
      end_date: '',
      couting_fee_day: '',
      paying_cost_cycle: 0,
      maximum_number_of_peoples: 4,
      reference_cost: {
          deposit: 0,
          room_cost: 0,
          water_cost: 0,
          power_cost: 0,
          cost_per_person: 0,
          cost_per_room: 0,
        },
        tenant_id: '',
    });

  const {data: ContractDetail,
    isSuccess: isContractDetailSuccess,
    error: isContractDetailError,
  } = useGetContractQuery(route.params.contract_id);
  console.log(route.params.contract_id);
  useEffect(() => {
    if (isContractDetailSuccess) {
      console.log(ContractDetail);
    }
    else 
    {
      console.log(isContractDetailError);
    }
  }, [isContractDetailSuccess, ContractDetail]);  
  
  
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

  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
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
                  value={user.user_name}
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
                  value = {ContractDetail?.tenant.user_name}
                  style={styles.textInput}
                  editable={false}
                />
                <TextInput
                 value = {ContractDetail?.tenant.phone}
                  style={styles.textInput}
                  editable={false}
                />  
              </View>
              <View>
              <Text style={styles.subTitle}>Số phòng</Text>
                <TextInput
                  value = {ContractDetail?.room.name}
                  style={styles.textInput}
                  editable={false}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày bắt đầu</Text>
                    <TextInput
                      
                      style={styles.textInput}
                      showSoftInputOnFocus
                      value={ContractDetail?.start_date}
                
                      editable = {false}
                    />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày kết thúc</Text>
                    <TextInput
                     
                      style={styles.textInput}
                      value= {ContractDetail?.end_date}
                      editable = {false}
                    />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Ngày bắt đầu tính tiền</Text>
                    <TextInput
                    
                      style={styles.textInput}
                      value={ContractDetail?.couting_fee_day}
                      editable = {false}
                    />        
              </View>
              <View>
                <Text style={styles.subTitle}>Kì thanh toán tiền phòng</Text>
    
                    <TextInput
                      placeholder='1 tháng'
                      style={styles.textInput}
                     
                      showSoftInputOnFocus
                      value={ContractDetail?.paying_cost_cycle +""}
                    
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
                  value= {ContractDetail?.cost?.deposit + ""}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá phòng tham khảo</Text>
                <TextInput
                  
                  style={styles.textInput}
                  value= {ContractDetail?.cost?.room_cost +""}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá điện tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá điện tham khảo'
                  style={styles.textInput}
                  value={ContractDetail?.cost?.power_cost +""}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá nước tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá nước tham khảo'
                  style={styles.textInput}
                  value={ContractDetail?.cost?.water_cost +""}
                />
              </View>
       
            </View>
          </Surface>

        </View>
      </Header>
    </View>
  );
};
