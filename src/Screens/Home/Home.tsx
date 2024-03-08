import { Header, CustomStatusBar } from '../../Components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme, { useAppTheme } from '../../Theme';

export const Home = () => {
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Home'
        height={80}
        mode='center-aligned'
        onBack={() => {
          console.log('back');
        }}
        onNotification={() => {
          console.log('noti');
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.onPrimary,
            paddingHorizontal: 50,
            marginHorizontal: 120,
          }}
        >
          <Text>Home</Text>
        </View>
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
