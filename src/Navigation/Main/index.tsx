import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeContainer } from '../../Screens/Home';
import { useAppTheme } from './../../Theme';
import HomeIconSvg from './../../static/icon/homeIcon';
import RoomIconSvg from './../../static/icon/roomIconSvg';
import ProfileIconSvg from './../../static/icon/ProfileIconSvg';
import HistoryIconSvg from './../../static/icon/HistoryIconSvg';
const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  const theme = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 4,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelPosition: 'below-icon',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: { fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeContainer}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <HomeIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Room'
        component={HomeContainer}
        options={{
          tabBarLabel: 'Phòng',
          tabBarIcon: ({ color, size }) => (
            <RoomIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='History'
        component={HomeContainer}
        options={{
          tabBarLabel: 'Lịch sử GD',
          tabBarIcon: ({ color, size }) => (
            <HistoryIconSvg width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={HomeContainer}
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
