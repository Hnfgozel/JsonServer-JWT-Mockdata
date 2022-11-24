/*
Auth slice, authentication için Redux durumunu, actions ve reducersları yönetir.
Dosya, incelenebilirlik açısından 3 bölüm haline böldüm.
*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// ilk bölüm : slice oluşturmak ve yapılandırmak için fonksiyonları çağırır

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// ikinci bçlüm : actions ve reducerları dışarı aktarır.

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// Üçüncü Bölüm : mantığı işleyen fonksiyonları içerir

function createInitialState() {
    return {
        // initialState, Slicedaki durum özelliklerini başlangıç değerleri ile tanımlar
        // Kullanıcı durumu ( state ) özelliği, mevcut oturum açmış kullanıcıyı tutar.
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

/* 
createSlice() öğesine iletilen reducer nesnesi, eşzamanlı (senkron) eylemler mantığı
içerir. Örneğin Logout reducer, kullanıcı durum özelliğini null olarak ayarlar.
yerel depolamadan kaldırır ve ana sayfaya yönlendirir.
*/
function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;// null olark atandı.
        localStorage.removeItem('user'); // yerel depolamadan kaldırıldı.
        history.navigate('/'); // anasayfaya yönlendirdi.
    }
}

/* 
extraActions nesnesi, Api istekleri gibi asenkron eylemler için
bir mantık yapısı içerir. Asenkron eylemler, Redux toolkit createAsyncThunk()
fonksiyonu ile oluşturulur. ExtraReducers nesnesi, asenkron eylemlerin
farklı aşamalarında (pending, fulfilled, rejected) Redux durumunu güncellemek
yöntemler içerir ve createSlice() işlevine bir parametre olarka iletilir.  
*/
function createExtraActions() {
    /*
    Apiyi çağırmak için bir base url tanımlaması yaptık. 
    REACT_APP_API_URL ana dizinde oluşturduğumuz .env
    Dosyasında tanımlı. Biz sunucumuzu 4000 portunda çalıştırıyoruz.
    */
    const baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

    return {
        login: login(),
        register: register()
    };

    function login() {
        return createAsyncThunk(
            `${name}/library`,//Login gerçekleşirse kullanıcının yönlendirileceği yol dizini.
            async ({ username, password }) => await fetchWrapper.post(`${baseUrl}/login`, { username, password })
        );
    }

    function register() {
        return createAsyncThunk(
            `${name}/`,
            async ({ username, password, email }) => await fetchWrapper.post(`${baseUrl}/register`, { username, password, email })
        );
    }
}

function createExtraReducers() {
    return {
        ...login(),
        ...register()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;

                // sayfa yenilemeleri arasında kullanıcının oturumunu açık tutmak için
                // kullanıcı ayrıntılarını ve jwt belirtecini yerel depolamada saklıyoruz
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // Konum durumundan veya varsayılandan kitap sorgusu yapacağımız sayfaya yönlendirme
                const { from } = history.location.state || { from: { pathname: '/library' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function register() {
        var { pending, fulfilled, rejected } = extraActions.register;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {

                // konum durumundan veya varsayılandan ana sayfaya dönüş url'si aldık
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}