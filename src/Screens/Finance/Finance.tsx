import { View } from 'native-base';
import React from 'react';

import { Header, TabView } from '../../Components';
import { TabButton } from '../../Components/TabView/TabButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Invoice } from './Invoice';
import { useNavigation } from '@react-navigation/native';

export const Finance = () => {
  const navigation = useNavigation();
  const tabs = ['Hoá đơn'];
  // state
  const [activeTab, setActiveTab] = React.useState<number>(0);

  // function
  const focusInvoices = () => {
    setActiveTab(0);
  };
  const focusHistory = () => {
    setActiveTab(1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Tài chính'
        height={heightPercentageToDP(2)}
        mode='center-aligned'
        onBack={() => navigation.goBack()}
      />
      <TabView>
        <TabButton
          isClicked={activeTab === 0}
          name={tabs[0]}
          displayNumber={false}
          onFocus={focusInvoices}
        />
        {/* <TabButton
          isClicked={activeTab === 1}
          name={tabs[1]}
          displayNumber={false}
          onFocus={focusHistory}
        /> */}
      </TabView>
      {activeTab === 0 && <Invoice />}
    </View>
  );
};
