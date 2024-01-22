import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../Services';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AnalyzeItem from '../../Components/Home/AnalyzeItem';
import { Button } from 'react-native-paper';
import IconEntypo from 'react-native-vector-icons/Entypo';
import LedIcon from '../../static/icon/LedIcon';
import DeviceItem from '../../Components/Home/DeviceItem';
import ThunderIcon from '../../static/icon/ThunderIcon';
import TvIcon from '../../static/icon/TvIcon';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import AirConIcon from '../../static/icon/AirConIcon';
import AirPurifier from '../../static/icon/AirPurifier';
import ButtonComponent from '../../Components/Home/ButtonCustom';
export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const setTrue = () => setIsActive(true);
  const setFalse = () => setIsActive(false);

  return (
    <LinearGradient
      colors={['#ECFDF5', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#006C49' }}>
            Phan Hai Ha
          </Text>
          <Icon name='notifications-outline' size={24} />
        </View>
        <ScrollView
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <View style={{ paddingVertical: 10 }}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  height: 50,
                  borderRadius: 15,
                  gap: 5,
                  flexDirection: 'row',
                  borderColor: theme.colors.primary,
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}
              >
                <Text style={{ fontSize: 16, backgroundColor: 'transparent' }}>
                  Sao Mai - 101
                </Text>
                <IconEntypo name='triangle-down' color={'#454545'} size={20} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <AnalyzeItem
                bgColor={theme.colors.primary}
                header='23 tháng 5'
                mid='12'
                footer='Ít mây'
                icon={
                  <Icon
                    name={'partly-sunny-outline'}
                    style={{
                      backgroundColor: '#30896b',
                      padding: 10,
                      borderRadius: 30,
                      overflow: 'hidden',
                    }}
                    size={35}
                    color={'#fff'}
                  />
                }
                midRight={
                  <View
                    style={{
                      marginTop: 5,
                      borderColor: '#ECFDF5',
                      height: 15,
                      width: 15,
                      borderRadius: 30,
                      borderWidth: 3,
                    }}
                  />
                }
              />
              <AnalyzeItem
                bgColor='#ff7006'
                header='Điện'
                mid='325'
                footer='Hôm nay'
                icon={
                  <View
                    style={{
                      backgroundColor: '#fb8c37',
                      padding: 10,
                      borderRadius: 30,
                      overflow: 'hidden',
                    }}
                  >
                    <ThunderIcon size={35} color='white' />
                  </View>
                }
                midRight={
                  <Text
                    style={{ marginTop: 15, fontSize: 15, color: '#ECFDF5' }}
                  >
                    Kwh
                  </Text>
                }
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                alignItems: 'center',
                marginVertical: 20,
                paddingHorizontal: 20,
              }}
            >
              <ButtonComponent
                text='Phòng của tôi'
                count={4}
                isEnable={!isActive}
                setEnable={setFalse}
              />
              <ButtonComponent
                text='Khu vực chung'
                count={4}
                isEnable={isActive}
                setEnable={setTrue}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
              <DeviceItem
                icon={<LedIcon />}
                title='Đèn'
                desc='3 thiết bị'
                content={
                  <>
                    <IconFeather name='clock' size={25} color={'grey'} />
                    <Text style={{ color: 'grey' }}>Bật lúc 6:30</Text>
                  </>
                }
                footer={
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <ThunderIcon color='#ff7006' size={20} />
                      <Text style={{ color: 'grey' }}>28kWh</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>Wi-Fi</Text>
                  </>
                }
              />
              <DeviceItem
                icon={<TvIcon />}
                title='Smart TV'
                desc='1 thiết bị'
                content={
                  <>
                    <IconIonicons
                      name='play-outline'
                      size={25}
                      color={'grey'}
                    />
                    <Text style={{ color: 'grey' }}>Đang phát -- SILO</Text>
                  </>
                }
                footer={
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <ThunderIcon color='#ff7006' size={20} />
                      <Text style={{ color: 'grey' }}>35kWh</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>Bluetooth</Text>
                  </>
                }
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
              <DeviceItem
                icon={<AirConIcon />}
                title='Điều hòa'
                desc='1 thiết bị'
                footer={
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <ThunderIcon color='#ff7006' size={20} />
                      <Text style={{ color: 'grey' }}>28kWh</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>Wi-Fi</Text>
                  </>
                }
              />
              <DeviceItem
                icon={<AirPurifier />}
                title='Máy lọc không khí'
                desc='2 thiết bị'
                footer={
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <ThunderIcon color='#ff7006' size={20} />
                      <Text style={{ color: 'grey' }}>10kWh</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>Wi-Fi</Text>
                  </>
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  topBar: {
    width: '100%',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
