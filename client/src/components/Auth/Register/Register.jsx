import { useEffect, useState } from 'react'
import { Box, Button, Typography, IconButton, Divider, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { setOpenAuth } from '~/libs/features/openAuth/openAuthSlice'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { checkEmailApi, registerApi } from './service'
import { setPopup } from '~/libs/features/popup/popupSlice'
import messages from '~/messages'
import FixedHeightTextField from '~/components/MUI/FixedHeightTextField'

export default function Register() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenAuth({
            value: false,
            type: ''
        }))
    }

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState(true)
    const [errorName, setErrorName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    useEffect(() => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // email
        if (!email || email.trim() === "") {
            setErrorEmail("PleaseEnterYourEmail")
        } else if (!regexEmail.test(email)) {
            setErrorEmail("RegexEmail")
        } else {
            setErrorEmail("")
        }
    }, [email])

    useEffect(() => {
        const regexName = /^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u
        const regexPassword = /^(?!\s)[\S\s]{6,30}$/

        // Name
        if (!name || name.trim() === "") {
            setErrorName("PleaseEnterYourName")
        } else if (!regexName.test(name)) {
            setErrorName("RegexName")
        } else {
            setErrorName("")
        }

        // password
        if (!password || password.trim() === "") {
            setErrorPassword("PleaseEnterYourPassword")
        } else if (!regexPassword.test(password)) {
            setErrorPassword("RegexPassword")
        } else {
            setErrorPassword("")
        }

        // confirmPassword
        if (!confirmPassword || confirmPassword.trim() === "") {
            setErrorConfirmPassword("PleaseEnterConfirmPassword")
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword("RegexConfirmPassword")
        } else {
            setErrorConfirmPassword("")
        }
    }, [
        name,
        password,
        confirmPassword
    ])

    useEffect(() => {
        if (
            errorName ||
            errorEmail ||
            errorPassword ||
            errorConfirmPassword
        ) {
            setError(true)
        } else {
            setError(false)
        }
    }, [
        errorName,
        errorEmail,
        errorPassword,
        errorConfirmPassword
    ])

    const handleCheckEmail = async (value) => {
        const res = await checkEmailApi(value)

        if (res.success) {
            if (res.emailExists) {
                setErrorEmail("EmailAlreadyExists")
            }
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()

        if (!error) {
            setLoading(true)

            const data = {
                name,
                email,
                password,
                confirmPassword
            }

            const res = await registerApi(data)

            setLoading(false)

            if (res.success) {
                const dataPopup = {
                    type: 'success',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))

                dispatch(setOpenAuth({
                    value: true,
                    type: 'login'
                }))
            } else {
                const dataPopup = {
                    type: 'error',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            }
        } else {
            const dataPopup = {
                type: 'error',
                message: [
                    messages.PleaseFixAllErrorsBefore
                ]
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
            gap: '10px',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleClose} sx={{ mr: 2 }}>
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" component="h2">
                    {t("Register")}
                </Typography>
            </Box>

            <form onSubmit={handleRegister}>
                <FixedHeightTextField
                    fullWidth
                    label={t("Name")}
                    variant="outlined"
                    margin="normal"
                    autoComplete='off'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    helperText={t(errorName)}
                    color={!errorName ? "success" : "error"}
                />

                <FixedHeightTextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    autoComplete='off'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={e => handleCheckEmail(e.target.value)}
                    helperText={t(errorEmail)}
                    color={!errorEmail ? "success" : "error"}
                />

                <FixedHeightTextField
                    fullWidth
                    label={t('Password')}
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    helperText={t(errorPassword)}
                    color={!errorPassword ? "success" : "error"}
                />

                <FixedHeightTextField
                    fullWidth
                    label={t("Confirm password")}
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    helperText={t(errorConfirmPassword)}
                    color={!errorConfirmPassword ? "success" : "error"}
                />
                {loading ? (
                    <Button
                        fullWidth
                        variant="contained"
                        disabled
                        sx={{ mt: 3, mb: 0 }}
                    >
                        <CircularProgress size="25px" color="inherit" />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 0 }}
                    >
                        {t("Create account")}
                    </Button>
                )}
            </form>

            <Divider>{t("Or")}</Divider>

            <Typography variant="body2" align="center">
                {t("Already have an account")}?
                <Link onClick={() => {
                    dispatch(setOpenAuth({
                        value: true,
                        type: 'login'
                    }))
                }} style={{
                    color: '#000',
                    marginLeft: '4px',
                    textDecoration: 'underline'
                }}>
                    {t("Login")}
                </Link>
            </Typography>
        </Box>
    )
}
