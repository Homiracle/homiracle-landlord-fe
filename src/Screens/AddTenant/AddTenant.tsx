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
import {
  useAddTenantMutation,
  useGetContractIdByRoomIdQuery,
  useLazySearchTenantQuery,
} from '../../Services';
import { useAppSelector } from '../../Store/hook';
import { getRoomId } from '../../Store/reducers';

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

  const [
    searchTenant,
    {
      data: userData,
      error: userError,
      isSuccess: userSuccess,
      isFetching: userFetching,
    },
  ] = useLazySearchTenantQuery();

  
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [noResults, setNoResults] = React.useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        console.log('Searching for:', searchQuery);
        setIsSearching(true);
        setIsSuccessful(false);
        setNoResults(false); // Reset trạng thái trước khi tìm kiếm
        searchTenant({ phone: searchQuery }).then((response) => {
          setIsSearching(false);
          if (response.data) {
            setIsSuccessful(true);
            setNoResults(false);
          } else {
            setIsSuccessful(true);
            setNoResults(true);
          }
        }).catch(() => {
          setIsSearching(false);
          setIsSuccessful(true);
          setNoResults(true);
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (userError) {
      alert(userError);
    }
  }, [userError]);

  const onBack = () => {
    navigation.goBack();
  };

  const [addTenant, { isSuccess: addTenantSuccess, error: addTenantError }] =
    useAddTenantMutation();

  const roomId = useAppSelector(getRoomId) || '';

  const onAddTenant = () => {
    // call api here
    addTenant({
      room_id: roomId as string,
      tenant_id: userData?.user_id as string,
    });
  };

  useEffect(() => {
    if (addTenantSuccess) {
      // console.log('addTenantSuccess:', addTenantSuccess);
      setConfirmDialog(false);
      alert('Mời người thuê vào phòng thành công!');
    } else if (addTenantError) {
      setConfirmDialog(false);
      alert(addTenantError) 
    }
  }, [addTenantSuccess, addTenantError]);

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
        {userFetching && <ActivityIndicator animating={true} size={30} />}
        {isSuccessful && noResults && <Text>Không tìm thấy kết quả</Text>}
        {isSuccessful && userData && (
          <>
            <View style={styles.tenantContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://static.zerochan.net/Snorlax.1024.2347543.webp',
                }}
              />
              <View style={styles.tenantText}>
                <Text variant='titleMedium'>{userData?.user_name}</Text>
                <Text style={styles.tenantPhone}>{userData?.phone}</Text>
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
      {/* <Portal>
        <CustomDialog
          visible={successfulDialog}
          content='Mời người thuê vào phòng thành công!'
          onConfirm={() => {
            setSuccessfulDialog(false);
          }}
        />
      </Portal>
      <Portal>
        <CustomDialog
          visible={errorDialog}
          content='Vui lòng ký hợp đồng trước khi thêm khách thuê vào phòng!'
          onConfirm={() => {
            setErrorDialog(false);
          }}
        />
      </Portal> */}
    </View>
  );
};

export { AddTenant };
