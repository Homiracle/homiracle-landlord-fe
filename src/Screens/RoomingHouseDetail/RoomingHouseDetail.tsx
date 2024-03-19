import React, { useEffect, useState } from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloorItem, Header, RoomAndTenant, RootStackHouseParamList, TabView } from '../../Components';
import { SceneMap } from 'react-native-tab-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabButton, TabButtonProps } from '../../Components/TabView/TabButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLazyGetRoomingHouseDetailsQuery, useLazyGetRoomingHousesQuery } from '../../Services';

type Props = {
  house_id?: string,
}

export const RoomingHouseDetail: React.FC<Props> = ({house_id}) => {
  console.log(house_id);

  const [searchQuery, setSearchQuery] = React.useState('');

  const HomiracleNavigation = useNavigation();

  const [getRoomingHouseDetails, { data, isLoading, isError }] = useLazyGetRoomingHouseDetailsQuery();

  useEffect(
    () => {
      const getHouseDetails = async () => {
        try {
          const result = house_id && getRoomingHouseDetails(house_id);
          console.log(result); // Xử lý dữ liệu trả về từ API
        } catch (error) {
          console.error('Some error in get house details', error);
        }
      };
      getHouseDetails();
    }, [],
  );


//   data = {
//     house_id: '1',
//     house_name: 'Nhà trọ abc xyz',
//     num_of_room: 1,
//     num_of_tenant: 1,
//     floor: [{
//         floor_id: 1,
//         floor_name: '2',
//         num_of_room: 1,
//         },
//         {
//             floor_id: 2,
//             floor_name: '2',
//             num_of_room: 1,
//         },
//         {
//             floor_id: 3,
//             floor_name: '2',
//             num_of_room: 1,
//         },
//         {
//           floor_id: 3,
//           floor_name: '2',
//           num_of_room: 1,
//       },
//       {
//         floor_id: 3,
//         floor_name: '2',
//         num_of_room: 1,
//     },
//     {
//       floor_id: 3,
//       floor_name: '2',
//       num_of_room: 1,
//   },{
//     floor_id: 3,
//     floor_name: '2',
//     num_of_room: 1,
// },
// {
//   floor_id: 3,
//   floor_name: '2',
//   num_of_room: 1,
// },
// {
//   floor_id: 3,
//   floor_name: '2',
//   num_of_room: 1,
// },
// {
//   floor_id: 3,
//   floor_name: '2',
//   num_of_room: 1,
// },
//     ]
//   };

  return (
    <View>
        <Header
        title={'Nhà trọ' + (data && data.house_name)}
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
         }}
        onBack={() => {
          HomiracleNavigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
        }}
        >
          {data && <RoomAndTenant 
            num_of_room={data && data.num_of_room}
            num_of_tenant={data.num_of_tenant}/>}
        </Header>

        <TabView default='tầng'>
          <TabButton
            isClicked={true}
            name='tầng'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='thiết bị'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='dịch vụ'
            number={12}
          />
          <TabButton
            isClicked={false}
            name='khách thuê'
            number={12}
          />
        </TabView>

        <Searchbar
          style={{
            marginTop: hp('2%'),
            width: wp('90%'),
            left: wp('5%'),
          }}
          placeholder="Tìm phòng"
          onChangeText={setSearchQuery}
          value={searchQuery}
        ></Searchbar>

        {data && <FlatList
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data.floor}
          renderItem={({item}) => (<FloorItem
            floor_id={item.floor_id}
            floor_name={item.floor_name}
            num_of_room={item.num_of_room}/>)}
        />}

        {!data && <Text>Is loading</Text>}
    </View>
  );
};
function aysnc(): React.EffectCallback {
  throw new Error('Function not implemented.');
}

