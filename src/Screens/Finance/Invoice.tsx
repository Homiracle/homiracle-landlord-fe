import React from 'react';
import { FlatList } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';

import { useGetInvoicesQuery } from '../../Services/invoices';
import { ItfInvoiceItem } from '../../Services/invoices/interface';
import { InvoiceItem } from '../../Components/Invoice/InvoiceItem';

export const Invoice = () => {
  const [invoiceList, setInvoiceList] = React.useState<ItfInvoiceItem[]>([]);
  const { data, isSuccess } = useGetInvoicesQuery();

  // side effect
  React.useEffect(() => {
    data && setInvoiceList(data);
  }, [data]);

  return (
    <>
      {invoiceList.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
            gap: 10,
            paddingBottom: hp(10),
          }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={invoiceList}
          renderItem={({ item }) => (
            <InvoiceItem item={item} key={item.invoice_id} />
          )}
        />
      ) : (
        <ActivityIndicator animating={true} color={'green'} />
      )}
    </>
  );
};
