import React from 'react';
import { Profile } from './Profile';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Constants/RootStackParam';
import { RootScreens } from '../../Constants/RootScreen';

export type ProfileScreenNavigatorProps = StackScreenProps<
  RootStackParamList,
  RootScreens.PROFILE
>;

export const ProfileContainer = ({
  route,
  navigation,
}: ProfileScreenNavigatorProps) => {
  return <Profile route={route} navigation={navigation} />;
};
