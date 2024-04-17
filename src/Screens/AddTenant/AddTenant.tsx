import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import {
  Searchbar,
  Button,
  Text,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useAppTheme } from '../../Theme';
import { Header, CustomDialog } from '../../Components';
import { useLazySearchUserQuery } from '../../Services';

const AddTenant = () => {
  const theme = useAppTheme();
    // style
    const styles = StyleSheet.create({
      avatar: {
        width: hp(10),
        height: hp(10),
        borderRadius: hp(100),
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
      },
      tenantContainer: {
        paddingVertical: wp(3),
        paddingHorizontal: wp(2),
        flexGrow: 1,
        borderRadius: wp(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
        backgroundColor: 'white',
      },
      tenanContent: {
        margin: hp(2),
        display: 'flex',
        flexDirection: 'row',
        gap: wp(2),
        justifyContent: 'center',
      },
      tenantText: { flexGrow: 1 },
      tenantPhone: { color: theme.palettes.neutral[80] },
      button: {
        backgroundColor: theme.colors.primary, // #006C49
        color: theme.palettes.primary[100], // #fff
        borderRadius: wp(3),
        height: hp(6),
      },
    });

  // hooks
  const navigation = useNavigation();

  // states
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = React.useState<boolean>(false);

  const [searchUser, { data, error, isSuccess, isFetching, isLoading }] =
    useLazySearchUserQuery();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        console.log('Searching for:', searchQuery);
        setIsSearching(true);
        searchUser({ phone: searchQuery }).then(() => {
          setIsSearching(false);
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
    } else if (error) {
      console.log('Error:', error);
    }
  }, [data, error]);

  const onBack = () => {
    navigation.goBack();
  };

  const onAddTenant = () => {
    setConfirmDialog(false);
    // call api here
  };

  return (
    <View>
      <Header
        title='Thêm khách thuê'
        height={20}
        mode='center-aligned'
        onBack={onBack}
      >
        <Searchbar
          style={{
            width: wp('90%'),
            left: wp('5%'),
          }}
          placeholder='Nhập số điện thoại'
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={theme.palettes.neutral[50]}
        />
      </Header>
      <View style={styles.tenanContent}>
        {isFetching && <ActivityIndicator animating={true} size={30} />}
        {!isFetching && !data && (
          <Text>Không tìm thấy kết quả</Text>
        )}
        {isSuccess && data && (
          <>
            <View style={styles.tenantContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://static.zerochan.net/Snorlax.1024.2347543.webp',
                }}
              />
              <View style={styles.tenantText}>
                <Text variant='titleMedium'>{data?.user_name}</Text>
                <Text style={styles.tenantPhone}>{data?.phone}</Text>
              </View>
            </View>
            <TouchableHighlight
              activeOpacity={0.6}
              style={{ alignSelf: 'center' }}
            >
              <Button
                textColor={theme.colors.onPrimary}
                style={styles.button}
                onPress={() => setConfirmDialog(true)}
              >
                Thêm
              </Button>
            </TouchableHighlight>
          </>
        )}
      </View>
      <Portal>
        <CustomDialog
          visible={confirmDialog}
          title='Thêm người thuê'
          content='Bạn có muốn thêm người thuê này không?'
          onDismiss={() => setConfirmDialog(false)}
          onConfirm={onAddTenant}
        />
      </Portal>
    </View>
  );
};

export { AddTenant };
