import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        value: false,
        type: ''
    }
}

export const openAuthSlice = createSlice({
    name: 'openAuth',
    initialState,
    reducers: {
        setOpenAuth: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setOpenAuth } = openAuthSlice.actions

export default openAuthSlice.reducer