import React,{useEffect} from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Surface} from 'react-native-paper';
import { RootScreens } from '../../Constants/RootScreen';
import {TabView, Header, TabButton,DeviceList,TenantList} from'..';
import {TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Room as RoomingProps } from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getHouseId } from '../../Store/reducers';
import { useGetRoomQuery } from '../../Services';
// import { useFormik } from 'formik';

interface RoomProps {
    room_id: string;
}
export const RoomDetailComponent:React.FC<RoomProps> = ({room_id}) =>{
    const theme = useAppTheme();
    const styles = StyleSheet.create({
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
        title:{
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
      });
      const [roomingHouseData, setRoomingHouseData] =
      React.useState<RoomingProps>({
        name: 'Phong',
        number_of_bathroom: 0,
        number_of_bedroom: 0,
        acreage: 0,
        max_number_of_tenant: 0,
        floor: {
          floor_id: useAppSelector(getHouseId),
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
  //     const { data: room, error, isLoading } = useGetRoomQuery(room_id);
  // useEffect(
  //   () => {
  //     const getRoomDetails = async () => {
  //       try {
  //         const result = room_id && getRoomDetails();
  //         console.log(result); // Xử lý dữ liệu trả về từ API
  //       } catch (error) {
  //         console.error('Some error in get house details', error);
  //       }
  //     };
  //     getRoomDetails();
  //   }, [],
  // );

      // const formik = useFormik({
      //   initialValues: roomingHouseData,
      //   onSubmit: values => {
      //     console.log(values);
      //   },
      //   validateOnChange: true,
      //   validateOnBlur: true,
      //   validateOnMount: true,
      // });
      // const handleInputChange = (
      //   fieldName: string,
      //   text: string | number,
      //   nestedField?: string,
      // ) => {
      //   // console.log(fieldName, text);
      //   if (nestedField) {
      //     setRoomingHouseData(prevData => ({
      //       ...prevData,
      //       [fieldName]: {
      //         ...prevData[fieldName],
      //         [nestedField]: text,
      //       },
      //     }));
      //     formik.handleChange(`${fieldName}.${nestedField}`)(String(text));
      //   } else {
      //     setRoomingHouseData(prevData => ({
      //       ...prevData,
      //       [fieldName]: text,
      //     }));
      //     formik.handleChange(fieldName)(String(text));
      //   }
      // };
      // const isTouched = (field: string, nestedField?: string) => {
      //   if (nestedField) {
      //     return (
      //       formik.touched[field as keyof typeof formik.touched]?.[
      //         nestedField as keyof (typeof formik.touched)[typeof field]
      //       ] &&
      //       formik.errors[field as keyof typeof formik.errors]?.[
      //         nestedField as keyof (typeof formik.errors)[typeof field]
      //       ]
      //     );
      //   } else {
      //     return formik.touched[field] && formik.errors[field];
      //   }
      // };
    
      // const onBlur = (field: string, nestedField?: string) => {
      //   if (nestedField) {
      //     return formik.setFieldTouched(field, {
      //       ...(formik.touched[field] as any),
      //       [nestedField]: true,
      //     });
      //   } else {
      //     return formik.setFieldTouched(field, true);
      //   }
      // };
      return(
        <View style={styles.content}>
        <Surface style={styles.surface}>
          <Text style={[theme.fonts.titleMedium, styles.title]}>
            Thông tin phòng
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
                placeholder='Nhập tên tòa nhà'
                style={styles.textInput}
                defaultValue={roomingHouseData.name}
                editable = {false}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: wp(2) }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Số phòng ngủ</Text>
                <TextInput
                placeholder=''
                style={styles.textInput}
                editable= {false}
                defaultValue={String(roomingHouseData.number_of_bedroom)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Số phòng vệ sinh</Text>
                <TextInput
                placeholder=''
                style={styles.textInput}
                editable= {false}
                defaultValue={String(roomingHouseData.number_of_bathroom)}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: wp(2) }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Diện tích</Text>
                <TextInput
                placeholder=''
                style={styles.textInput}
                editable= {false}
                defaultValue={String(roomingHouseData.acreage)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Số người ở tối đa</Text>
                <TextInput
                placeholder=''
                style={styles.textInput}
                editable= {false}
                defaultValue={String(roomingHouseData.max_number_of_tenant)}
                />
              </View>
            </View>
          
          </View>
        </Surface>
        </View>
      );
};
