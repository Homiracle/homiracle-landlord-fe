import { FlatList } from "native-base"
import React from "react"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import { FloorItem } from "./FloorItem";

export interface FloorListProps {
    house_id?: string,
    floor_id?: string,
    room_id?: string,
}

export const FloorList = ({
    house_id,
    floor_id,
    room_id,
}: FloorListProps) => {

    const [searchQuery, setSearchQuery] = React.useState('');

    const floor = [{
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
    ]

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
                data={floor}
                renderItem={({item}) => (
                    <FloorItem
                        floor_id={item.floor_id}
                        floor_name={item.floor_name}
                        num_of_room={item.num_of_room}
                    />)}
            /> 
        </View>
    )
}