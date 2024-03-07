import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../Theme';
import {
  HomeStack,
  RoomingHouseStack,
  InvoiceStack,
  FinanceStack,
  ProfileStack,
} from './Stacks';
import HomeIconSvg from '../static/icon/homeIcon';
import RoomIconSvg from '../static/icon/roomIconSvg';
import HistoryIconSvg from '../static/icon/HistoryIconSvg';
import ProfileIconSvg from '../static/icon/ProfileIconSvg';

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
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: { fontWeight: '600' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <HomeIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='RoomingHouseStack'
        component={RoomingHouseStack}
        options={{
          tabBarLabel: 'Nhà trọ',
          tabBarIcon: ({ color, size }) => (
            <RoomIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='InvoiceStack'
        component={InvoiceStack}
        options={{
          tabBarLabel: 'Hoá đơn',
          tabBarIcon: ({ color, size }) => (
            <HistoryIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='FinanceStack'
        component={FinanceStack}
        options={{
          tabBarLabel: 'Tài chính',
          tabBarIcon: ({ color, size }) => (
            <HistoryIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <ProfileIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
