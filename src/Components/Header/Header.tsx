import { Box } from 'native-base';
import { useAppTheme } from '../../Theme';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { CustomStatusBar } from '../StatusBar';

export interface HeaderProps {
  children: React.ReactNode;
  title: string;
  mode?: 'center-aligned' | 'medium' | 'small' | 'large';
  height?: number | string;
  top?: number | string;
  onBack?: () => void;
  onNotification?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  title,
  height,
  mode = 'small',
  onBack,
  onNotification,
}) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    header: {
      backgroundColor: theme.colors.primary,
      zIndex: 2,
      elevation: 1,
    },
    scrollViewContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0, // Đảm bảo ScrollView nằm dưới Header và Box
      top: 64,
    },
    scrollView: {
      flex: 1,
    },
    box: {
      backgroundColor: theme.colors.primary,
      borderBottomRadius: 20,
      zIndex: 0, // Đảm bảo Box nằm dưới ScrollView
      elevation: 0, // Đảm bảo Box nằm dưới ScrollView trên Android
    },
  });

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header mode={mode} style={styles.header}>
        {onBack && (
          <Appbar.BackAction onPress={onBack} color={theme.colors.onPrimary} />
        )}
        <Appbar.Content
          title={title}
          color={theme.colors.onPrimary}
          titleStyle={theme.fonts.titleLarge}
        />
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
        style={styles.box}
      />
      <View style={styles.scrollViewContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
};
