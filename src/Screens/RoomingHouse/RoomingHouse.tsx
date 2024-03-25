import React, { useEffect } from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HouseItemProps, HouseItem, Header } from '../../Components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useLazyGetRoomingHousesQuery } from '../../Services';

export const RoomingHouseList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigation = useNavigation();
  const [getRoomingHouses, {data}] = useLazyGetRoomingHousesQuery();

  useEffect(
    () => {
      const getHouseDetails = async () => {
        try {
          const result = getRoomingHouses();
          console.log(result); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error('Some error in get house details', error);
        }
      };
      getHouseDetails();
    }, [],
  );

  const houseList: HouseItemProps[] = [
    {
      house_id: '1',
      house_name: 'nha tro xuan hong',
      address: '127 ly thuong kiet abc xyz abc xyz abc xyz abc xyz',
      num_of_room: 10,
      num_of_tenant: 20,
    },
    {
      house_id: '2',
      house_name: 'nha tro xuan hong',
      address: '127 ly thuong kiet abc xyz',
      num_of_room: 10,
      num_of_tenant: 20,
    },
    {
      house_id: '3',
      house_name: 'nha tro xuan hong',
      address: '127 ly thuong kiet abc xyz',
      num_of_room: 10,
      num_of_tenant: 20,
    },
    {
      house_id: '4',
      house_name: 'Nha tro xuan hong',
      address: '127 ly thuong kiet abc xyz',
      num_of_room: 10,
      num_of_tenant: 20,
    },
  ];

  return (
    <View>
      <Header
        title='Danh sách nhà trọ'
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
        }}
      >
        <Searchbar
          style={{
            width: wp('90%'),
            left: wp('5%'),
          }}
          placeholder='Tìm nhà trọ'
          onChangeText={setSearchQuery}
          value={searchQuery}
        ></Searchbar>
      </Header>
      <Button
        style={{}}
        onPress={() => {
          navigation.navigate(RootScreens.CREATE_ROOMING_HOUSE as never);
        }}
      >
        create rooming house
      </Button>

        <FlatList
          data={houseList}
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HouseItem
              house_id={item.house_id}
              house_name={item.house_name}
              address={item.address}
              num_of_room={item.num_of_room}
              num_of_tenant={item.num_of_tenant}
            ></HouseItem>
          )}
          keyExtractor={item => item.house_id}
        />
    </View>
  );
};  
