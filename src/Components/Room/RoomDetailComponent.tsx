import React, { useEffect } from 'react';
import {  Text, View, ScrollView } from 'native-base';
import { Surface } from 'react-native-paper';
import { TextInput, StyleSheet, NativeScrollEvent } from 'react-native';
import { useAppTheme } from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface RoomInfoProps{
  data: any;
  onScroll?: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
}
export const RoomDetailComponent = ({ data, onScroll }: RoomInfoProps) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    surface: {
      flexDirection: 'column',
      backgroundColor: theme.colors.onPrimary,
      marginHorizontal: wp(2),
      borderRadius: wp(2),
      width: wp(96),
      height: hp(40),
      paddingHorizontal: wp(4),
      paddingTop: hp(1),
      marginBottom: hp(1),
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
  });

  return (
    <View>
      <Surface style={styles.surface}>
        <Text style={[theme.fonts.titleMedium, styles.title]}>
          { 'Thông tin phòng '  + (data?.name || '')}
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
            <Text style={styles.textInput}>{data?.name? data?.name: ''}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số phòng ngủ</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.number_of_bedroom ? data?.number_of_bedroom : 0)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số phòng vệ sinh</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.number_of_bathroom ? data?.number_of_bathroom : 0)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: wp(2) }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Diện tích</Text>
              <TextInput
                placeholder=''
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.acreage ? data?.acreage : 0)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.subTitle}>Số người ở tối đa</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                defaultValue={String(data?.max_tenant ? data?.max_tenant : 0)}
              />
            </View>
          </View>
        </View>
      </Surface>
    </View>
  );
};
