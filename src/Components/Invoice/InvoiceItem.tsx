import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableHighlight, View } from 'react-native';
import {
  Card,
  Text,
  Button,
  DataTable,
  Portal,
  Dialog,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import theme from '../../Theme';
import {
  InvoiceStatus,
  PaymentName,
  InvoiceStatusText,
} from '../../Constants/Invoice';
import { ItfInvoiceItem } from '../../Services/invoices/interface';
import { useSetInvoiceToPaidMutation } from '../../Services/invoices';

const toVietnamCurrency = (input: number | string) => {
  return input.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const InvoiceItem = ({ item }: { item: ItfInvoiceItem }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [value, setValue] = useState<string>(item.status);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [confirmInvoice, { isSuccess, error: isError }] =
    useSetInvoiceToPaidMutation();

  const styles = StyleSheet.create({
    cardTitle: {
      display: 'flex',
      flexDirection: 'row',
      gap: wp(2),
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginVertical: hp(1),
    },
    dataTable: {
      borderStyle: 'solid',
      borderColor: theme.palettes.neutral['90'],
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 36,
      width: '60%',
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      fontSize: 12,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    radioStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlignVertical: 'bottom',
    },
  });

  /** confirm change invoice status */
  const confirmChangeStatus = () => {
    setShowDialog(false);
    confirmInvoice({ id: item.invoice_id });
  };

  // show message after updating
  React.useEffect(() => {
    if (isSuccess) {
      // alert('Cập nhật trạng thái thành công');
      Alert.alert("", "Cập nhật trạng thái thành công!")
      setValue(value);
    } else if (isError) Alert.alert("Lỗi", "Cập nhật thất bại!")
  }, [isSuccess, isError]);

  return (
    <>
      <Card style={{ width: wp(92), margin: wp(1) }}>
        <Card.Content>
          <Card.Content>
            <View style={styles.cardTitle}>
              <Text variant='titleMedium'>{item.name}</Text>
              <Text>{toVietnamCurrency(item.total)}</Text>
            </View>

            <View style={styles.cardTitle}>
              <Text variant='titleMedium'>Trạng thái</Text>
              <Text>
                {
                  // @ts-ignore
                  InvoiceStatusText[String(item.status).toUpperCase()]
                }
              </Text>
            </View>
          </Card.Content>

          {isExpanded && (
            <>
              <DataTable style={styles.dataTable}>
                <DataTable.Header>
                  <DataTable.Title>Tên</DataTable.Title>
                  <DataTable.Title numeric>Tiêu thụ</DataTable.Title>
                  <DataTable.Title numeric>Số tiền</DataTable.Title>
                </DataTable.Header>
                {item.costs
                  .filter(_ => _.cost > 0)
                  .map((_, idx: number) => (
                    <DataTable.Row
                      style={{ borderColor: 'transparent' }}
                      key={idx}
                    >
                      <DataTable.Cell>
                        {
                          // @ts-ignore
                          PaymentName[_.name]
                        }
                      </DataTable.Cell>
                      <DataTable.Cell numeric> </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {toVietnamCurrency(_.cost)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            icon={isExpanded ? 'chevron-double-up' : 'chevron-double-down'}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Thu gọn' : 'Chi tiết'}
          </Button>
          <Button
            disabled={item.status === InvoiceStatus.PAID}
            onPress={() => setShowDialog(true)}
          >
            Xác nhận đã thanh toán
          </Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Cảnh báo</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>
              Bạn có chắn chắn muốn xác nhận hoá đơn này đã được thanh toán
              không?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={confirmChangeStatus}>Xác nhận</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
