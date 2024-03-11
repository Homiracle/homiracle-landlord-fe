import React from 'react';
import { Text, View } from 'native-base';
import { Header, CustomDialog } from '../../Components';
import { useAppTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, TextInput } from 'react-native';
import { Button, Surface, Portal } from 'react-native-paper';

export const CreateRoomingHouse = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [backDialog, showBackDialog] = React.useState(false);
  const [cancelDialog, showCancelDialog] = React.useState(false);

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

  const onBack = () => {
    showBackDialog(true);
    console.log('back');
  };

  return (
    <View style={styles.container}>
      <Portal>
        <CustomDialog
          visible={backDialog}
          title='Thoát'
          content='Bạn có muốn thoát không?'
          onDismiss={() => showBackDialog(false)}
          onConfirm={() => navigation.goBack()}
        />
      </Portal>
      <Portal>
        <CustomDialog
          visible={cancelDialog}
          title='Hủy tạo nhà trọ'
          content='Bạn có muốn hủy tạo nhà trọ không?'
          onDismiss={() => showCancelDialog(false)}
          onConfirm={() => navigation.goBack()}
        />
      </Portal>
      <Header
        title='Tạo nhà trọ'
        height={hp(8)}
        mode='center-aligned'
        onBack={onBack}
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
                />
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Tỉnh/Thành phố</Text>
                  <TextInput
                    placeholder='Tỉnh/Thành phố'
                    style={styles.textInput}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Quận/Huyện</Text>
                  <TextInput
                    placeholder='Quận/Huyện'
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Địa chỉ</Text>
                <TextInput
                  placeholder='Nhập địa chỉ'
                  style={styles.textInput}
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
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá phòng tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá phòng tham khảo'
                  style={styles.textInput}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá điện tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá điện tham khảo'
                  style={styles.textInput}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Giá nước tham khảo</Text>
                <TextInput
                  placeholder='Nhập giá nước tham khảo'
                  style={styles.textInput}
                />
              </View>
              <View>
                <Text style={styles.subTitle}>Phí dịch vụ chung cho phòng</Text>
              </View>
              <View>
                <Text style={styles.subTitle}>Phí dịch vụ theo đầu người</Text>
              </View>
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
                  <TextInput placeholder='05:00' style={styles.textInput} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Giờ đóng cửa</Text>
                  <TextInput placeholder='23:00' style={styles.textInput} />
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày chốt tiền</Text>
                  <TextInput placeholder='31' style={styles.textInput} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Số ngày báo trước</Text>
                  <TextInput placeholder='5' style={styles.textInput} />
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: wp(2) }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày bắt đầu nộp tiền</Text>
                  <TextInput placeholder='1' style={styles.textInput} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Ngày hết hạn nộp tiền</Text>
                  <TextInput placeholder='10' style={styles.textInput} />
                </View>
              </View>
            </View>
          </Surface>
          <Surface style={styles.surface}>
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
          </Surface>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor={theme.colors.error}
            textColor={theme.colors.onPrimary}
            style={styles.button}
            onPress={() => {showCancelDialog(true)}}
          >
            Hủy
          </Button>
          <Button
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            style={styles.button}
            onPress={() => {}}
          >
            Tạo nhà trọ
          </Button>
        </View>
      </Header>
    </View>
  );
};
