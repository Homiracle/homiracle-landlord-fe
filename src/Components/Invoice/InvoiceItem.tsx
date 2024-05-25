import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, DataTable } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-searchable-dropdown-kj';

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

  const [confirmInvoice, { isSuccess, error: isError }] =
    useSetInvoiceToPaidMutation();

  const statusList = [
    { value: InvoiceStatus.CREATED, label: InvoiceStatusText.CREATED },
    { value: InvoiceStatus.PAID, label: InvoiceStatusText.PAID },
    { value: InvoiceStatus.LOANED, label: InvoiceStatusText.LOANED },
    { value: InvoiceStatus.EXPIRED, label: InvoiceStatusText.EXPIRED },
    {
      value: InvoiceStatus.PAIDCONFIRMED,
      label: InvoiceStatusText.PAIDCONFIRMED,
    },
  ];

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
  });

  /** confirm change invoice status */
  const confirmChangeStatus = (status: { value: string; label: string }) => {
    if (status.value === item.status) return;
    confirmInvoice({ id: item.invoice_id });
  };

  // show message after updating
  React.useEffect(() => {
    if (isSuccess) {
      alert('Cập nhật trạng thái thành công');
      setValue(value);
    } else if (isError) alert('Cập nhật thất bại');
  }, [isSuccess, isError]);

  return (
    <Card style={{ width: wp(90), margin: wp(1) }}>
      <Card.Content>
        <Card.Content>
          <View style={styles.cardTitle}>
            <Text variant='titleMedium'>{item.name}</Text>
            <Text>{toVietnamCurrency(item.total)}</Text>
          </View>

          <View style={styles.cardTitle}>
            <Text variant='titleMedium'>Trạng thái</Text>
            <Dropdown
              data={statusList}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              // search
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='Select item'
              searchPlaceholder='Search...'
              value={value}
              onChange={item => confirmChangeStatus(item)}
            />
          </View>
        </Card.Content>

        {!isExpanded && (
          <Button
            icon={'chevron-double-down'}
            onPress={() => setIsExpanded(true)}
          >
            Chi tiết
          </Button>
        )}

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
            <Button
              icon={'chevron-double-up'}
              onPress={() => setIsExpanded(false)}
            >
              Thu gọn
            </Button>
          </>
        )}
      </Card.Content>
    </Card>
  );
};
