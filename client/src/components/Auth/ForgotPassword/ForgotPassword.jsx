import { Box, Button, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { setOpenAuth } from "~/libs/features/openAuth/openAuthSlice"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import FixedHeightTextField from "~/components/MUI/FixedHeightTextField"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function ForgotPassword() {

    const handleClose = () => {
        dispatch(setOpenAuth({
            value: false,
            type: ''
        }))
    }

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("")

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

    const handleCheckEmail = async (e) => {
        e.preventDefault()

        
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
                    {t("Forgot password")}
                </Typography>
            </Box>

            <form onSubmit={handleCheckEmail}>
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 0 }}
                >
                    {t("Continue")}
                </Button>
            </form>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                fontSize: '14px',
                mt: 1,
                mb: 1
            }}>
                <Link onClick={() => {
                    dispatch(setOpenAuth({
                        value: true,
                        type: 'login'
                    }))
                }} style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000',
                    marginLeft: '4px'
                }}>
                    <ArrowBackIcon  sx={{ mr: 1, fontSize: '15px' }} />{t("BackToLoginPage")}
                </Link>
            </Box>
        </Box>
    )
}
