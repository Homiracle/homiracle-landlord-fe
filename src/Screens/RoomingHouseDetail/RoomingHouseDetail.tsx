import React from 'react';
import { FlatList, List, Text, View } from 'native-base';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloorItem, Header, RoomAndTenant, TabView } from '../../Components';
import { SceneMap } from 'react-native-tab-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabButtonProps } from '@/Components/TabView/TabButton';

export const RoomingHouseDetail = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigation = useNavigation();
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  let data: {
    house_id: string, 
    house_name: string,
    num_of_room: number,
    num_of_tenant: number,
    floor: {
        floor_id: number,
        floor_name: string,
        num_of_room: number,
    }[],
  };
  data = {
    house_id: '1',
    house_name: 'Nhà trọ abc xyz',
    num_of_room: 1,
    num_of_tenant: 1,
    floor: [{
        floor_id: 1,
        floor_name: '2',
        num_of_room: 1,
        },
        {
            floor_id: 2,
            floor_name: '2',
            num_of_room: 1,
        },
        {
            floor_id: 3,
            floor_name: '2',
            num_of_room: 1,
        },
        {
          floor_id: 3,
          floor_name: '2',
          num_of_room: 1,
      },
      {
        floor_id: 3,
        floor_name: '2',
        num_of_room: 1,
    },
    {
      floor_id: 3,
      floor_name: '2',
      num_of_room: 1,
  },{
    floor_id: 3,
    floor_name: '2',
    num_of_room: 1,
},
{
  floor_id: 3,
  floor_name: '2',
  num_of_room: 1,
},
{
  floor_id: 3,
  floor_name: '2',
  num_of_room: 1,
},
{
  floor_id: 3,
  floor_name: '2',
  num_of_room: 1,
},
    ]
  };

  const tabbar: {tabbutton: TabButtonProps, contents?: React.ReactNode}[] = [
    {
      tabbutton:{
        name: 'tầng',
        number: 12,
        isClicked: true,
      }
    },
    {
      tabbutton:{
        name: 'thiết bị',
        number: 12,
        isClicked: false,
      }
    },
    {
      tabbutton:{
        name: 'dịch vụ',
        number: 12,
        isClicked: false,
      }
    },
    {
      tabbutton:{
        name: 'khách thuê',
        number: 12,
        isClicked: false,
      }
    },
  ];

  return (
    <View>
        <Header
        title={data.house_name}
        height={20}
        mode='center-aligned'
        onNotification={() => {
          console.log('notification');
         }}
        onBack={() => {
           navigation.navigate(RootScreens.ROOMING_HOUSE_LIST as never);
        }}
        >
            <RoomAndTenant 
                num_of_room={data.num_of_room}
                num_of_tenant={data.num_of_tenant}/>
        </Header>

        <TabView
            tab={tabbar}>
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

          <FlatList
          contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
          horizontal={false}
          numColumns={2}
          data={data.floor}
          renderItem={({item}) => (<FloorItem
            floor_id={item.floor_id}
            floor_name={item.floor_name}
            num_of_room={item.num_of_room}/>)}
          />


          
    </View>
  );
};
