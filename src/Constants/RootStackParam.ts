import { RootScreens } from './RootScreen';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.SIGNIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.ROOMING_HOUSE_LIST]: undefined;
  [RootScreens.ROOMING_HOUSED_DETAIL]: undefined;
  [RootScreens.INVOICE]: undefined;
  [RootScreens.FINANCE]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.CREATE_ROOMING_HOUSE]: undefined;
  [RootScreens.CREATE_FLOOR]: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
  RoomingHouseStack: undefined;
  InvoiceStack: undefined;
  FinanceStack: undefined;
  ProfileStack: undefined;
  OnboardingStack: undefined;
  TabNavigator: undefined;
};
