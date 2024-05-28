import { API } from '../Services/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  homeReducers,
  themeReducers,
  authReducers,
  userReducers,
  roomingHouseReducers,
} from './reducers';
import { provinceApi } from '../Services/province';
import { onboardingReducers } from './reducers/onboarding';

const reducers = combineReducers({
  api: API.reducer,
  [provinceApi.reducerPath]: provinceApi.reducer,
  theme: themeReducers,
  home: homeReducers,
  user: userReducers,
  auth: authReducers,
  roomingHouse: roomingHouseReducers,
  onboarding: onboardingReducers
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'auth', 'onboarding'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(API.middleware)
      .concat(provinceApi.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {api: ApiState, theme: ThemeState, home: HomeState, user: UserState, auth: AuthState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
