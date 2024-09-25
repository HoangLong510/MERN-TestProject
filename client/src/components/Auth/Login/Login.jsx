import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography, IconButton, Divider, CircularProgress } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setOpenAuth } from '~/libs/features/openAuth/openAuthSlice'
import CloseIcon from '@mui/icons-material/Close'
import { useGoogleLogin } from '@react-oauth/google'
import { fetchDataUserApi, loginApi, loginWithGoogleApi } from './service'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { setUser } from '~/libs/features/user/userSlice'
import messages from "~/messages"
import FixedHeightTextField from '~/components/MUI/FixedHeightTextField'

export default function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenAuth({
            value: false,
            type: ''
        }))
    }

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(true)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    useEffect(() => {
        if (!email || email.trim() === "") {
            setErrorEmail("PleaseEnterYourEmail")
        } else {
            setErrorEmail("")
        }

        if (!password || password.trim() === "") {
            setErrorPassword("PleaseEnterYourPassword")
        } else {
            setErrorPassword("")
        }
    }, [email, password])

    useEffect(() => {
        if (errorEmail || errorPassword) {
            setError(true)
        } else {
            setError(false)
        }
    }, [errorEmail, errorPassword])

    const handleLogin = async (event) => {
        event.preventDefault()

        if (error) {
            const dataPopup = {
                type: 'error',
                message: [
                    messages.PleaseEnterAllFields
                ]
            }
            dispatch(setPopup(dataPopup))
        } else {
            setLoading(true)
            const data = {
                email,
                password
            }

            const res = await loginApi(data)
            setLoading(false)

            if (res.success) {
                const dataPopup = {
                    type: 'success',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                await fetchDataUser()
            } else {
                const dataPopup = {
                    type: 'error',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            }
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const res = await loginWithGoogleApi(tokenResponse.access_token)

            if (res.success) {
                const dataPopup = {
                    type: 'success',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                await fetchDataUser()
            } else {
                const dataPopup = {
                    type: 'error',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            }
        },
        onError: (error) => {
            const dataPopup = {
                type: 'error',
                message: [
                    messages.InternalServerError
                ]
            }
            dispatch(setPopup(dataPopup))
        }
    })

    const fetchDataUser = async () => {
        const res = await fetchDataUserApi()
        if (res.success) {
            handleClose()
            dispatch(setUser(res.user))
        } else {
            const dataPopup = {
                type: 'error',
                message: res.message
            }
            dispatch(setPopup(dataPopup))
        }
    }

    return (
        <Box sx={{
            width: { xs: '100%', md: '500px' },
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: '#fff',
            opacity: 0.85,
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleClose} sx={{ mr: 2 }}>
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" component="h2">
                    {t("Login")}
                </Typography>
            </Box>

            <form onSubmit={handleLogin}>
                <FixedHeightTextField
                    fullWidth
                    type="text"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    autoComplete='off'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    helperText={t(errorEmail)}
                    color={!errorEmail ? "success" : "error"}
                />

                <FixedHeightTextField
                    fullWidth
                    type="password"
                    label={t('Password')}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    helperText={t(errorPassword)}
                    color={!errorPassword ? "success" : "error"}
                />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2
                }}>
                    <Link style={{ color: '#000', fontSize: '14px' }} onClick={() => {
                        dispatch(setOpenAuth({
                            value: true,
                            type: 'forgot-password'
                        }))
                    }}>
                        {t("Forgot password")}?
                    </Link>
                </Box>

                {!loading ? (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 0 }}
                    >
                        {t("Login")}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 0 }}
                    >
                        <CircularProgress size="25px" color="inherit" />
                    </Button>
                )}
            </form>

            <Divider>{t("Or")}</Divider>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ mb: 0 }}
            >
                {t("Login with")} Google
            </Button>

            <Typography variant="body2" align="center">
                {t("Dont have an account")}?
                <Link onClick={() => {
                    dispatch(setOpenAuth({
                        value: true,
                        type: 'register'
                    }))
                }} style={{
                    color: '#000',
                    marginLeft: '4px',
                    textDecoration: 'underline'
                }}>
                    {t("Create account")}
                </Link>
            </Typography>
        </Box>
    )
}
