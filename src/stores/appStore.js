import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import lobSlice from './slices/getLob';
import productSlice from './slices/getProduct';
import locationSlice from './slices/getLocation';
import roleSlice from './slices/getRole';
import paymentTypeSlice from './slices/getPaymentType';
import producerCodeSlice from './slices/getProducerCode';
import parentCodeSlice from './slices/getParentCode';
import dialogReducer from './slices/dialogSlice';
import exportReducer from './slices/exportSlice';
import lobReducer from './slices/lobSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import channelSlice from './slices/getChannel';
import houseBankSlice from './slices/getHouseBank';
import loginTypeSlice from './slices/getLoginType';
import groupSlice from './slices/groupSlice';
import producerTypeSlice from './slices/getProducerType';
import masterPolicySlice from './slices/getMasterPolicy';
import zoneSlice from './slices/getZone';
import planSlice from './slices/getPlan';
import lobUserSlice from './slices/lobUserSlice';
import permissionsSlice from './slices/permissionsSlice';
import modulesSlice from './slices/modulesSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  dialog: dialogReducer,
  export: exportReducer,
  group: groupSlice,
  lobUserCreation: lobSlice,
  productUserCreation: productSlice,
  user: userReducer,
  lob: lobReducer,
  product: productReducer,
  location: locationSlice,
  role: roleSlice,
  paymentType: paymentTypeSlice,
  producerCode: producerCodeSlice,
  parentCode: parentCodeSlice,
  channelType: channelSlice,
  houseBank: houseBankSlice,
  loginType: loginTypeSlice,
  producerType: producerTypeSlice,
  masterPolicy: masterPolicySlice,
  zone: zoneSlice,
  plan: planSlice,
  lobUser: lobUserSlice,
  permissions: permissionsSlice,
  modules: modulesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(appStore);

export { appStore, persistor };
