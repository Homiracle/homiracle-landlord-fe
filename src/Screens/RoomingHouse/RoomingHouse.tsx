import React from 'react';
import { Text, View } from 'native-base';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';

export const RoomingHouse = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>RoomingHouse</Text>
      <Button
        onPress={() => {
          navigation.navigate(RootScreens.CREATE_ROOMING_HOUSE as never);
        }}
      >
        Go to create rooming house
      </Button>
      <Button
        onPress={() => {
          navigation.navigate(RootScreens.PROFILE as never);
        }}
      >
        Go to profile
      </Button>
    </View>
  );
};
