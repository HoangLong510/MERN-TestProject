import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loading/loadingSlice'
import openAuthReducer from './features/openAuth/openAuthSlice'
import popupReducer from './features/popup/popupSlice'
import userReducer from './features/user/userSlice'
import logoutReducer from './features/logout/logoutSlice'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        openAuth: openAuthReducer,
        popup: popupReducer,
        user: userReducer,
        logout: logoutReducer,
    }
})