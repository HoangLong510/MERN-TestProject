import { Fragment, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenRegister } from '~/libs/features/openRegister/openRegisterSlice'
import { Box, TextField, Button, Typography, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setOpenLogin } from '~/libs/features/openLogin/openLoginSlice'

export default function Register() {
    const { t } = useTranslation()

    const openRegister = useSelector(state => state.openRegister.value)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenRegister(false))
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = (event) => {
        event.preventDefault()
        // Xử lý logic đăng ký tại đây
    }

    const handleGoogleRegister = () => {
        // Xử lý đăng ký với Google
    }

    const handleFacebookRegister = () => {
        // Xử lý đăng ký với Facebook
    }

    return (
        <Fragment>
            <Dialog
                fullScreen
                open={openRegister}
                onClose={handleClose}
            >
                <Box sx={{
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#000',
                    backgroundImage: "url('/images/bg/register.jpg')",
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
                                {t("Register")}
                            </Typography>
                        </Box>

                        <form onSubmit={handleRegister}>
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

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 0 }}
                            >
                                {t("Register")}
                            </Button>
                        </form>

                        <Divider>{t("Or")}</Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleRegister}
                            sx={{ mb: 0 }}
                        >
                            {t("Register with")} Google
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            onClick={handleFacebookRegister}
                            sx={{ mb: 2 }}
                        >
                            {t("Register with")} Facebook
                        </Button>

                        <Typography variant="body2" align="center">
                            {t("Already have an account")}?
                            <Link onClick={() => {
                                dispatch(setOpenLogin(true))
                                dispatch(setOpenRegister(false))
                            }} style={{
                                color: '#000',
                                marginLeft: '4px',
                                textDecoration: 'underline'
                            }}>
                                {t("Login")}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Dialog>
        </Fragment>
    )
}
