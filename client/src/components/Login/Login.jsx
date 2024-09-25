import { Fragment, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenLogin } from '~/libs/features/openLogin/openLoginSlice'
import { Box, TextField, Button, Typography, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setOpenRegister } from '~/libs/features/openRegister/openRegisterSlice'

export default function Login() {
    const { t } = useTranslation()

    const openLogin = useSelector(state => state.openLogin.value)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenLogin(false))
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault()
        // Handle login logic here
    }

    const handleGoogleLogin = () => {
        // Handle Google login logic here
    }

    const handleFacebookLogin = () => {
        // Handle Facebook login logic here
    }

    return (
        <Fragment>
            <Dialog
                fullScreen
                open={openLogin}
                onClose={handleClose}
            >
                <Box sx={{
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#000',
                    backgroundImage: "url('/images/bg/login.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    userSelect: 'none'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '500px' },
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
                                <ArrowBackIcon />
                            </IconButton>

                            <Typography variant="h5" component="h2">
                                {t("Login")}
                            </Typography>
                        </Box>

                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                autoComplete='off'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <Link style={{ color: '#000' }}>
                                <Typography variant="body2" align="right" sx={{ mt: 3 }}>
                                    {t("Forgot password")}?
                                </Typography>
                            </Link>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 0 }}
                            >
                                {t("Login")}
                            </Button>
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

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            onClick={handleFacebookLogin}
                            sx={{ mb: 2 }}
                        >
                            {t("Login with")} Facebook
                        </Button>

                        <Typography variant="body2" align="center">
                            {t("Dont have an account")}?
                            <Link onClick={() => {
                                dispatch(setOpenLogin(false))
                                dispatch(setOpenRegister(true))
                            }} style={{
                                color: '#000',
                                marginLeft: '4px',
                                textDecoration: 'underline'
                            }}>
                                {t("Create account")}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Dialog>
        </Fragment>
    )
}