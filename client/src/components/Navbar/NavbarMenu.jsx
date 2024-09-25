import { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button, Typography } from "@mui/material"
import SelectLocale from "./SelectLocale"
import { useDispatch, useSelector } from "react-redux"
import { setOpenAuth } from "~/libs/features/openAuth/openAuthSlice"
import { setLogout } from "~/libs/features/logout/logoutSlice"

export default function NavbarMenu() {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.value)

    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const menuItems = [
        { label: t("Homepage"), path: '/' },
        { label: t("Products"), path: '/' },
        { label: t("Contact"), path: '/' },
    ]

    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleDrawer(true)} className='button'>
                <MoreVertIcon />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }} onClick={toggleDrawer(true)} className='button'>
                <MenuIcon />
            </Box>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor="right"
                PaperProps={{ sx: { width: { xs: "100%", md: "auto" } } }}
            >
                <Box sx={{ width: { xs: "100%", md: 350 }, padding: { xs: "0 20px" } }} role="presentation">
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            justifyContent: "end",
                            alignItems: "center",
                            height: "61px",
                            padding: "0px 20px",
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "30px" }} onClick={toggleDrawer(false)} />
                    </Box>

                    <List sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: "40px", padding: "40px 20px" }}>
                        {menuItems.map((menuItem, index) => {
                            return (
                                <Link
                                    key={index}
                                    onClick={toggleDrawer(false)}
                                    to={menuItem.to}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                        {menuItem.label}
                                    </Typography>
                                </Link>
                            )
                        })}
                        <Link
                            onClick={toggleDrawer(false)}
                            to='https://www.facebook.com/long.nguyen.0510/' target='_blank'
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                Fanpage
                            </Typography>
                        </Link>
                    </List>

                    <Box sx={{ padding: { xs: "0px", md: "20px 0px 0px 0px" } }}>
                        <SelectLocale />
                    </Box>

                    {!user.exist && (
                        <List sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: "40px", padding: "40px 20px" }}>
                            <Link
                                onClick={() => {
                                    dispatch(setOpenAuth({
                                        value: true,
                                        type: 'login'
                                    }))
                                    setOpen(false)
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                    {t("Login")}
                                </Typography>
                            </Link>
                            <Link
                                onClick={() => {
                                    dispatch(setOpenAuth({
                                        value: true,
                                        type: 'register'
                                    }))
                                    setOpen(false)
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                    {t("Create account")}
                                </Typography>
                            </Link>
                        </List>
                    )}

                    {user.exist && (
                        <List sx={{ display: 'flex', flexDirection: "column", gap: "25px", padding: "30px 0px" }}>
                            <Link
                                onClick={() => {

                                    setOpen(false)
                                }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button variant='contained' sx={{ width: "100%" }}>
                                    {t("Hi")},
                                    <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                                        {user.data.name}
                                    </span>
                                </Button>
                            </Link>

                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: '40px'
                            }}>
                                <Link
                                    onClick={() => {
                                        dispatch(setLogout())
                                        setOpen(false)
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography sx={{ color: '#222', fontSize: '14px', textTransform: 'capitalize' }}>
                                        {t("Logout")}
                                    </Typography>
                                </Link>
                            </Box>
                        </List>
                    )}
                </Box>
            </Drawer>
        </>
    )
}