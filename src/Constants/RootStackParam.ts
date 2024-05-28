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
  [RootScreens.FLOORDETAIL]: {};
  [RootScreens.ROOMDETAIL]: undefined;
  [RootScreens.CREATE_FLOOR]: undefined;
  [RootScreens.CREATE_ROOM]: undefined;
  [RootScreens.CREATE_CONTRACT]: undefined;
  [RootScreens.NOTIFICATION]: undefined;
  [RootScreens.CREATE_DEVICE]: { isHouse?: boolean, isRoom?: boolean, isFloor?: boolean};
  [RootScreens.ADD_TENANT]: undefined;
  [RootScreens.DEVICE_DETAIL]: undefined;
  [RootScreens.CONTRACT_DETAIL]: { contract_id: string};
  AuthStack: undefined;
  HomeStack: undefined;
  RoomingHouseStack: undefined;
  FinanceStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
  OnboardingStack: undefined;
  TabNavigator: undefined;
};
