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
import { useLazyGetRoomQuery } from '../../Services';
import { useFormik } from 'formik';

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
      const [roomingData, setRoomingData] = React.useState<RoomingProps|undefined>();
      const [getRoomDetail,{ data, error, isLoading }] = useLazyGetRoomQuery();
  useEffect(
    () => {
      const getRoomDetails = async () => {
        try {
          const result = getRoomDetail(room_id);
          setRoomingData((await result).data);
          console.log('Room detail ',result); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error('Some error in get room details', error);
        }
      };
      getRoomDetails();
    }, [room_id],
  );
  
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
            {'Thông tin phòng ' + data?.name}
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
                style={styles.textInput}
                defaultValue={data?.name}
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
                defaultValue={String(data?.number_of_bedroom)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Số phòng vệ sinh</Text>
                <TextInput
                placeholder=''
                style={styles.textInput}
                editable= {false}
                defaultValue={String(data?.number_of_bathroom)}
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
                defaultValue={String(data?.acreage)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subTitle}>Số người ở tối đa</Text>
                <TextInput
                style={styles.textInput}
                editable= {false}
                defaultValue={String(data?.max_number_of_tenant)}
                />
              </View>
            </View>
          
          </View>
        </Surface>
        </View>
      );
};
