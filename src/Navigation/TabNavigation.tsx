import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../Theme';
import {
  HomeStack,
  RoomingHouseStack,
  FinanceStack,
  ProfileStack,
  NotificationStack,
} from './Stacks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// @refresh reset
export const TabNavigator = () => {
  const theme = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 4,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelPosition: 'below-icon',
        tabBarInactiveTintColor: '#b8b4b4',
        tabBarLabelStyle: { fontWeight: '600' },
        headerShown: false,
      }}
    >
      {/* <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <HomeIconSvg width={size} height={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name='RoomingHouseStack'
        component={RoomingHouseStack}
        options={{
          tabBarLabel: 'Nhà trọ',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='FinanceStack'
        component={FinanceStack}
        options={{
          tabBarLabel: 'Tài chính',
          tabBarIcon: ({ color, size }) => (
            <Icon name='finance' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='NotificationStack'
        component={NotificationStack}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <Icon name='bell-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Icon name='account-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
