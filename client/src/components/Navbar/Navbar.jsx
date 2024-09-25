import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenAuth } from '~/libs/features/openAuth/openAuthSlice'

export default function Navbar() {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.value)

    const openLogin = () => {
        dispatch(setOpenAuth({
            value: true,
            type: 'login'
        }))
    }

    const openRegister = () => {
        dispatch(setOpenAuth({
            value: true,
            type: 'register'
        }))
    }

    const menuItems = [
        { label: t("Homepage"), path: '/' },
        { label: t("Products"), path: '/' },
        { label: t("Contact"), path: '/' },
    ]

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: '0px 20px',
            userSelect: 'none'
        }}>
            {/* Left */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '25px'
            }}>
                <Link to='/'>
                    <img src="/images/logo/logo-navbar-white.png" alt="logo" height={'40px'} />
                </Link>

                <Box sx={{
                    display: { md: 'flex', xs: 'none' },
                    alignItems: 'center',
                    gap: '25px'
                }}>
                    {menuItems.map(menuItem => {
                        return (
                            <Link key={menuItem.label} to={menuItem.path}>
                                <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                    {menuItem.label}
                                </Typography>
                            </Link>
                        )
                    })}
                    <Link to='https://www.facebook.com/long.nguyen.0510/' target='_blank'>
                        <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                            Fanpage
                        </Typography>
                    </Link>
                </Box>
            </Box>

            {/* Right */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                {!user.exist && (
                    <Box sx={{
                        display: { md: 'flex', xs: 'none' },
                        alignItems: 'center',
                        gap: '25px'
                    }}>
                        <a className='button' onClick={() => openLogin()}>
                            <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                {t("Login")}
                            </Typography>
                        </a>
                        <Link onClick={() => openRegister()}>
                            <Button className='button' variant='contained'>
                                {t("Create account")}
                            </Button>
                        </Link>
                    </Box>
                )}

                <NavbarMenu />
            </Box>
        </Box>
    )
}
