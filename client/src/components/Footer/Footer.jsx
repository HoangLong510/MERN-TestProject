import { Box } from '@mui/material'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Footer() {

    const { t } = useTranslation()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            userSelect: 'none',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            fontSize: '15px',
        }}>
            <Box sx={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                gap: { md: '20px', xs: '50px' }
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '25%' },
                    gap: '20px'
                }}>
                    <Box sx={{
                        fontWeight: 'bold',
                        paddingBottom: '10px',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        color: 'primary.main'
                    }}>
                        {t("Introduce")}
                    </Box>
                    <span style={{ color: '#000' }}>
                        {t("IntroduceValue")}
                    </span>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '25%' },
                    gap: '20px'
                }}>
                    <Box sx={{
                        fontWeight: 'bold',
                        paddingBottom: '10px',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        color: 'primary.main'
                    }}>
                        {t("Contact")}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <PhoneAndroidIcon />
                            <Link to='tel:+84911789450' style={{ color: '#000', textDecoration: 'underline' }}>
                                0911 789 450
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <RoundaboutRightIcon />
                            <span>
                                62 Đường 36, Khu đô Thị Vạn Phúc, Thủ Đức,TP. Hồ Chí Minh, Việt Nam
                            </span>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <MailOutlineIcon />
                            <Link to='mailto:aptech.fpt@fe.edu.vn' style={{ color: '#000', textDecoration: 'underline' }}>
                                aptech.fpt@fe.edu.vn
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '25%' },
                    gap: '20px',
                    paddingBottom: '10px'
                }}>
                    <Box sx={{
                        fontWeight: 'bold',
                        paddingBottom: '10px',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        color: 'primary.main'
                    }}>
                        {t("Location")}
                    </Box>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3918.551748852149!2d106.712023!3d10.845575!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529564f2b4679%3A0x92c1b5bfdc78c98!2zRlBUIEFwdGVjaCBW4bqhbiBQaMO6Yw!5e0!3m2!1svi!2sus!4v1727242498397!5m2!1svi!2sus"
                        width="100%"
                        height="250px"
                        style={{ border: 0, marginRight: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
            </Box>

            <Box sx={{ textAlign: 'center', backgroundColor: 'primary.main', padding: '20px', color: '#fff' }}>
                &copy; All Rights Reserved By
                <span style={{ padding: '4px', fontWeight: 'bold' }}>
                    {import.meta.env.VITE_APP_NAME}
                </span>
            </Box>
        </Box>
    )
}
