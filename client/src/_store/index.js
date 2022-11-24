import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';

/*
Store dizin dosyası, configureStore() işlevi ile React uygulaması için
kök Redux store yapılandırmasını sağlar. Döndürülen Redux deposui karşılık gelen
slicelarla eşleşen auth durum özelliklerini ve kullanıcıları içerir.
*/

export * from './auth.slice';
export * from './users.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    },
});