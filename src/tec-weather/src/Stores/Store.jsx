import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/ThemeReducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'theme',
    storage,
};

const persistedReducer = persistReducer(persistConfig, themeReducer);


const store = configureStore({
    reducer: persistedReducer
});

export default store;

export const persistor = persistStore(store);