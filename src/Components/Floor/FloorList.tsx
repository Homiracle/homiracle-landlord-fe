import { FlatList } from "native-base"
import React, { useEffect } from "react"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import { FloorItem } from "./FloorItem";

export const FloorList = ({data}: any) => {
    // console.log("🚀 ~ FloorList ~ data:", data)
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View>
            <Searchbar
                style={{
                marginBottom: hp('2%'),
                width: wp('90%'),
                left: wp('5%'),
                }}
                placeholder="Tìm tầng"
                onChangeText={setSearchQuery}
                value={searchQuery}
            ></Searchbar>

            <FlatList
              contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              renderItem={({item}: {item: any}) => (
                <FloorItem
                  floor_id={item.floor_id}
                  floor_name={item.floor_name}
                  num_of_room={item.number_of_rooms}
                />)}
            />
        </View>
    )
}