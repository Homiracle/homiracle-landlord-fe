import React, { useEffect } from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { AnimatedFAB, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HouseItemProps, HouseItem, Header } from '../../Components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useGetRoomingHousesQuery } from '../../Services';
import { NativeScrollEvent, StyleSheet } from 'react-native';
import { useAppTheme } from '../../Theme';

export const RoomingHouseList = () => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    fabStyle: {
      bottom: hp(2),
      right: wp(4),
      position: 'absolute',
      backgroundColor: theme.colors.primary,
    },
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();
  const { data, isLoading, isSuccess, isError } = useGetRoomingHousesQuery();
  useEffect(() => {
    if (isSuccess) {
      // console.log('data', data);
    } else if (isError) {
      console.log('error', isError);
    }
  }, [isSuccess, isError]);

  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Danh sách nhà trọ'
        height={15}
        mode='center-aligned'
      >
        {/* <Searchbar
          style={{
            width: wp('90%'),
            left: wp('5%'),
          }}
          placeholder='Tìm nhà trọ'
          onChangeText={setSearchQuery}
          value={searchQuery}
        ></Searchbar> */}
      </Header>
      <FlatList
        data={data}
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          paddingBottom: hp(10)
        }}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HouseItem
            house_id={item.house_id}
            house_name={item.house_name}
            address={
              item.street +
              ', ' +
              item.commune +
              ', ' +
              item.district +
              ', ' +
              item.province
            }
            num_of_room={item.number_of_rooms}
            num_of_tenant={item.number_of_tenants}
          ></HouseItem>
        )}
        keyExtractor={item => item.house_id}
      />
      <AnimatedFAB
        icon={'plus'}
        label={'Thêm nhà trọ'}
        extended={isExtended}
        onPress={() => {
          navigation.navigate(RootScreens.CREATE_ROOMING_HOUSE as never);
        }}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={styles.fabStyle}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};
