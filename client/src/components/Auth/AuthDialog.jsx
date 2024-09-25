import { Fragment, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { setOpenAuth } from '~/libs/features/openAuth/openAuthSlice'
import Login from './Login/Login'
import Register from './Register/Register'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPassword from './ForgotPassword/ForgotPassword'

export default function AuthDialog() {

    const user = useSelector(state => state.user.value)
    const openAuth = useSelector(state => state.openAuth.value)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenAuth({
            value: false,
            type: ''
        }))
    }

    return (
        <Fragment>
            <Dialog
                fullScreen
                scroll={'body'}
                open={openAuth.value && !user.exist}
                onClose={handleClose}
            >
                <Box sx={{
                    width: '100%',
                    minHeight: '100%',
                    backgroundColor: '#000',
                    backgroundImage: "url('/images/bg/auth.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    userSelect: 'none',
                    overflow: 'overlay',
                    padding: '20px',
                }}>
                    {openAuth.type === 'login' && (
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_CLIENT_ID}>
                            <Login />
                        </GoogleOAuthProvider>
                    )}
                    {openAuth.type === 'register' && (
                        <Register />
                    )}
                    {openAuth.type === 'forgot-password' && (
                        <ForgotPassword />
                    )}
                </Box>
            </Dialog>
        </Fragment>
    )
}