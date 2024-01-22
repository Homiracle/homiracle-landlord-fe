import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HStack, Spinner, Heading } from 'native-base';
import { User } from '../../Services';
import { Button, Text } from 'react-native-paper';

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {isLoading ? (
        <HStack space={2} justifyContent='center'>
          <Spinner accessibilityLabel='Loading posts' />
        </HStack>
      ) : (
        <>
          <Heading color='primary.500' fontSize='md'>
            {data?.username}
          </Heading>
          <Text variant='displayLarge'>Display Large</Text>
          <Button mode='contained'>abc</Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
