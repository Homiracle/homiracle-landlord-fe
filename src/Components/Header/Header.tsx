import { Box } from 'native-base';
import { useAppTheme } from '../../Theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { CustomStatusBar } from '../StatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export interface HeaderProps {
  children: React.ReactNode;
  title?: string;
  mode?: 'center-aligned' | 'medium' | 'small' | 'large';
  height?: number;
  top?: number | string;
  onBack?: () => void;
  onNotification?: () => void;
}

// write an handler for the back button

// write an handler for the notification button

export const Header: React.FC<HeaderProps> = ({
  children,
  title,
  height,
  mode = 'small',
  onBack,
  onNotification,
}) => {
  const theme = useAppTheme();
  // const [statusBarHeight, setStatusBarHeight] = useState(0);

  // useEffect(() => {
  //   const height = getStatusBarHeight();
  //   setStatusBarHeight(height);
  //   console.log('statusBarHeight', height);
  // }, []);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 64,
    },
    header: {
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <View>
      <CustomStatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header mode={mode} style={styles.header}>
        {onBack && (
          <Appbar.BackAction onPress={onBack} color={theme.colors.onPrimary} />
        )}
        <Appbar.Content title={title} color={theme.colors.onPrimary} />
        {onNotification && (
          <Appbar.Action
            icon='bell-outline'
            onPress={onNotification}
            color={theme.colors.onPrimary}
          />
        )}
      </Appbar.Header>
      <Box
        height={height}
        backgroundColor={theme.colors.primary}
        borderBottomRadius={20}
      />
      <View style={styles.container}>{children}</View>
    </View>
  );
};
